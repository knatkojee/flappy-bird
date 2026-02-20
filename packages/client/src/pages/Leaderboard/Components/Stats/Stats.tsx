import classNames from 'classnames'
import { useGetAllUsersQuery } from '@shared/store/leaderboardApi'
import styles from './Stats.module.css'

export const Stats = () => {
  const { data: playersData } = useGetAllUsersQuery({
    ratingFieldName: 'score',
    cursor: 1,
    limit: 50,
  })

  const statsConfig = playersData
    ? [
        {
          emoji: '🔥',
          label: 'Лучший результат',
          getValue: () => playersData[0].data.score,
          valueColor: 'orange',
          getAuthor: () => `игрок ${playersData[0].data.userName}`,
        },
        {
          emoji: '📊',
          label: 'Средний результат',
          getValue: () =>
            Math.floor(
              playersData.reduce((sum, p) => sum + p.data.score, 0) /
                playersData.length
            ).toLocaleString(),
          valueColor: 'yellow',
        },
        {
          emoji: '👥',
          label: 'Активных игроков',
          getValue: () => playersData.length.toLocaleString(),
          valueColor: 'orange',
        },
      ]
    : []

  return (
    <div className={styles.statsGrid}>
      {statsConfig.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div className={styles.statEmoji}>{stat.emoji}</div>
          <p className={styles.statLabel}>{stat.label}</p>
          <p
            className={classNames(
              styles.statValue,
              styles[
                `statValue${
                  stat.valueColor.charAt(0).toUpperCase() +
                  stat.valueColor.slice(1)
                }`
              ]
            )}>
            {stat.getValue()}
          </p>
          {stat.getAuthor && (
            <p className={styles.statAuthor}>{stat.getAuthor()}</p>
          )}
        </div>
      ))}
    </div>
  )
}
