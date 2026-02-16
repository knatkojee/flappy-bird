import { TableCell, TableRow } from '@/components'
import styles from './Players.module.css'

type PlayersProps = {
  filteredPlayers: {
    __clientId: string
    data: {
      score: number
      id?: string | undefined
      name?: string | undefined
      userName?: string | undefined
      userId?: number | undefined
      username?: string | undefined
      user?: string | undefined
      avatar?: string | undefined
      login?: string | undefined
      nickname?: string | undefined
    }
  }[]
}

export const Players = ({ filteredPlayers }: PlayersProps) => {
  return (
    <>
      {filteredPlayers?.map((player, index) => {
        const user = player.data
        return (
          <TableRow
            key={player.__clientId}
            variant={user.score <= 3 ? 'highlighted' : 'default'}>
            <TableCell>
              <span className={styles.rankNumber}>#{index + 1}</span>
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
    </>
  )
}
