export class ScoreView {
  private ctx: CanvasRenderingContext2D
  private fontSize: number
  private x: number
  private y: number

  constructor(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.ctx = ctx
    this.fontSize = canvasWidth * 0.06
    this.x = canvasWidth * 0.5
    this.y = canvasHeight * 0.1
  }

  render(score: number): void {
    this.ctx.fillStyle = '#FFF'
    this.ctx.font = `bold ${this.fontSize}px Arial`
    this.ctx.textAlign = 'center'
    this.ctx.strokeStyle = '#000'
    this.ctx.lineWidth = 3

    const text = score.toString()
    this.ctx.strokeText(text, this.x, this.y)
    this.ctx.fillText(text, this.x, this.y)
  }

  resize(canvasWidth: number, canvasHeight: number): void {
    this.fontSize = canvasWidth * 0.06
    this.x = canvasWidth * 0.5
    this.y = canvasHeight * 0.1
  }
}
