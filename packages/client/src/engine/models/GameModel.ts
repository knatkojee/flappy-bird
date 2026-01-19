import type { GameModelInterface, GameState, GameConfig, Size } from '../types'

export class GameModel implements GameModelInterface {
  private state: GameState
  private config: GameConfig
  private canvasSize: Size

  constructor(canvasSize: Size, config: GameConfig) {
    this.canvasSize = canvasSize
    this.config = config
    this.state = this.createInitialState()
  }

  private createInitialState(): GameState {
    return {
      bird: {
        position: {
          x: this.canvasSize.width / 4,
          y: this.canvasSize.height / 2,
        },
        velocity: 0,
        isAlive: true,
      },
      pipes: [],
      score: 0,
      isRunning: false,
      isGameOver: false,
      frameCount: 0,
    }
  }

  update(): void {
    if (!this.state.isRunning || this.state.isGameOver) return

    this.state.frameCount++
    this.updateBird()
    this.updatePipes()
    this.checkCollisions()
  }

  private updateBird(): void {
    const bird = this.state.bird
    bird.velocity += this.config.bird.gravity
    bird.position.y += bird.velocity
  }

  private updatePipes(): void {
    const config = this.config.pipe

    if (this.state.frameCount % config.frequency === 0) {
      this.addPipe()
    }

    this.state.pipes = this.state.pipes
      .map(pipe => {
        const newX = pipe.position.x - config.speed
        let passed = pipe.passed

        if (!passed && newX + pipe.width < this.state.bird.position.x) {
          passed = true
          this.state.score++
        }

        return {
          ...pipe,
          position: { ...pipe.position, x: newX },
          passed,
        }
      })
      .filter(pipe => pipe.position.x + pipe.width > 0)
  }

  private addPipe(): void {
    const config = this.config.pipe
    const minHeight = 50
    const maxHeight =
      this.canvasSize.height -
      this.config.render.groundHeight -
      config.gap -
      minHeight
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight

    this.state.pipes.push({
      position: { x: this.canvasSize.width, y: 0 },
      topHeight,
      bottomY: topHeight + config.gap,
      width: config.width,
      passed: false,
    })
  }

  private checkCollisions(): void {
    const bird = this.state.bird
    const birdSize = this.config.bird.size

    const groundY = this.canvasSize.height - this.config.render.groundHeight
    if (bird.position.y + birdSize.height > groundY) {
      this.gameOver()
      bird.position.y = groundY - birdSize.height
      return
    }

    if (bird.position.y < 0) {
      this.gameOver()
      bird.position.y = 0
      return
    }

    for (const pipe of this.state.pipes) {
      const birdRight = bird.position.x + birdSize.width
      const birdLeft = bird.position.x
      const pipeRight = pipe.position.x + pipe.width
      const pipeLeft = pipe.position.x

      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        if (
          bird.position.y < pipe.topHeight ||
          bird.position.y + birdSize.height > pipe.bottomY
        ) {
          this.gameOver()
          return
        }
      }
    }
  }

  private gameOver(): void {
    if (!this.state.isGameOver) {
      this.state.isGameOver = true
      this.state.isRunning = false
      this.state.bird.isAlive = false
    }
  }

  jump(): void {
    this.state.bird.velocity = this.config.bird.jumpPower
  }

  start(): void {
    if (this.state.isRunning || this.state.isGameOver) return
    this.state.isRunning = true
    this.state.isGameOver = false
    this.state.bird.isAlive = true
  }

  stop(): void {
    this.state.isRunning = false
  }

  reset(): void {
    this.state = this.createInitialState()
  }

  resize(canvasSize: Size): void {
    const scaleX = canvasSize.width / this.canvasSize.width
    const scaleY = canvasSize.height / this.canvasSize.height

    this.state.bird.position.x *= scaleX
    this.state.bird.position.y *= scaleY

    this.state.pipes = this.state.pipes.map(pipe => ({
      ...pipe,
      position: {
        x: pipe.position.x * scaleX,
        y: pipe.position.y,
      },
      topHeight: pipe.topHeight * scaleY,
      bottomY: pipe.bottomY * scaleY,
    }))

    this.canvasSize = canvasSize
  }

  getState(): GameState {
    return { ...this.state }
  }

  getConfig(): GameConfig {
    return { ...this.config }
  }
}
