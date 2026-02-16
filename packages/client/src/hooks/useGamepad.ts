import { useCallback, useEffect, useRef } from 'react'

type GamepadHandler = (buttonIndex: number) => void

export const useGamepadPlay = (
  onJump: () => void,
  isActive = true,
  onButtonPress?: GamepadHandler
) => {
  const animationFrameRef = useRef<number>()
  const pressedButtonsRef = useRef<Set<number>>(new Set())

  const pollGamepads = useCallback(() => {
    if (!isActive) return

    const gamepads = navigator.getGamepads()

    for (const gamepad of gamepads) {
      if (!gamepad) continue

      gamepad.buttons.forEach((button, index) => {
        if (button && button.pressed) {
          if (!pressedButtonsRef.current.has(index)) {
            pressedButtonsRef.current.add(index)

            if (index === 0 && onJump) {
              onJump()
            }

            if (onButtonPress) {
              onButtonPress(index)
            }
          }
        } else {
          pressedButtonsRef.current.delete(index)
        }
      })
    }

    animationFrameRef.current = requestAnimationFrame(pollGamepads)
  }, [onJump, onButtonPress, isActive])

  useEffect(() => {
    if (!isActive) return

    animationFrameRef.current = requestAnimationFrame(pollGamepads)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      pressedButtonsRef.current.clear()
    }
  }, [pollGamepads, isActive])
}
