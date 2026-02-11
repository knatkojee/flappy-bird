import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
export const LeaderBoardApi = createApi({
    reducerPath: 'leaderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ya-praktikum.tech/api/v2',
        credentials: 'include',
    }),
    endpoints: builder => ({
        addUser: builder.mutation({
            query: body => ({
                url: '/leaderboard',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                }
                catch (error) {
                    console.log('error: ', error);
                    toast.error('Ошибка при отправки рейтинга');
                }
            },
        }),
        getAllUsers: builder.query({
            query: body => ({
                url: '/leaderboard/all',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                }
                catch (error) {
                    console.log('error: ', error);
                    toast.error('Ошибка при получении рейтинга игроков');
                }
            },
        }),
    }),
});
export const { useAddUserMutation, useGetAllUsersQuery } = LeaderBoardApi;
