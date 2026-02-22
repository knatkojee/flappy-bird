import type { Request, Response } from 'express'
import { yandexApi } from './index'

export const changePasswordHandler = async (req: Request, res: Response) => {
  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ reason: 'Unauthorized - no cookies' })
    }

    const response = await yandexApi.put('/user/password', req.body, {
      headers: {
        cookie: req.headers.cookie,
        'Content-Type': 'application/json',
      },
    })

    res.status(response.status).json(response.data)
  } catch (error) {
    console.error(
      'Change password error:',
      error.response?.data || error.message
    )
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { reason: 'Failed to change password' })
  }
}

export const changeAvatarHandler = async (req: Request, res: Response) => {
  try {
    const response = await yandexApi({
      method: 'PUT',
      url: '/user/profile/avatar',
      headers: {
        ...req.headers,
        host: 'ya-praktikum.tech',
        cookie: req.headers.cookie || '',
      },
      data: req,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      responseType: 'stream',
    })

    res.status(response.status)
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value as string)
    })
    response.data.pipe(res)
  } catch (error) {
    console.error('Proxy error:', error.message)
    res.status(500).json({ reason: 'Proxy failed' })
  }
}

export const updateProfileHandler = async (req: Request, res: Response) => {
  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ reason: 'Unauthorized - no cookies' })
    }

    const response = await yandexApi.put('/user/profile', req.body, {
      headers: {
        cookie: req.headers.cookie,
        'Content-Type': 'application/json',
      },
    })

    const cookies = response.headers['set-cookie']
    if (cookies) {
      cookies.forEach((cookieString: string) => {
        const localCookie = cookieString
          .replace(/; Domain=[^;]+/gi, '; Domain=localhost')
          .replace(/; Secure/gi, '')
          .replace(/; SameSite=None/gi, '; SameSite=Lax')
        res.append('Set-Cookie', localCookie)
      })
    }

    res.json(response.data)
  } catch (error) {
    console.error(
      'Update profile error:',
      error.response?.data || error.message
    )
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { reason: 'Failed to update profile' })
  }
}
