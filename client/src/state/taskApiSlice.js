import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const taskApiSlice = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            console.log(token)
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({ url: "tasks" }),
            transformResponse: (response) => response,
        }),
        getTask: build.query({
            query: (id) => ({ url: `tasks/${id}` }),
            transformResponse: (response) => response.data,
        }),
        getTasksWithLimit: build.query({
            query: ({ skip, limit }) => ({ url: `tasks?$skip=${skip}&$limit=${limit}` }),
            transformResponse: (response) => response,
        }),
        getTaskLists: build.query({
            query: () => ({ url: `tasklists` }),
            transformResponse: (response) => response,
        }),
        getTaskList: build.query({
            query: (id) => ({ url: `tasklists/${id}` }),
            transformResponse: (response) => response.data,
        }),
        getTaskListsWithLimit: build.query({
            query: ({ skip, limit }) => ({ url: `tasklists?$skip=${skip}&$limit=${limit}` }),
            transformResponse: (response) => response,
        }),
        updateList: build.mutation({
            query: (body) => {
                return {
                    url: `tasklists/${body.id}`,
                    method: 'PATCH',
                    body
                }
            }
        }),
        createList: build.mutation({
            query: (body) => {
                return {
                    url: `tasklists`,
                    method: 'POST',
                    body
                }
            }
        }),
    }),
});

export const { useLazyGetTasksQuery, useGetTasksQuery,
    useLazyGetTaskQuery, useGetTaskQuery,
    useLazyGetTasksWithLimitQuery, useGetTasksWithLimitQuery,
    useLazyGetTaskListsQuery, useGetTaskListsQuery,
    useLazyGetTaskListQuery, useGetTaskListQuery,
    useLazyGetTaskListsWithLimitQuery, useGetTaskListsWithLimitQuery,
    useUpdateListMutation,
    useCreateListMutation
} = taskApiSlice;

export default taskApiSlice;