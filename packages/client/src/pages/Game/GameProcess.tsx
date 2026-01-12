import { useRef, useEffect, useCallback } from 'react'
import { GameController } from '@/engine/controllers/GameController'
import { DEFAULT_CONFIG } from '@/engine/configs/defaultConfig'
import styles from './GameProcess.module.css'

const GameProcess = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<GameController | null>(null)

  const initGame = useCallback(() => {
    if (!canvasRef.current) return
    controllerRef.current?.destroy()
    controllerRef.current = new GameController(
      canvasRef.current,
      DEFAULT_CONFIG
    )
    controllerRef.current.start()
  }, [])

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

  const handleJump = useCallback(() => {
    controllerRef.current?.jump()
  }, [])

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
  }, [resizeCanvas, initGame, handleJump])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Flappy Bird</h1>
      </div>

      <div ref={containerRef} className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      <div className={styles.controlsInfo}>
        <div className={styles.controlsContent}>
          <div className={styles.spaceKey}>SPACE</div>
          <span>пробел для прыжка</span>
        </div>
      </div>
    </div>
  )
}

export default GameProcess
