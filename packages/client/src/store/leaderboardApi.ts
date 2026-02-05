import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type AddUserData = {
  data: {
    name: string
    secondName: string
    displayName: string
    score: number
  }
  ratingFieldName: string
}

type GetAllUsersData = {
  ratingFieldName: string
  cursor: number
  limit: number
}

type GetAllUsersResponse = {
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

export const LeaderBoardApi = createApi({
  reducerPath: 'leaderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2',
    credentials: 'include',
  }),

  endpoints: builder => ({
    addUser: builder.mutation<void, AddUserData>({
      query: body => ({
        url: '/leaderboard',
        method: 'POST',
        body,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log('error: ', error)
        }
      },
    }),

    getAllUsers: builder.query<GetAllUsersResponse, GetAllUsersData>({
      query: body => ({
        url: '/leaderboard/all',
        method: 'POST',
        body,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.log('error: ', error)
        }
      },
    }),
  }),
})

export const { useAddUserMutation, useGetAllUsersQuery } = LeaderBoardApi
