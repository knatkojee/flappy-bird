import { Pipe, Bird, GameState, GameConfig, GameEngine } from './types'

const OPTIMAL_CONFIG: GameConfig = {
  gravity: 0.15,
  jumpPower: -4.5,
  pipeSpeed: 2.0,
  pipeGap: 180,
  pipeWidth: 80,
  pipeFrequency: 150,
  birdColor: '#FFD700',
  pipeColor: '#228B22',
  backgroundColor: '#87CEEB',
  groundColor: '#8B4513',
  groundHeight: 60,
}

const createInitialGameState = (
  canvas: HTMLCanvasElement,
  config: GameConfig
): GameState => {
  return {
    bird: {
      x: canvas.width / 4,
      y: canvas.height / 2,
      width: 40,
      height: 30,
      velocity: 0,
      gravity: config.gravity,
      jumpPower: config.jumpPower,
      color: config.birdColor,
    },
    pipes: [],
    score: 0,
    gameOver: false,
    isRunning: false,
    frameCount: 0,
  }
}

const generatePipe = (
  canvas: HTMLCanvasElement,
  config: GameConfig,
  groundY: number
): Pipe => {
  const minHeight = 50
  const maxHeight = groundY - config.pipeGap - minHeight
  const topHeight = Math.random() * (maxHeight - minHeight) + minHeight

  return {
    x: canvas.width,
    topHeight,
    bottomY: topHeight + config.pipeGap,
    width: config.pipeWidth,
    gap: config.pipeGap,
    passed: false,
  }
}

const updateBird = (bird: Bird): Bird => ({
  ...bird,
  velocity: bird.velocity + bird.gravity,
  y: bird.y + bird.velocity,
})

const updatePipes = (
  pipes: Pipe[],
  birdX: number,
  pipeSpeed: number
): { pipes: Pipe[]; score: number } => {
  let score = 0
  const updatedPipes = pipes
    .map(pipe => {
      const x = pipe.x - pipeSpeed
      let passed = pipe.passed

      if (!passed && x + pipe.width < birdX) {
        passed = true
        score++
      }

      return { ...pipe, x, passed }
    })
    .filter(pipe => pipe.x + pipe.width > 0)

  return { pipes: updatedPipes, score }
}

const checkCollisions = (
  bird: Bird,
  pipes: Pipe[],
  groundY: number
): boolean => {
  if (bird.y + bird.height > groundY || bird.y < 0) {
    return true
  }

  return pipes.some(pipe => {
    const birdRight = bird.x + bird.width
    const birdLeft = bird.x
    const pipeRight = pipe.x + pipe.width
    const pipeLeft = pipe.x

    if (birdRight > pipeLeft && birdLeft < pipeRight) {
      if (bird.y < pipe.topHeight) return true
      if (bird.y + bird.height > pipe.bottomY) return true
    }
    return false
  })
}

const drawBird = (ctx: CanvasRenderingContext2D, bird: Bird) => {
  ctx.fillStyle = bird.color
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height)

  ctx.fillStyle = '#000'
  ctx.fillRect(bird.x + bird.width - 10, bird.y + 8, 5, 5)

  ctx.fillStyle = '#FF8C00'
  ctx.beginPath()
  ctx.moveTo(bird.x + bird.width, bird.y + bird.height / 2)
  ctx.lineTo(bird.x + bird.width + 15, bird.y + bird.height / 2)
  ctx.lineTo(bird.x + bird.width, bird.y + bird.height / 2 + 8)
  ctx.closePath()
  ctx.fill()
}

const drawPipes = (
  ctx: CanvasRenderingContext2D,
  pipes: Pipe[],
  pipeColor: string
) => {
  ctx.fillStyle = pipeColor

  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight)

    ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, ctx.canvas.height)

    ctx.fillStyle = '#1a5f23'
    ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipe.width + 10, 20)
    ctx.fillRect(pipe.x - 5, pipe.bottomY, pipe.width + 10, 20)
    ctx.fillStyle = pipeColor
  })
}

const drawGround = (
  ctx: CanvasRenderingContext2D,
  groundY: number,
  config: GameConfig
) => {
  ctx.fillStyle = config.groundColor
  ctx.fillRect(0, groundY, ctx.canvas.width, config.groundHeight)

  ctx.fillStyle = '#556B2F'
  ctx.fillRect(0, groundY, ctx.canvas.width, 5)
}

const drawScore = (
  ctx: CanvasRenderingContext2D,
  score: number,
  canvas: HTMLCanvasElement
) => {
  ctx.fillStyle = '#FFF'
  ctx.font = `bold ${canvas.width * 0.06}px Arial`
  ctx.textAlign = 'center'
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 3

  const text = score.toString()
  const x = canvas.width / 2
  const y = canvas.height * 0.1

  ctx.strokeText(text, x, y)
  ctx.fillText(text, x, y)
}

export const createFlappyBirdEngine = (
  canvas: HTMLCanvasElement
): GameEngine => {
  const config = OPTIMAL_CONFIG
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context not available')

  const groundY = canvas.height - config.groundHeight

  let state = createInitialGameState(canvas, config)
  let animationId: number | null = null

  const gameLoop = () => {
    if (!state.isRunning || state.gameOver) return

    state = {
      ...state,
      frameCount: state.frameCount + 1,
    }

    state = {
      ...state,
      bird: updateBird(state.bird),
    }

    if (state.frameCount % config.pipeFrequency === 0) {
      state = {
        ...state,
        pipes: [...state.pipes, generatePipe(canvas, config, groundY)],
      }
    }

    const { pipes: updatedPipes, score: newScore } = updatePipes(
      state.pipes,
      state.bird.x,
      config.pipeSpeed
    )

    state = {
      ...state,
      pipes: updatedPipes,
      score: state.score + newScore,
    }

    if (checkCollisions(state.bird, state.pipes, groundY)) {
      state = {
        ...state,
        gameOver: true,
        isRunning: false,
      }
    }

    ctx.fillStyle = config.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawPipes(ctx, state.pipes, config.pipeColor)
    drawGround(ctx, groundY, config)
    drawBird(ctx, state.bird)
    drawScore(ctx, state.score, canvas)

    if (state.isRunning && !state.gameOver) {
      animationId = requestAnimationFrame(gameLoop)
    }
  }

  const jump = () => {
    if (state.gameOver) return

    if (!state.isRunning) {
      start()
      return
    }

    state = {
      ...state,
      bird: {
        ...state.bird,
        velocity: config.jumpPower,
      },
    }
  }

  const start = () => {
    if (state.isRunning) return

    state = {
      ...state,
      isRunning: true,
      gameOver: false,
    }

    animationId = requestAnimationFrame(gameLoop)
  }

  const reset = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    state = createInitialGameState(canvas, config)

    ctx.fillStyle = config.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawPipes(ctx, state.pipes, config.pipeColor)
    drawGround(ctx, groundY, config)
    drawBird(ctx, state.bird)
    drawScore(ctx, state.score, canvas)

    start()
  }

  const getState = (): GameState => ({ ...state })

  const destroy = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault()
      jump()
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  start()

  return {
    jump,
    start,
    reset,
    getState,
    destroy: () => {
      destroy()
      document.removeEventListener('keydown', handleKeyDown)
    },
  }
}
