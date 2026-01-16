import type { GameState, GameConfig, GameViewInterface } from '../types'
import { BirdView } from './BirdView'
import { PipeView } from './PipeView'
import { GroundView } from './GroundView'
import { ScoreView } from './ScoreView'

export class GameView implements GameViewInterface {
  private ctx: CanvasRenderingContext2D
  private config: GameConfig
  private groundY: number

  private birdView: BirdView
  private pipeView: PipeView
  private groundView: GroundView
  private scoreView: ScoreView

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context not available')

    this.ctx = ctx
    this.config = config
    this.groundY = canvas.height - config.render.groundHeight

    this.birdView = new BirdView(ctx, config.bird)
    this.pipeView = new PipeView(ctx, config.pipe.color, config.pipe.width)
    this.groundView = new GroundView(ctx, config.render)
    this.scoreView = new ScoreView(ctx, canvas.width, canvas.height)
  }

  render(state: GameState): void {
    this.ctx.fillStyle = this.config.render.backgroundColor
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    state.pipes.forEach(pipe => {
      this.pipeView.render(pipe, this.ctx.canvas.height)
    })

    this.groundView.render(this.ctx.canvas.width, this.groundY)

    if (state.bird.isAlive) {
      this.birdView.render(state.bird)
    }

    this.scoreView.render(state.score)
  }

  resize(width: number, height: number): void {
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
    this.groundY = height - this.config.render.groundHeight
    this.scoreView.resize(width, height)
  }
}
