import { yandexApi } from './index'
import type { Request, Response } from 'express'

export const signinHandler = async (req: Request, res: Response) => {
  try {
    const response = await yandexApi.post('/auth/signin', req.body)

    const cookies = response.headers['set-cookie']

    if (cookies && cookies.length > 0) {
      res.setHeader('Set-Cookie', [])

      cookies.forEach((cookieString: string) => {
        const localCookie = cookieString
          .replace(/; Domain=[^;]+/gi, '; Domain=localhost')
          .replace(/; Secure/gi, '')
          .replace(/; SameSite=None/gi, '; SameSite=Lax')
          .replace(/; Expires=[^;]+/gi, '; Max-Age=86400')

        res.append('Set-Cookie', localCookie)
      })
    }

    res.json(response.data)
  } catch (error) {
    console.error('signin error', error.response?.data || error.message)
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { reason: 'Signin error' })
  }
}

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const cookiesToClear = ['uuid', 'authCookie', 'sessionid', 'Session_id']

    cookiesToClear.forEach(cookieName => {
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        domain: 'localhost',
      })
    })

    cookiesToClear.forEach(cookieName => {
      res.clearCookie(cookieName, {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })
    })

    res.json({ success: true })
  } catch (error) {
    console.error('logout error:', error.response?.data || error.message)

    const cookiesToClear = ['uuid', 'authCookie', 'sessionid', 'Session_id']
    cookiesToClear.forEach(cookieName => {
      res.clearCookie(cookieName, { path: '/', domain: 'localhost' })
    })

    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { reason: 'Logout error' })
  }
}

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const signupResponse = await yandexApi.post('/auth/signup', req.body)
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const signinResponse = await yandexApi.post('/auth/signin', {
        login: req.body.login || req.body.email,
        password: req.body.password,
      })

      const cookies = signinResponse.headers['set-cookie']

      if (cookies && cookies.length > 0) {
        cookies.forEach((cookieString: string) => {
          const localCookie = cookieString
            .replace(/; Domain=[^;]+/gi, '; Domain=localhost')
            .replace(/; Secure/gi, '')
            .replace(/; SameSite=None/gi, '; SameSite=Lax')

          res.append('Set-Cookie', localCookie)
        })
      }

      const userResponse = await yandexApi.get('/auth/user', {
        headers: {
          Cookie: cookies?.join('; ') || '',
        },
      })

      return res.json({
        id: signupResponse.data.id,
        ...userResponse.data,
      })
    } catch (loginError) {
      return res.json({
        id: signupResponse.data.id,
        requiresLogin: true,
        message: 'Registration successful. Please log in.',
      })
    }
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message)
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { reason: 'Signup error' })
  }
}

export const yandexServiceIdHandler = async (req: Request, res: Response) => {
  try {
    const redirectUri = req.query.redirect_uri as string

    if (!redirectUri) {
      return res.status(400).json({
        reason: 'redirect_uri is required',
      })
    }

    const response = await yandexApi.get('/oauth/yandex/service-id', {
      params: {
        redirect_uri: redirectUri,
      },
    })

    res.json({
      service_id: response.data.service_id,
    })
  } catch (error: any) {
    console.error(
      'Yandex service ID error:',
      error.response?.data || error.message
    )

    res.status(error.response?.status || 500).json({
      reason: error.response?.data?.reason || 'Failed to get service ID',
    })
  }
}

export const yandexSigninHandler = async (req: Request, res: Response) => {
  try {
    const { code, redirect_uri } = req.body

    if (!code) {
      return res.status(400).json({
        reason: 'Code is required',
      })
    }

    const tokenResponse = await yandexApi.post('/oauth/yandex', {
      code,
      redirect_uri,
    })

    const cookies = tokenResponse.headers['set-cookie']

    if (!cookies || cookies.length === 0) {
      console.error('No cookies from Yandex')
      return res.status(500).json({
        reason: 'No cookies from Yandex',
      })
    }

    try {
      const userResponse = await yandexApi.get('/auth/user', {
        headers: {
          Cookie: cookies.join('; '),
        },
      })

      cookies.forEach((cookieString: string) => {
        const localCookie = cookieString
          .replace(/; Domain=ya-praktikum.tech/gi, '; Domain=localhost')
          .replace(/; Secure/gi, '')
          .replace(/; SameSite=None/gi, '; SameSite=Lax')
          .replace(/; Expires=[^;]+/gi, '; Max-Age=86400')

        console.log('Setting cookie:', localCookie.split(';')[0])
        res.append('Set-Cookie', localCookie)
      })

      return res.json({
        success: true,
        user: userResponse.data,
      })
    } catch (userError) {
      if (tokenResponse.data && typeof tokenResponse.data === 'object') {
        console.log('Token response data:', tokenResponse.data)

        if (tokenResponse.data.access_token) {
          console.log('Got access token, trying alternative method...')
        }
      }

      return res.status(401).json({
        success: false,
        reason: 'yandex_api_inconsistency',
        message:
          'Не удалось получить данные пользователя. Попробуйте войти через логин и пароль.',
      })
    }
  } catch (error: any) {
    console.error('Yandex signin error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })

    if (error.response?.data?.reason === 'No access token') {
      console.log(
        'Yandex API returned cookies without token - this is expected'
      )
      const cookies = error.response?.headers?.['set-cookie']

      if (cookies && cookies.length > 0) {
        console.log('Found cookies in error response, trying to use them...')

        try {
          const userResponse = await yandexApi.get('/auth/user', {
            headers: {
              Cookie: cookies.join('; '),
            },
          })

          cookies.forEach((cookieString: string) => {
            const localCookie = cookieString
              .replace(/; Domain=ya-praktikum.tech/gi, '; Domain=localhost')
              .replace(/; Secure/gi, '')
              .replace(/; SameSite=None/gi, '; SameSite=Lax')
            res.append('Set-Cookie', localCookie)
          })

          return res.json({
            success: true,
            user: userResponse.data,
          })
        } catch (e) {
          console.error('Still failed to get user with cookies')
        }
      }
    }

    res.status(error.response?.status || 500).json({
      success: false,
      reason: error.response?.data?.reason || 'oauth_failed',
      message: 'Ошибка авторизации через Яндекс',
    })
  }
}
