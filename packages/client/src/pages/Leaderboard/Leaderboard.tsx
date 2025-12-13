import {
  Button,
  Input,
  Search,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Trophy,
} from '@/components'
import { useState, useMemo } from 'react'
import styles from './Leaderboard.module.css'
import { PAGE_TITLES } from '@/constants/pageTitles'

interface Player {
  username: string
  score: number
  gamesPlayed: number
}

interface RankedPlayer extends Player {
  rank: number
}

// Создаём 100 моковых игроков
const generateMockPlayers = (): Player[] => {
  const names = [
    'SkyFlyer',
    'WingMaster',
    'PipeMaster',
    'BirdBoss',
    'FlapKing',
    'AirAce',
    'SkyHero',
    'FlappyLord',
    'WindRider',
    'FeatheredPro',
    'CloudChasrName',
    'SoaringStar',
    'BirdBrain',
    'AltitudeLover',
    'VelocityVic',
    'JetStream',
    'SkyBlazer',
    'AerialAce',
    'FlappyDolphin',
    'CloudHunter',
  ]

  const players: Player[] = []
  for (let i = 1; i <= 100; i++) {
    const baseScore = Math.floor(Math.random() * 10000)
    players.push({
      username: `${names[Math.floor(Math.random() * names.length)]}${Math.floor(
        Math.random() * 999
      )}`,
      score: baseScore,
      gamesPlayed: Math.floor(50 + Math.random() * 450),
    })
  }

  return players
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }))
}

const statsConfig = [
  {
    emoji: '🔥',
    label: 'Лучший результат',
    getValue: () => players[0].score.toLocaleString(),
    valueColor: 'orange',
    getAuthor: () => `игрок ${players[0].username}`,
  },
  {
    emoji: '📊',
    label: 'Средний результат',
    getValue: () =>
      Math.floor(
        players.reduce((sum, p) => sum + p.score, 0) / players.length
      ).toLocaleString(),
    valueColor: 'yellow',
  },
  {
    emoji: '👥',
    label: 'Активных игроков',
    getValue: () => players.length.toLocaleString(),
    valueColor: 'orange',
  },
]

const players = generateMockPlayers() as RankedPlayer[]

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredPlayers = useMemo(() => {
    if (searchTerm) {
      return players.filter(p =>
        p.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return players
  }, [searchTerm])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Trophy />
          <h1>{PAGE_TITLES.LEADERBOARD}</h1>
        </div>
        <p className={styles.headerSubtitle}>
          Соревнуйтесь с {players.length} игроками со всего мира и займите место
          в топе
        </p>
      </div>

      <div className={styles.statsGrid}>
        {statsConfig.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statEmoji}>{stat.emoji}</div>
            <p className={styles.statLabel}>{stat.label}</p>
            <p
              className={`${styles.statValue} ${
                styles[
                  `statValue${
                    stat.valueColor.charAt(0).toUpperCase() +
                    stat.valueColor.slice(1)
                  }`
                ]
              }`}>
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
            {filteredPlayers.map(player => {
              return (
                <TableRow
                  key={player.username}
                  variant={player.rank <= 3 ? 'highlighted' : 'default'}>
                  <TableCell>
                    <span className={styles.rankNumber}>#{player.rank}</span>
                  </TableCell>
                  <TableCell>
                    <span className={styles.playerCell}>
                      <span className={styles.playerAvatar}>🐦</span>
                      {player.username}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span className={styles.scoreValue}>
                      {player.score.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell align="right" responsive="md">
                    {player.gamesPlayed}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filteredPlayers.length === 0 && (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>Игроки не найдены</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerStats}>
          Показано {filteredPlayers.length} из {players.length} игроков
        </p>
        <div className={styles.footerInfo}>
          <p className={styles.footerInfoTitle}>🎯 Как работает рейтинг</p>
          <p className={styles.footerInfoText}>
            Игроки ранжируются по их лучшему результату. Очки обновляются в
            реальном времени после завершения игры. Чем выше ваш результат, тем
            выше ваше место!
          </p>
        </div>
      </div>
    </div>
  )
}
