import type { Request, Response } from 'express'
import { yandexApi } from './index'

export const addUserToLeaderboardHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ reason: 'Unauthorized - no cookies' })
    }

    const response = await yandexApi.post('/leaderboard', req.body, {
      headers: {
        cookie: req.headers.cookie,
        'Content-Type': 'application/json',
      },
    })

    return res.status(response.status).json({
      success: true,
      message: response.data,
    })
  } catch (error) {
    console.error(
      'Add to leaderboard error:',
      error.response?.data || error.message
    )
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { reason: 'Failed to add to leaderboard' })
  }
}

export const getAllLeaderboardHandler = async (req: Request, res: Response) => {
  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ reason: 'Unauthorized - no cookies' })
    }

    const { ratingFieldName = 'score', cursor = 0, limit = 10 } = req.body

    const response = await yandexApi.post(
      '/leaderboard/all',
      {
        ratingFieldName,
        cursor,
        limit,
      },
      {
        headers: {
          cookie: req.headers.cookie,
          'Content-Type': 'application/json',
        },
      }
    )

    return res.json(response.data)
  } catch (error) {
    console.error(
      'Get leaderboard error:',
      error.response?.data || error.message
    )
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { reason: 'Failed to get leaderboard' })
  }
}
