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
    PROFILE_EDIT: '/profile/edit',
    PASSWORD_EDIT: '/password/edit',
    LEADERBOARD: '/leaderboard',
    GAME: '/game',
  },

  ERRORS: {
    NOT_FOUND: '/404',
    SERVER_ERROR: '/500',
  },
}
