import { useState } from 'react'
import EmojiPicker from './EmojiPicker'
import classes from './Comment.module.css'

type CommentProps = {
  id: number
  authorName: string
  message: string
  reactions?: Record<string, number>
}

const Comment = ({
  id,
  authorName,
  message,
  reactions: initialReactions = {},
}: CommentProps) => {
  const [reactions, setReactions] =
    useState<Record<string, number>>(initialReactions)
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set())
  const [pickerOpen, setPickerOpen] = useState(false)

  const toggleReaction = (emoji: string) => {
    const isActive = userReactions.has(emoji)

    setUserReactions(prev => {
      const next = new Set(prev)
      isActive ? next.delete(emoji) : next.add(emoji)
      return next
    })

    setReactions(prev => {
      const current = prev[emoji] ?? 0
      if (isActive) {
        const updated = { ...prev }
        if (current <= 1) {
          delete updated[emoji]
        } else {
          updated[emoji] = current - 1
        }
        return updated
      }
      return { ...prev, [emoji]: current + 1 }
    })
  }

  const handleSelectEmoji = (emoji: string) => {
    toggleReaction(emoji)
    setPickerOpen(false)
  }

  const activeReactions = Object.entries(reactions)

  return (
    <li className={classes.comment} key={id}>
      <p className={classes.name}>{authorName}</p>
      <p className={classes.message}>{message}</p>

      <div className={classes.footer}>
        <div className={classes.reactionsRow}>
          {activeReactions.map(([emoji, count]) => (
            <button
              key={emoji}
              type="button"
              onClick={() => toggleReaction(emoji)}
              className={`${classes.reactionBubble} ${
                userReactions.has(emoji) ? classes.reactionActive : ''
              }`}>
              {emoji} <span className={classes.reactionCount}>{count}</span>
            </button>
          ))}

          <div className={classes.pickerWrapper}>
            <button
              type="button"
              className={classes.addReactionBtn}
              onClick={() => setPickerOpen(prev => !prev)}
              aria-label="Add reaction">
              ➕
            </button>
            {pickerOpen && (
              <EmojiPicker
                onSelect={handleSelectEmoji}
                onClose={() => setPickerOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default Comment
