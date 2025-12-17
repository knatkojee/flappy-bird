import React, { useRef, useEffect, useState } from 'react'
import { createFlappyBirdEngine } from '../../engine/index'

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
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}>
        <h1
          style={{
            fontSize: '3rem',
            margin: '0',
            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '900',
          }}>
          Flappy Bird
        </h1>
      </div>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '70vh',
          maxHeight: '600px',
          position: 'relative',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          border: '4px solid #2c3e50',
          background: '#1a1a2e',
        }}>
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />

        {isGameOver && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0, 0, 0, 0.92)',
              color: 'white',
              padding: '40px',
              borderRadius: '15px',
              textAlign: 'center',
              minWidth: '300px',
              maxWidth: '90%',
              border: '3px solid #ff4444',
              backdropFilter: 'blur(5px)',
            }}>
            <h2
              style={{
                color: '#ff4444',
                marginTop: 0,
                fontSize: '2.5rem',
                textShadow: '0 0 10px rgba(255,68,68,0.5)',
              }}>
              GAME OVER
            </h2>
            <div
              style={{
                fontSize: '2rem',
                margin: '25px 0',
                fontWeight: 'bold',
                color: '#FFD700',
              }}>
              Score: {score}
            </div>
            <button
              onClick={() => {
                if (gameRef.current) {
                  gameRef.current.reset()
                }
              }}
              style={{
                background: 'linear-gradient(90deg, #4CAF50, #45a049)',
                color: 'white',
                border: 'none',
                padding: '15px 40px',
                fontSize: '1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 5px 15px rgba(76,175,80,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow =
                  '0 8px 20px rgba(76,175,80,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow =
                  '0 5px 15px rgba(76,175,80,0.4)'
              }}>
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: '20px',
          textAlign: 'center',
          color: 'white',
          fontSize: '1rem',
          background: 'rgba(0,0,0,0.3)',
          padding: '15px 30px',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}>
          <div
            style={{
              background: '#3498db',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            }}>
            SPACE
          </div>
          <span>пробел чтобы прыгать</span>
        </div>
      </div>
    </div>
  )
}

export default GameProcess
