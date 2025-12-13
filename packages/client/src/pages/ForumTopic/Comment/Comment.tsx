import { useState } from 'react'
import classes from './Comment.module.css'

import type { FC } from 'react'
import type { ICommentProps } from './Comment.props'

const Comment: FC<ICommentProps> = ({
  id,
  authorName,
  message,
  likesCount,
}) => {
  const [liked, setLiked] = useState(false)

  const handleLiked = () => {
    setLiked(prev => !prev)
  }

  return (
    <li className={classes.comment} key={id}>
      <p className={classes.name}>{authorName}</p>
      <p className={classes.message}>{message}</p>
      <button
        onClick={handleLiked}
        className={`${classes.like} ${liked ? classes.liked : ''}`}>
        <span className={classes.heart}>♥</span> {likesCount}
      </button>
    </li>
  )
}

export default Comment
