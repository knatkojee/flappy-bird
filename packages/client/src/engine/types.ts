export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type BirdConfig = {
  gravity: number
  jumpPower: number
  color: string
  size: Size
}

export type PipeConfig = {
  speed: number
  gap: number
  width: number
  frequency: number
  color: string
}

export type RenderConfig = {
  backgroundColor: string
  groundColor: string
  groundHeight: number
}

export type GameConfig = {
  bird: BirdConfig
  pipe: PipeConfig
  render: RenderConfig
}

export type BirdState = {
  position: Position
  velocity: number
  isAlive: boolean
}

export type PipeState = {
  position: Position
  topHeight: number
  bottomY: number
  width: number
  passed: boolean
}

export type GameState = {
  bird: BirdState
  pipes: PipeState[]
  score: number
  isRunning: boolean
  isGameOver: boolean
  frameCount: number
}

export type GameModelInterface = {
  getState(): GameState
  getConfig(): GameConfig
  update(): void
  jump(): void
  start(): void
  stop(): void
  reset(): void
  resize(canvasSize: Size): void
}

export type GameViewInterface = {
  render(state: GameState): void
  resize(width: number, height: number): void
}

export type GameControllerInterface = {
  start(): void
  stop(): void
  jump(): void
  reset(): void
  getState(): GameState
  resize(canvasSize: Size): void
  destroy(): void
}
