import { useEffect, useRef } from 'react'
import classes from './EmojiPicker.module.css'

const AVAILABLE_EMOJIS = ['👍', '👎', '❤️', '😂', '😮', '😢', '🔥', '🎉']

type EmojiPickerProps = {
  onSelect: (emoji: string) => void
  onClose: () => void
}

const EmojiPicker = ({ onSelect, onClose }: EmojiPickerProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div ref={ref} className={classes.picker}>
      {AVAILABLE_EMOJIS.map(emoji => (
        <button
          key={emoji}
          className={classes.emojiBtn}
          onClick={() => onSelect(emoji)}
          type="button"
          aria-label={`React with ${emoji}`}>
          {emoji}
        </button>
      ))}
    </div>
  )
}

export default EmojiPicker
