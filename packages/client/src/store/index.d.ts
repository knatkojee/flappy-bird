export declare const store: import('@reduxjs/toolkit/dist/configureStore').ToolkitStore<
  {
    auth: import('immer/dist/internal').WritableDraft<{
      user: any
      isLoading: boolean
      isAuthenticated: boolean
    }>
    leaderApi: import('@reduxjs/toolkit/query').CombinedState<
      {
        addUser: import('@reduxjs/toolkit/query').MutationDefinition<
          {
            data: {
              name: string
              secondName: string
              displayName: string
              score: number
            }
            ratingFieldName: string
          },
          import('@reduxjs/toolkit/query').BaseQueryFn<
            string | import('@reduxjs/toolkit/query').FetchArgs,
            unknown,
            import('@reduxjs/toolkit/query').FetchBaseQueryError,
            {},
            import('@reduxjs/toolkit/query').FetchBaseQueryMeta
          >,
          never,
          void,
          'leaderApi'
        >
        getAllUsers: import('@reduxjs/toolkit/query').QueryDefinition<
          {
            ratingFieldName: string
            cursor: number
            limit: number
          },
          import('@reduxjs/toolkit/query').BaseQueryFn<
            string | import('@reduxjs/toolkit/query').FetchArgs,
            unknown,
            import('@reduxjs/toolkit/query').FetchBaseQueryError,
            {},
            import('@reduxjs/toolkit/query').FetchBaseQueryMeta
          >,
          never,
          {
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
          }[],
          'leaderApi'
        >
      },
      never,
      'leaderApi'
    >
  },
  import('redux').AnyAction,
  import('@reduxjs/toolkit').MiddlewareArray<
    [
      import('@reduxjs/toolkit').ThunkMiddleware<
        {
          auth: import('immer/dist/internal').WritableDraft<{
            user: any
            isLoading: boolean
            isAuthenticated: boolean
          }>
          leaderApi: import('@reduxjs/toolkit/query').CombinedState<
            {
              addUser: import('@reduxjs/toolkit/query').MutationDefinition<
                {
                  data: {
                    name: string
                    secondName: string
                    displayName: string
                    score: number
                  }
                  ratingFieldName: string
                },
                import('@reduxjs/toolkit/query').BaseQueryFn<
                  string | import('@reduxjs/toolkit/query').FetchArgs,
                  unknown,
                  import('@reduxjs/toolkit/query').FetchBaseQueryError,
                  {},
                  import('@reduxjs/toolkit/query').FetchBaseQueryMeta
                >,
                never,
                void,
                'leaderApi'
              >
              getAllUsers: import('@reduxjs/toolkit/query').QueryDefinition<
                {
                  ratingFieldName: string
                  cursor: number
                  limit: number
                },
                import('@reduxjs/toolkit/query').BaseQueryFn<
                  string | import('@reduxjs/toolkit/query').FetchArgs,
                  unknown,
                  import('@reduxjs/toolkit/query').FetchBaseQueryError,
                  {},
                  import('@reduxjs/toolkit/query').FetchBaseQueryMeta
                >,
                never,
                {
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
                }[],
                'leaderApi'
              >
            },
            never,
            'leaderApi'
          >
        },
        import('redux').AnyAction,
        undefined
      >,
      import('redux').Middleware<
        {},
        import('@reduxjs/toolkit/query').RootState<
          {
            addUser: import('@reduxjs/toolkit/query').MutationDefinition<
              {
                data: {
                  name: string
                  secondName: string
                  displayName: string
                  score: number
                }
                ratingFieldName: string
              },
              import('@reduxjs/toolkit/query').BaseQueryFn<
                string | import('@reduxjs/toolkit/query').FetchArgs,
                unknown,
                import('@reduxjs/toolkit/query').FetchBaseQueryError,
                {},
                import('@reduxjs/toolkit/query').FetchBaseQueryMeta
              >,
              never,
              void,
              'leaderApi'
            >
            getAllUsers: import('@reduxjs/toolkit/query').QueryDefinition<
              {
                ratingFieldName: string
                cursor: number
                limit: number
              },
              import('@reduxjs/toolkit/query').BaseQueryFn<
                string | import('@reduxjs/toolkit/query').FetchArgs,
                unknown,
                import('@reduxjs/toolkit/query').FetchBaseQueryError,
                {},
                import('@reduxjs/toolkit/query').FetchBaseQueryMeta
              >,
              never,
              {
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
              }[],
              'leaderApi'
            >
          },
          string,
          'leaderApi'
        >,
        import('@reduxjs/toolkit').ThunkDispatch<
          any,
          any,
          import('redux').AnyAction
        >
      >
    ]
  >
>
export declare type RootState = ReturnType<typeof store.getState>
export declare type AppDispatch = typeof store.dispatch
