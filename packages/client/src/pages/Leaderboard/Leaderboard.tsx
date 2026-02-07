import {
  Input,
  LoadingSpinner,
  Search,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Trophy,
} from '@/components'
import { useState, useMemo, useRef } from 'react'
import styles from './Leaderboard.module.css'
import { PAGE_TITLES } from '@/constants/pageTitles'
import { useGetAllUsersQuery } from '@/store/leaderboardApi'
import { Stats } from './Components/Stats/Stats'
import { Players } from './Components/Players/Players'

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

            <Stats />

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
                  <Players filteredPlayers={filteredPlayers} />
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
