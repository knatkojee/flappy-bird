import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button/Button'
import styles from '../Home.module.css'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

const ActionsBlock = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const href = isAuthenticated ? '/game' : '/login'
  return (
    <div className={styles.actionsBlock}>
      <Link to={href}>
        <Button variant="primary">Начинайте играть</Button>
      </Link>
      {!isAuthenticated && (
        <Link to="/registration">
          <Button variant="outline">Создать аккаунт</Button>
        </Link>
      )}
    </div>
  )
}

export default ActionsBlock
