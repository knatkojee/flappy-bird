import { GameModel } from '../models/GameModel'
import { GameView } from '../views/GameView'
import type {
  GameControllerInterface,
  GameConfig,
  Size,
  GameState,
} from '../types'

export class GameController implements GameControllerInterface {
  private model: GameModel
  private view: GameView
  private animationId: number | null = null
  private isInitialized = false
  private onGameOver?: (score: number) => void

  constructor(
    canvas: HTMLCanvasElement,
    config: GameConfig,
    onGameOver?: (score: number) => void
  ) {
    const canvasSize: Size = {
      width: canvas.width,
      height: canvas.height,
    }

    this.model = new GameModel(canvasSize, config)
    this.view = new GameView(canvas, config)
    this.onGameOver = onGameOver
    this.isInitialized = true
  }

  start(): void {
    if (this.animationId || !this.isInitialized) return

    this.model.start()
    this.gameLoop()
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    this.model.stop()
  }

  private gameLoop = (): void => {
    const state = this.model.getState()

    if (state.isRunning && !state.isGameOver) {
      this.model.update()
    }

    if (state.isGameOver && this.onGameOver) {
      this.onGameOver(state.score)
      this.stop()
      return
    }

    this.view.render(state)

    this.animationId = requestAnimationFrame(this.gameLoop)
  }

  jump(): void {
    if (!this.isInitialized) return
    this.model.jump()
  }

  reset(): void {
    this.stop()
    this.model.reset()
    this.start()
  }

  getState(): GameState {
    return this.model.getState()
  }

  resize(canvasSize: Size): void {
    if (!this.isInitialized) return

    this.model.resize(canvasSize)
    this.view.resize(canvasSize.width, canvasSize.height)
  }

  destroy(): void {
    this.stop()
    this.isInitialized = false
  }
}
