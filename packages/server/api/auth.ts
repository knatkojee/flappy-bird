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

    return res.json({
      service_id: response.data.service_id,
    })
  } catch (error) {
    console.error(
      'Yandex service ID error:',
      error.response?.data || error.message
    )

    return res.status(error.response?.status || 500).json({
      reason: error.response?.data?.reason || 'Failed to get service ID',
    })
  }
}

export const yandexSigninHandler = async (req: Request, res: Response) => {
  try {
    const { code, redirect_uri } = req.body

    const tokenResponse = await yandexApi.post('/oauth/yandex', {
      code,
      redirect_uri,
    })

    const cookies = tokenResponse.headers['set-cookie']

    if (!cookies) {
      return res.status(500).json({ reason: 'No cookies from Yandex' })
    }

    cookies.forEach((cookieString: string) => {
      const localCookie = cookieString
        .replace(/; Domain=ya-praktikum.tech/gi, '; Domain=localhost')
        .replace(/; Secure/gi, '')
        .replace(/; SameSite=None/gi, '; SameSite=Lax')
        .replace(/; Expires=[^;]+/gi, '; Max-Age=86400')

      res.append('Set-Cookie', localCookie)
    })

    return res.json({
      success: true,
      message: 'Yandex auth successful',
    })
  } catch (error) {
    console.error('Yandex signin error:', error.response?.data || error.message)
    return res.status(500).json({ reason: 'OAuth failed' })
  }
}
