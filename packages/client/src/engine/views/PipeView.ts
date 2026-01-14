import type { PipeState } from '../types'

const PIPE_CONSTANTS = {
  capHeight: 20,
  capOverhang: 5,
} as const

export class PipeView {
  private ctx: CanvasRenderingContext2D
  private color: string
  private width: number

  constructor(ctx: CanvasRenderingContext2D, color: string, width: number) {
    this.ctx = ctx
    this.color = color
    this.width = width
  }

  render(pipe: PipeState, canvasHeight: number): void {
    this.ctx.fillStyle = this.color

    // Верхняя труба
    this.ctx.fillRect(pipe.position.x, 0, pipe.width, pipe.topHeight)

    // Нижняя труба
    this.ctx.fillRect(
      pipe.position.x,
      pipe.bottomY,
      pipe.width,
      canvasHeight - pipe.bottomY
    )

    this.ctx.fillStyle = '#1a5f23'

    // Крышка верхней трубы
    this.ctx.fillRect(
      pipe.position.x - PIPE_CONSTANTS.capOverhang,
      pipe.topHeight - PIPE_CONSTANTS.capHeight,
      pipe.width + PIPE_CONSTANTS.capOverhang * 2,
      PIPE_CONSTANTS.capHeight
    )

    // Крышка нижней трубы
    this.ctx.fillRect(
      pipe.position.x - PIPE_CONSTANTS.capOverhang,
      pipe.bottomY,
      pipe.width + PIPE_CONSTANTS.capOverhang * 2,
      PIPE_CONSTANTS.capHeight
    )
  }
}
