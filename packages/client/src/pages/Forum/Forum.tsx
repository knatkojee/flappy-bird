import { Link } from 'react-router-dom'
import classes from './Forum.module.css'
import { ROUTES } from '@/constants/routes'

const FORUMS = [
  {
    id: 0,
    name: 'New games',
    countTopic: 222,
    countComments: 35,
  },
  {
    id: 1,
    name: 'Gamedev',
    countTopic: 22,
    countComments: 3,
  },
]

const Forum = () => {
  const FORUM_ROWS = FORUMS.map(forum => (
    <tr key={forum.id}>
      <td>
        <Link className={classes.link} to={ROUTES.PROTECTED.FORUM_TOPIC}>
          {forum.name}
        </Link>
      </td>
      <td>
        <span className={classes.count}>
          {forum.countTopic}{' '}
          <button title="Добавить форум" className={classes.addForum}>
            +
          </button>
        </span>
      </td>
      <td>{forum.countComments}</td>
    </tr>
  ))

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Forums</h1>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>TOPICS</th>
            <th>COMMENTS</th>
          </tr>
        </thead>

        <tbody>{FORUM_ROWS}</tbody>
      </table>
    </div>
  )
}

export default Forum
