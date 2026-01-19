import { useRef, useEffect, useCallback } from 'react'
import { GameController } from '@/engine/controllers/GameController'
import { DEFAULT_CONFIG } from '@/engine/configs/defaultConfig'
import styles from './GameProcess.module.css'
import GameStartScreen from '../GameStartScreen/GameStartScreen'
import { GameOverScreen } from '../GameOverScreen/GameOverScreen'

interface GameProcessProps {
  showStartScreen?: boolean
  showGameOverScreen?: boolean
  score?: number
  onStartGame: VoidFunction
  onRestartGame: VoidFunction
  onGameOver: (score: number) => void
  onBack: VoidFunction
}

const GameProcess = ({
  showStartScreen = false,
  showGameOverScreen = false,
  score = 0,
  onStartGame,
  onRestartGame,
  onGameOver,
  onBack,
}: GameProcessProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<GameController | null>(null)

  const initGame = useCallback(() => {
    if (!canvasRef.current) return
    controllerRef.current?.destroy()

    controllerRef.current = new GameController(
      canvasRef.current,
      DEFAULT_CONFIG,
      (finalScore: number) => {
        if (onGameOver) {
          onGameOver(finalScore)
        }
      }
    )

    if (!showStartScreen) {
      controllerRef.current.start()
    }
  }, [showStartScreen, onGameOver])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
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

    if (controllerRef.current) {
      controllerRef.current.resize({ width: newWidth, height: newHeight })
    }
  }, [])

  const handleJump = () => {
    controllerRef.current?.jump()
  }

  useEffect(() => {
    resizeCanvas()
    initGame()

    const handleResize = () => {
      resizeCanvas()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        handleJump()
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      document.removeEventListener('keydown', handleKeyDown)

      controllerRef.current?.destroy()
    }
  }, [resizeCanvas, initGame])

  return (
    <>
      {!showStartScreen && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Flappy Bird</h1>
          </div>
          <div ref={containerRef} className={styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.canvas} />
            {showGameOverScreen && (
              <div className={styles.overlay}>
                <GameOverScreen
                  isVisible={showGameOverScreen}
                  score={score}
                  repeatGame={() => {
                    onRestartGame()
                    controllerRef.current?.reset()
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.controlsInfo}>
            <div className={styles.controlsContent}>
              <div className={styles.spaceKey}>SPACE</div>
              <span>пробел для прыжка</span>
            </div>
          </div>
        </div>
      )}

      {showStartScreen && (
        <GameStartScreen
          isVisible={showStartScreen}
          onStartGame={() => {
            onStartGame()
            controllerRef.current?.start()
          }}
          onBack={onBack}
        />
      )}
    </>
  )
}

export default GameProcess
