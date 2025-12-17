export type Player = {
  username: string
  score: number
  gamesPlayed: number
}

export type RankedPlayer = Player & {
  rank: number
}

export type NotificationType = {
  type: 'success' | 'error'
  message: string
}
