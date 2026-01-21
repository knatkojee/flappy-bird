import type { BirdState, BirdConfig } from '../types'

const VISUAL_CONSTANTS = {
  eyeSize: 5,
  eyeOffsetX: 10,
  eyeOffsetY: 8,
  beakLength: 15,
  beakHeight: 8,
  wingWidth: 20,
  wingHeight: 15,
  wingMinHeight: 3,
} as const

const COLORS = {
  wing: '#FFA500',
  wingStroke: '#FF8C00',
  eye: '#FFF',
  pupil: '#000',
  beak: '#FF8C00',
} as const

export class BirdView {
  private ctx: CanvasRenderingContext2D
  private config: BirdConfig

  constructor(ctx: CanvasRenderingContext2D, config: BirdConfig) {
    this.ctx = ctx
    this.config = config
  }

  render(bird: BirdState): void {
    const size = this.config.size
    const x = bird.position.x
    const y = bird.position.y
    const rotation = Math.min(bird.velocity * 0.05, Math.PI / 4)

    this.ctx.save()
    this.ctx.translate(x + size.width / 2, y + size.height / 2)
    this.ctx.rotate(rotation)

    // Тело птицы (овал)
    this.ctx.fillStyle = this.config.color
    this.ctx.beginPath()
    this.ctx.ellipse(0, 0, size.width / 2, size.height / 2, 0, 0, Math.PI * 2)
    this.ctx.fill()

    // Крыло
    const timeSinceJump = Date.now() - bird.lastJumpTime
    const wingAnimDuration = 300
    const wingScale =
      timeSinceJump < wingAnimDuration
        ? Math.abs(Math.sin((timeSinceJump / wingAnimDuration) * Math.PI))
        : 0
    const wingHeight =
      VISUAL_CONSTANTS.wingMinHeight + VISUAL_CONSTANTS.wingHeight * wingScale
    this.ctx.fillStyle = COLORS.wing
    this.ctx.strokeStyle = COLORS.wingStroke
    this.ctx.lineWidth = 2
    this.ctx.beginPath()
    this.ctx.moveTo(-size.width / 5, 0)
    this.ctx.lineTo(
      -size.width / 2 - VISUAL_CONSTANTS.wingWidth,
      -wingHeight / 2
    )
    this.ctx.lineTo(
      -size.width / 8 - VISUAL_CONSTANTS.wingWidth + 5,
      wingHeight
    )
    this.ctx.lineTo(-size.width / 5, wingHeight / 2)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()

    // Глаз
    this.ctx.fillStyle = COLORS.eye
    this.ctx.beginPath()
    this.ctx.arc(
      size.width / 4,
      -size.height / 6,
      VISUAL_CONSTANTS.eyeSize,
      0,
      Math.PI * 2
    )
    this.ctx.fill()

    // Зрачок
    this.ctx.fillStyle = COLORS.pupil
    this.ctx.beginPath()
    this.ctx.arc(
      size.width / 4 + 2,
      -size.height / 6,
      VISUAL_CONSTANTS.eyeSize / 2,
      0,
      Math.PI * 2
    )
    this.ctx.fill()

    // Клюв
    this.ctx.fillStyle = COLORS.beak
    this.ctx.beginPath()
    this.ctx.moveTo(size.width / 2, 0)
    this.ctx.lineTo(size.width / 2 + VISUAL_CONSTANTS.beakLength, 0)
    this.ctx.lineTo(size.width / 2, VISUAL_CONSTANTS.beakHeight)
    this.ctx.closePath()
    this.ctx.fill()

    this.ctx.restore()
  }
}
