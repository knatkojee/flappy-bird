type Cloud = {
  x: number
  y: number
  width: number
  height: number
}

const CLOUD_CONSTANTS = {
  count: 5,
  minWidth: 60,
  maxWidth: 120,
  minHeight: 30,
  maxHeight: 50,
  speed: 0.3,
} as const

export class CloudView {
  private ctx: CanvasRenderingContext2D
  private clouds: Cloud[] = []
  private canvasWidth: number
  private canvasHeight: number

  constructor(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.ctx = ctx
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.initClouds()
  }

  private initClouds(): void {
    for (let i = 0; i < CLOUD_CONSTANTS.count; i++) {
      this.clouds.push({
        x: Math.random() * this.canvasWidth,
        y: Math.random() * (this.canvasHeight * 0.4),
        width:
          CLOUD_CONSTANTS.minWidth +
          Math.random() * (CLOUD_CONSTANTS.maxWidth - CLOUD_CONSTANTS.minWidth),
        height:
          CLOUD_CONSTANTS.minHeight +
          Math.random() *
            (CLOUD_CONSTANTS.maxHeight - CLOUD_CONSTANTS.minHeight),
      })
    }
  }

  render(isRunning: boolean): void {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'

    this.clouds.forEach(cloud => {
      if (isRunning) {
        cloud.x -= CLOUD_CONSTANTS.speed

        if (cloud.x + cloud.width < 0) {
          cloud.x = this.canvasWidth
          cloud.y = Math.random() * (this.canvasHeight * 0.4)
        }
      }

      // Облако из трёх кругов
      this.ctx.beginPath()
      this.ctx.arc(cloud.x, cloud.y, cloud.height / 2, 0, Math.PI * 2)
      this.ctx.arc(
        cloud.x + cloud.width / 3,
        cloud.y - cloud.height / 4,
        cloud.height / 2.5,
        0,
        Math.PI * 2
      )
      this.ctx.arc(
        cloud.x + cloud.width * 0.66,
        cloud.y,
        cloud.height / 2.2,
        0,
        Math.PI * 2
      )
      this.ctx.fill()
    })
  }

  resize(width: number, height: number): void {
    this.canvasWidth = width
    this.canvasHeight = height
    this.clouds = []
    this.initClouds()
  }
}
