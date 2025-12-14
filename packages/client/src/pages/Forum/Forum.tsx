import { useState } from 'react'
import { Link } from 'react-router-dom'

import { PAGE_TITLES } from '@/constants/pageTitles'
import { FORUMS } from '@/constants/forums'
import { Button } from '@/components'

import type { ChangeEvent } from 'react'

import classes from './Forum.module.css'

const Forum = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [topicName, setTopicName] = useState('')

  const handleShowEditor = () => {
    setShowEditor(prev => !prev)
  }

  const handleChangeTopicName = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopicName(e.target.value)
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (topicName.length > 0) {
      setShowEditor(false)
    }
  }

  const FORUM_ROWS = FORUMS.map(forum => (
    <tr key={forum.id}>
      <td>
        <Link className={classes.link} to={`/forum/${forum.slug}`}>
          {forum.name}
        </Link>
      </td>
      <td>
        <span className={classes.count}>{forum.countTopic}</span>
      </td>
      <td>{forum.countComments}</td>
    </tr>
  ))

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{PAGE_TITLES.FORUM}</h1>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Топики</th>
            <th>Комментарии</th>
          </tr>
        </thead>

        <tbody>{FORUM_ROWS}</tbody>
      </table>

      <Button onClick={handleShowEditor} className={classes.addForum}>
        {!showEditor ? 'Создать топик' : 'Отмена'}
      </Button>

      {showEditor && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={topicName}
            placeholder="Введите название топика"
            className={classes.editor}
            onChange={handleChangeTopicName}
          />
          <Button disabled={topicName.length < 1} type="submit">
            Отправить
          </Button>
        </form>
      )}
    </div>
  )
}

export default Forum
