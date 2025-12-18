import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button/Button'
import styles from './Home.module.css'

const ActionsBlock = () => {
  return (
    <div className={styles.actionsBlock}>
      <Link to="/login">
        <Button variant="primary">Начинайте играть</Button>
      </Link>
      <Link to="/register">
        <Button variant="outline">Создать аккаунт</Button>
      </Link>
    </div>
  )
}

export default ActionsBlock
