import type { GameConfig } from '../types'

export const DEFAULT_CONFIG: GameConfig = {
  bird: {
    gravity: 0.15,
    jumpPower: -4.5,
    color: '#FFD700',
    size: { width: 40, height: 30 },
  },
  pipe: {
    speed: 2,
    gap: 180,
    width: 80,
    frequency: 150,
    color: '#228B22',
  },
  render: {
    backgroundColor: '#87CEEB',
    groundColor: '#8B4513',
    groundHeight: 60,
  },
}
