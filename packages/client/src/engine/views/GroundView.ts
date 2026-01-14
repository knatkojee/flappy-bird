import type { RenderConfig } from '../types'

type GrassBlade = {
  x: number
  height: number
}

const GROUND_CONSTANTS = {
  borderHeight: 5,
  grassBladeWidth: 3,
  grassBladeHeight: 8,
  grassSpacing: 4,
} as const

export class GroundView {
  private ctx: CanvasRenderingContext2D
  private config: RenderConfig
  private pipeSpeed: number
  private grassBlades: GrassBlade[] = []
  private canvasWidth: number

  constructor(
    ctx: CanvasRenderingContext2D,
    config: RenderConfig,
    pipeSpeed: number
  ) {
    this.ctx = ctx
    this.config = config
    this.pipeSpeed = pipeSpeed
    this.canvasWidth = ctx.canvas.width
    this.initGrass()
  }

  private initGrass(): void {
    for (
      let x = 0;
      x < this.canvasWidth + GROUND_CONSTANTS.grassSpacing;
      x += GROUND_CONSTANTS.grassSpacing
    ) {
      this.grassBlades.push({
        x,
        height: GROUND_CONSTANTS.grassBladeHeight + Math.random() * 4,
      })
    }
  }

  render(canvasWidth: number, groundY: number, isRunning: boolean): void {
    // Основание земли
    this.ctx.fillStyle = this.config.groundColor
    this.ctx.fillRect(0, groundY, canvasWidth, this.config.groundHeight)

    // Верхняя граница земли
    this.ctx.fillStyle = '#556B2F'
    this.ctx.fillRect(0, groundY, canvasWidth, GROUND_CONSTANTS.borderHeight)

    // Паттерн травы
    this.ctx.fillStyle = '#4a7c2f'
    this.grassBlades.forEach(blade => {
      if (isRunning) {
        blade.x -= this.pipeSpeed

        if (blade.x < -GROUND_CONSTANTS.grassSpacing) {
          blade.x = canvasWidth
          blade.height = GROUND_CONSTANTS.grassBladeHeight + Math.random() * 4
        }
      }

      this.ctx.fillRect(
        blade.x,
        groundY - blade.height,
        GROUND_CONSTANTS.grassBladeWidth,
        blade.height
      )
    })
  }
}
