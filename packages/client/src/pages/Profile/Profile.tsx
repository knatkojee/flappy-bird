import { Button } from '@/components'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/common/Avatar/Avatar'
import { Link } from 'react-router-dom'
import styles from './Profile.module.css'

export default function Profile() {
  const user = {
    username: 'CloudChaser',
    email: 'cloudchaser@example.com',
    joinDate: '15 декабря 2025',
    highScore: 8524,
    gamesPlayed: 42,
    winRate: 78.5,
  }

  const userInitials = user.username.slice(0, 2).toUpperCase()

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
                <AvatarImage src="/mock_avatar.svg" alt={user.username} />
                <AvatarFallback fontSize={24}>{userInitials}</AvatarFallback>
              </Avatar>
              <Link to="/profile/edit">
                <Button variant="primary">Изменить аватар</Button>
              </Link>
            </div>

            <div className={styles.userInfo}>
              <h1 className={styles.username}>{user.username}</h1>
              <p className={styles.email}>{user.email}</p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Участник с</span>
                  <span className={styles.infoValue}>{user.joinDate}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Лучший результат</span>
                  <span className={styles.infoValueHighlight}>
                    {user.highScore}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Игр сыграно</span>
                  <span className={styles.infoValue}>{user.gamesPlayed}</span>
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
              {user.highScore}
            </div>
            <p className={styles.statLabel}>Лучший результат</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statValue} ${styles.statValueBlue}`}>
              {user.gamesPlayed}
            </div>
            <p className={styles.statLabel}>Игр сыграно</p>
          </div>
        </div>
      </div>
    </div>
  )
}
