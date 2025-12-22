import { useState } from 'react'
import classes from './Comment.module.css'

type CommentProps = {
  id: number
  authorName: string
  message: string
  likesCount: number
}

const Comment = ({ id, authorName, message, likesCount }: CommentProps) => {
  const [liked, setLiked] = useState(false)

  const handleToggleLiked = () => {
    setLiked(prev => !prev)
  }

  return (
    <li className={classes.comment} key={id}>
      <p className={classes.name}>{authorName}</p>
      <p className={classes.message}>{message}</p>
      <button
        onClick={handleToggleLiked}
        className={`${classes.like} ${liked ? classes.liked : ''}`}>
        <span className={classes.heart}>♥</span> {likesCount}
      </button>
    </li>
  )
}

export default Comment
