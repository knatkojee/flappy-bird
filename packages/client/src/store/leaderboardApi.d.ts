declare type AddUserData = {
  data: {
    name: string
    secondName: string
    displayName: string
    score: number
  }
  ratingFieldName: string
}
declare type GetAllUsersData = {
  ratingFieldName: string
  cursor: number
  limit: number
}
declare type GetAllUsersResponse = {
  data: {
    score: number
    id?: string
    name?: string
    userName?: string
    userId?: number
    username?: string
    user?: string
    avatar?: string
    login?: string
    nickname?: string
  }
}[]
export declare const LeaderBoardApi: import('@reduxjs/toolkit/query/react').Api<
  import('@reduxjs/toolkit/query/react').BaseQueryFn<
    string | import('@reduxjs/toolkit/query/react').FetchArgs,
    unknown,
    import('@reduxjs/toolkit/query/react').FetchBaseQueryError,
    {},
    import('@reduxjs/toolkit/query/react').FetchBaseQueryMeta
  >,
  {
    addUser: import('@reduxjs/toolkit/query/react').MutationDefinition<
      AddUserData,
      import('@reduxjs/toolkit/query/react').BaseQueryFn<
        string | import('@reduxjs/toolkit/query/react').FetchArgs,
        unknown,
        import('@reduxjs/toolkit/query/react').FetchBaseQueryError,
        {},
        import('@reduxjs/toolkit/query/react').FetchBaseQueryMeta
      >,
      never,
      void,
      'leaderApi'
    >
    getAllUsers: import('@reduxjs/toolkit/query/react').QueryDefinition<
      GetAllUsersData,
      import('@reduxjs/toolkit/query/react').BaseQueryFn<
        string | import('@reduxjs/toolkit/query/react').FetchArgs,
        unknown,
        import('@reduxjs/toolkit/query/react').FetchBaseQueryError,
        {},
        import('@reduxjs/toolkit/query/react').FetchBaseQueryMeta
      >,
      never,
      GetAllUsersResponse,
      'leaderApi'
    >
  },
  'leaderApi',
  never,
  | typeof import('@reduxjs/toolkit/query/react').coreModuleName
  | typeof import('@reduxjs/toolkit/query/react').reactHooksModuleName
>
export declare const useAddUserMutation: import('@reduxjs/toolkit/dist/query/react/buildHooks').UseMutation<
    import('@reduxjs/toolkit/query/react').MutationDefinition<
      AddUserData,
      import('@reduxjs/toolkit/query/react').BaseQueryFn<
        string | import('@reduxjs/toolkit/query/react').FetchArgs,
        unknown,
        import('@reduxjs/toolkit/query/react').FetchBaseQueryError,
        {},
        import('@reduxjs/toolkit/query/react').FetchBaseQueryMeta
      >,
      never,
      void,
      'leaderApi'
    >
  >,
  useGetAllUsersQuery: import('@reduxjs/toolkit/dist/query/react/buildHooks').UseQuery<
    import('@reduxjs/toolkit/query/react').QueryDefinition<
      GetAllUsersData,
      import('@reduxjs/toolkit/query/react').BaseQueryFn<
        string | import('@reduxjs/toolkit/query/react').FetchArgs,
        unknown,
        import('@reduxjs/toolkit/query/react').FetchBaseQueryError,
        {},
        import('@reduxjs/toolkit/query/react').FetchBaseQueryMeta
      >,
      never,
      GetAllUsersResponse,
      'leaderApi'
    >
  >
export {}
