import type { BirdState, BirdConfig } from '../types'

const VISUAL_CONSTANTS = {
  eyeSize: 5,
  eyeOffsetX: 10,
  eyeOffsetY: 8,
  beakLength: 15,
  beakHeight: 8,
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

    this.ctx.fillStyle = this.config.color
    this.ctx.fillRect(x, y, size.width, size.height)

    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(
      x + size.width - VISUAL_CONSTANTS.eyeOffsetX,
      y + VISUAL_CONSTANTS.eyeOffsetY,
      VISUAL_CONSTANTS.eyeSize,
      VISUAL_CONSTANTS.eyeSize
    )

    this.ctx.fillStyle = '#FF8C00'
    this.ctx.beginPath()
    this.ctx.moveTo(x + size.width, y + size.height / 2)
    this.ctx.lineTo(
      x + size.width + VISUAL_CONSTANTS.beakLength,
      y + size.height / 2
    )
    this.ctx.lineTo(
      x + size.width,
      y + size.height / 2 + VISUAL_CONSTANTS.beakHeight
    )
    this.ctx.closePath()
    this.ctx.fill()
  }
}
