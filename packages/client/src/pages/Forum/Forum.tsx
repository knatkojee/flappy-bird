import { useState } from 'react'
import { Link } from 'react-router-dom'

import { PAGE_TITLES } from '@/constants/pageTitles'
import { Button, Table, TableBody, TableRow } from '@/components'

import type { ChangeEvent } from 'react'

import classes from './Forum.module.css'

export const forums = [
  {
    id: 0,
    name: 'New games',
    countTopic: 222,
    countComments: 35,
    slug: 'newgames',
  },
  {
    id: 1,
    name: 'Gamedev',
    countTopic: 22,
    countComments: 3,
    slug: 'gamedev',
  },
]

const Forum = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [topicName, setTopicName] = useState('')

  const handleToggleEditor = () => {
    setShowEditor(prev => !prev)
  }

  const handleChangeTopicName = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopicName(e.target.value)
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (topicName.length > 0) {
      forums.push({
        id: Number(new Date()),
        name: topicName,
        countTopic: 0,
        countComments: 0,
        slug: topicName,
      })
      setTopicName('')
      setShowEditor(false)
    }
  }

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>{PAGE_TITLES.FORUM}</h1>

      <Table className={classes.table}>
        <thead>
          <TableRow>
            <th>Название</th>
            <th>Топики</th>
            <th>Комментарии</th>
          </TableRow>
        </thead>

        <TableBody>
          {forums.map(forum => (
            <TableRow key={forum.id}>
              <td>
                <Link className={classes.link} to={`/forum/${forum.slug}`}>
                  {forum.name}
                </Link>
              </td>
              <td>
                <span className={classes.count}>{forum.countTopic}</span>
              </td>
              <td>{forum.countComments}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={handleToggleEditor} className={classes.addForum}>
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
    </section>
  )
}

export default Forum
