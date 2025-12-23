export interface Pipe {
  x: number
  topHeight: number
  bottomY: number
  width: number
  gap: number
  passed: boolean
}

export interface Bird {
  x: number
  y: number
  width: number
  height: number
  velocity: number
  gravity: number
  jumpPower: number
  color: string
}

export interface GameState {
  bird: Bird
  pipes: Pipe[]
  score: number
  gameOver: boolean
  isRunning: boolean
  frameCount: number
}

export interface GameConfig {
  gravity: number
  jumpPower: number
  pipeSpeed: number
  pipeGap: number
  pipeWidth: number
  pipeFrequency: number
  birdColor: string
  pipeColor: string
  backgroundColor: string
  groundColor: string
  groundHeight: number
}

export interface GameEngine {
  jump: () => void
  start: () => void
  reset: () => void
  getState: () => GameState
  destroy: () => void
}
