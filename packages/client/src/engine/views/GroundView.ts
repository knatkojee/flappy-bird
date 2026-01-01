import type { RenderConfig } from '../types'

const GROUND_CONSTANTS = {
  borderHeight: 5,
} as const

export class GroundView {
  private ctx: CanvasRenderingContext2D
  private config: RenderConfig

  constructor(ctx: CanvasRenderingContext2D, config: RenderConfig) {
    this.ctx = ctx
    this.config = config
  }

  render(canvasWidth: number, groundY: number): void {
    this.ctx.fillStyle = this.config.groundColor
    this.ctx.fillRect(0, groundY, canvasWidth, this.config.groundHeight)

    this.ctx.fillStyle = '#556B2F'
    this.ctx.fillRect(0, groundY, canvasWidth, GROUND_CONSTANTS.borderHeight)
  }
}
