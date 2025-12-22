export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',
  },
  PROTECTED: {
    FORUM: '/forum',
    FORUM_TOPIC: '/forum/:topicSlug',
    PROFILE: '/profile',
    LEADERBOARD: '/leaderboard',
    GAME: '/game',
  },

  ERRORS: {
    NOT_FOUND: '/404',
    SERVER_ERROR: '/500',
  },
}
