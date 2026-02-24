import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Button } from '@/components'
import Comment from './Comment/Comment'

import { forums } from '../Forum/Forum'

import type { ChangeEvent } from 'react'

import classes from './ForumTopic.module.css'

export const comments = [
  {
    id: 0,
    authorName: 'Pumpkin Pandas',
    message: 'super game!',
    reactions: { '🔥': 3, '👍': 7 } as Record<string, number>,
  },
  {
    id: 1,
    authorName: 'Andrey',
    message: 'Great!',
    reactions: { '❤️': 2 } as Record<string, number>,
  },
  {
    id: 2,
    authorName: 'Vasiliy',
    message: 'Yack!',
    reactions: {} as Record<string, number>,
  },
]

const ForumTopic = () => {
  const [textComment, setTextComment] = useState('')
  const [title, setTitle] = useState('')

  const location = useLocation()
  const forumSlug = location.pathname.split('/')[2]

  const handleChangeTextComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextComment(e.target.value)
  }

  const handleSubmitComment = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    comments.push({
      id: Number(new Date()),
      authorName: 'Your name',
      message: textComment,
      reactions: {},
    })
    setTextComment('')
  }

  useEffect(() => {
    const findForum = forums.find(item => item.slug === forumSlug)

    if (findForum) {
      setTitle(findForum.name)
    }
  }, [])

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>

      <ul className={classes.comments}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            authorName={comment.authorName}
            message={comment.message}
            reactions={comment.reactions}
          />
        ))}
      </ul>

      <form onSubmit={handleSubmitComment}>
        <textarea
          value={textComment}
          placeholder="Оставить комментарий"
          className={classes.editor}
          onChange={handleChangeTextComment}
        />
        <Button disabled={textComment.length < 1} type="submit">
          Add comment
        </Button>
      </form>
    </div>
  )
}

export default ForumTopic
