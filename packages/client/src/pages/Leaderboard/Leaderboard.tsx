import classNames from 'classnames'
import {
  Input,
  LoadingSpinner,
  Search,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Trophy,
} from '@/components'
import { useState, useMemo, useRef } from 'react'
import styles from './Leaderboard.module.css'
import { PAGE_TITLES } from '@/constants/pageTitles'
import { useGetAllUsersQuery } from '@/store/leaderboardApi'

export default function Leaderboard() {
  const { data: playersData, isFetching } = useGetAllUsersQuery({
    ratingFieldName: 'score',
    cursor: 1,
    limit: 50,
  })

  const idRef = useRef(0)

  const playersWithId = useMemo(() => {
    if (!playersData) return []

    return playersData.map(player => ({
      ...player,
      __clientId: `player-${idRef.current++}`,
    }))
  }, [playersData])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredPlayers = useMemo(() => {
    const term = searchTerm.toLowerCase()

    if (searchTerm && playersData) {
      return playersWithId.filter(({ data }) =>
        [
          data.userName,
          data.name,
          data.login,
          data.nickname,
          data.username,
        ].some(field => field?.toLowerCase().includes(term))
      )
    }

    return playersWithId
  }, [searchTerm, playersWithId])

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
    <>
      <div className={styles.container}>
        {isFetching && <LoadingSpinner />}
        {playersData && !isFetching && (
          <>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Trophy />
                <h1>{PAGE_TITLES.LEADERBOARD}</h1>
              </div>
              <p className={styles.headerSubtitle}>
                Соревнуйтесь с {playersData?.length} игроками со всего мира и
                займите место в топе
              </p>
            </div>

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

            <div className={styles.filterSection}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <Input
                  placeholder="Поиск игрока..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  withIcon
                  size="sm"
                />
              </div>
            </div>

            <div className={styles.tableContainer}>
              <Table>
                <TableHeader variant="gradient">
                  <TableRow variant="header">
                    <TableHead>Место</TableHead>
                    <TableHead>Игрок</TableHead>
                    <TableHead align="right">Очки</TableHead>
                    <TableHead align="right" responsive="md">
                      Игр
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers?.map((player, index) => {
                    const user = player.data
                    return (
                      <TableRow
                        key={player.__clientId}
                        variant={user.score <= 3 ? 'highlighted' : 'default'}>
                        <TableCell>
                          <span className={styles.rankNumber}>
                            #{index + 1}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={styles.playerCell}>
                            <span className={styles.playerAvatar}>
                              {user.avatar ? (
                                <img
                                  src={`https://ya-praktikum.tech/api/v2/resources${user.avatar}`}
                                  alt="Аватар игрока"
                                />
                              ) : (
                                '🐦'
                              )}
                            </span>
                            {user.userName ||
                              user.name ||
                              user.username ||
                              user.user ||
                              user.login ||
                              user.nickname}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span className={styles.scoreValue}>
                            {user.score.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell align="right" responsive="md">
                          {user.score}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {filteredPlayers?.length === 0 && (
                <div className={styles.noResults}>
                  <p className={styles.noResultsText}>Игроки не найдены</p>
                </div>
              )}
            </div>

            <div className={styles.footer}>
              <p className={styles.footerStats}>
                Показано {filteredPlayers?.length} из {playersData.length}{' '}
                игроков
              </p>
              <div className={styles.footerInfo}>
                <p className={styles.footerInfoTitle}>
                  🎯 Как работает рейтинг
                </p>
                <p className={styles.footerInfoText}>
                  Игроки ранжируются по их лучшему результату. Очки обновляются
                  в реальном времени после завершения игры. Чем выше ваш
                  результат, тем выше ваше место!
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
