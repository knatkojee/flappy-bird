import type { Pipe, Bird, GameState, GameConfig, GameEngine } from './types'

const VISUAL_CONSTANTS = {
  birdEyeSize: 5,
  birdEyeOffsetX: 10,
  birdEyeOffsetY: 8,
  beakLength: 15,
  beakHeight: 8,
  pipeCapHeight: 20,
  pipeCapOverhang: 5,
  groundBorderHeight: 5,
} as const

const SCORE_CONFIG = {
  fontSizeMultiplier: 0.06,
  xPositionMultiplier: 0.5,
  yPositionMultiplier: 0.1,
  strokeWidth: 3,
} as const

const OPTIMAL_CONFIG: GameConfig = {
  gravity: 0.5,
  jumpPower: -8,
  pipeSpeed: 3.5,
  pipeGap: 180,
  pipeWidth: 80,
  pipeFrequency: 100,
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
  ctx.fillRect(
    bird.x + bird.width - VISUAL_CONSTANTS.birdEyeOffsetX,
    bird.y + VISUAL_CONSTANTS.birdEyeOffsetY,
    VISUAL_CONSTANTS.birdEyeSize,
    VISUAL_CONSTANTS.birdEyeSize
  )

  ctx.fillStyle = '#FF8C00'
  ctx.beginPath()
  ctx.moveTo(bird.x + bird.width, bird.y + bird.height / 2)
  ctx.lineTo(
    bird.x + bird.width + VISUAL_CONSTANTS.beakLength,
    bird.y + bird.height / 2
  )
  ctx.lineTo(
    bird.x + bird.width,
    bird.y + bird.height / 2 + VISUAL_CONSTANTS.beakHeight
  )
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
    ctx.fillRect(
      pipe.x - VISUAL_CONSTANTS.pipeCapOverhang,
      pipe.topHeight - VISUAL_CONSTANTS.pipeCapHeight,
      pipe.width + VISUAL_CONSTANTS.pipeCapOverhang * 2,
      VISUAL_CONSTANTS.pipeCapHeight
    )
    ctx.fillRect(
      pipe.x - VISUAL_CONSTANTS.pipeCapOverhang,
      pipe.bottomY,
      pipe.width + VISUAL_CONSTANTS.pipeCapOverhang * 2,
      VISUAL_CONSTANTS.pipeCapHeight
    )
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
  ctx.fillRect(
    0,
    groundY,
    ctx.canvas.width,
    VISUAL_CONSTANTS.groundBorderHeight
  )
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

  const createDrawScore = () => {
    const fontSize = canvas.width * SCORE_CONFIG.fontSizeMultiplier
    const x = canvas.width * SCORE_CONFIG.xPositionMultiplier
    const y = canvas.height * SCORE_CONFIG.yPositionMultiplier
    const font = `bold ${fontSize}px Arial`

    return (score: number) => {
      ctx.fillStyle = '#FFF'
      ctx.font = font
      ctx.textAlign = 'center'
      ctx.strokeStyle = '#000'
      ctx.lineWidth = SCORE_CONFIG.strokeWidth

      const text = score.toString()
      ctx.strokeText(text, x, y)
      ctx.fillText(text, x, y)
    }
  }

  const drawScore = createDrawScore()

  const gameLoop = () => {
    if (!state.isRunning || state.gameOver) return

    const frameCount = state.frameCount + 1
    const bird = updateBird(state.bird)

    let pipes = state.pipes
    let score = state.score

    if (frameCount % config.pipeFrequency === 0) {
      pipes = [...pipes, generatePipe(canvas, config, groundY)]
    }

    const { pipes: updatedPipes, score: newScore } = updatePipes(
      pipes,
      bird.x,
      config.pipeSpeed
    )

    pipes = updatedPipes
    score += newScore

    const gameOver = checkCollisions(bird, pipes, groundY)

    state = {
      ...state,
      frameCount,
      bird,
      pipes,
      score,
      gameOver,
      isRunning: !gameOver && state.isRunning,
    }

    ctx.fillStyle = config.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawPipes(ctx, state.pipes, config.pipeColor)
    drawGround(ctx, groundY, config)
    drawBird(ctx, state.bird)
    drawScore(state.score)

    if (state.isRunning && !state.gameOver) {
      animationId = requestAnimationFrame(gameLoop)
    }
  }

  const jump: VoidFunction = () => {
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

  const start: VoidFunction = () => {
    if (state.isRunning) return

    state = {
      ...state,
      isRunning: true,
      gameOver: false,
    }

    animationId = requestAnimationFrame(gameLoop)
  }

  const reset: VoidFunction = () => {
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

    start()
  }

  const getState = (): GameState => ({ ...state })

  const destroy: VoidFunction = () => {
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
