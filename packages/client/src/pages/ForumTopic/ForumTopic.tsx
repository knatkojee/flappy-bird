import { Button } from '@/components'
import Comment from './Comment/Comment'

import type { FC } from 'react'
import type { IForumTopicProps } from './ForumTopic.props'

import classes from './ForumTopic.module.css'

const COMMENTS = [
  {
    id: 0,
    authorName: 'Pumpkin Pandas',
    message: 'super game!',
    likesCount: 5,
  },
  {
    id: 1,
    authorName: 'Andrey',
    message: 'Great!',
    likesCount: 15,
  },
  {
    id: 2,
    authorName: 'Vasiliy',
    message: 'Yack!',
    likesCount: 99,
  },
]

const ForumTopic: FC<IForumTopicProps> = ({ title = 'Gamedev' }) => {
  const COMMENTS_LIST = COMMENTS.map(comment => (
    <Comment
      key={comment.id}
      id={comment.id}
      authorName={comment.authorName}
      message={comment.message}
      likesCount={comment.likesCount}
    />
  ))

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>

      <ul className={classes.comments}>{COMMENTS_LIST}</ul>

      <Button>Add comment</Button>
    </div>
  )
}

export default ForumTopic
