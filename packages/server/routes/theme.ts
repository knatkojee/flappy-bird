import { Router } from 'express'
import { getTheme, updateTheme } from '../controllers/themeController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.get('/user/theme', authMiddleware, getTheme)
router.put('/user/theme', authMiddleware, updateTheme)

export default router
