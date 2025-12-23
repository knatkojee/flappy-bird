import { useRef, useEffect, useState } from 'react'
import { createFlappyBirdEngine } from '../../engine/index'
import styles from './GameProcess.module.css'

const GameProcess = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<ReturnType<typeof createFlappyBirdEngine> | null>(null)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (canvas && container) {
      const { width, height } = container.getBoundingClientRect()

      const targetRatio = 4 / 3
      const containerRatio = width / height

      let newWidth, newHeight

      if (containerRatio > targetRatio) {
        newHeight = height
        newWidth = height * targetRatio
      } else {
        newWidth = width
        newHeight = width / targetRatio
      }

      canvas.width = newWidth
      canvas.height = newHeight

      if (gameRef.current) {
        gameRef.current.destroy()
      }

      gameRef.current = createFlappyBirdEngine(canvas)

      const updateInterval = setInterval(() => {
        if (gameRef.current) {
          const state = gameRef.current.getState()
          setScore(state.score)
          setIsGameOver(state.gameOver)
        }
      }, 16)

      return () => clearInterval(updateInterval)
    }
  }

  useEffect(() => {
    resizeCanvas()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (gameRef.current) {
        gameRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (gameRef.current) {
          gameRef.current.jump()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Flappy Bird</h1>
      </div>

      <div ref={containerRef} className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {isGameOver && (
          <div className={styles.gameOverOverlay}>
            <h2 className={styles.gameOverTitle}>GAME OVER</h2>
            <div className={styles.score}>Score: {score}</div>
            <button
              onClick={() => {
                if (gameRef.current) {
                  gameRef.current.reset()
                }
              }}
              className={styles.restartButton}>
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      <div className={styles.controlsInfo}>
        <div className={styles.controlsContent}>
          <div className={styles.spaceKey}>SPACE</div>
          <span>пробел чтобы прыгать</span>
        </div>
      </div>
    </div>
  )
}

export default GameProcess
