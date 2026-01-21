import { Button } from '@/components'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/common/Avatar/Avatar'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'
import { BASE_URL } from '@/api/config'
import styles from './Profile.module.css'

export default function Profile() {
  const { user } = useAppSelector(state => state.auth)

  if (!user) {
    return <div>Загрузка...</div>
  }

  const userInitials = (user.display_name || user.login)
    .slice(0, 2)
    .toUpperCase()
  const avatarSrc = user.avatar
    ? `${BASE_URL}${user.avatar}`
    : '/mock_avatar.svg'

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarSection}>
              <Avatar
                size={128}
                borderWidth={4}
                borderColor="#f59e0b"
                shadow={true}>
                <AvatarImage
                  src={avatarSrc}
                  alt={user.display_name || user.login}
                />
                <AvatarFallback fontSize={24}>{userInitials}</AvatarFallback>
              </Avatar>
              <Link to="/profile/edit">
                <Button variant="primary">Изменить аватар</Button>
              </Link>
            </div>

            <div className={styles.userInfo}>
              <h1 className={styles.username}>
                {user.display_name || user.login}
              </h1>
              <p className={styles.email}>{user.email}</p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>ID пользователя</span>
                  <span className={styles.infoValue}>{user.id}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Логин</span>
                  <span className={styles.infoValue}>{user.login}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Телефон</span>
                  <span className={styles.infoValue}>
                    {user.phone || 'Не указан'}
                  </span>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <Link to="/password/edit" style={{ flex: 1 }}>
                  <Button variant="outline" size="lg">
                    Изменить пароль
                  </Button>
                </Link>
                <Link to="/profile/edit" style={{ flex: 1 }}>
                  <Button variant="primary" size="lg">
                    Редактировать профиль
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statValue} ${styles.statValueYellow}`}>
              {user.id}
            </div>
            <p className={styles.statLabel}>ID пользователя</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statValue} ${styles.statValueBlue}`}>
              {user.first_name} {user.second_name}
            </div>
            <p className={styles.statLabel}>Полное имя</p>
          </div>
        </div>
      </div>
    </div>
  )
}
