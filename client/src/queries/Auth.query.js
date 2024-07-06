import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthQuery = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
      registerUser: builder.mutation({
        query: (obj) =>( {
            url:'/api/register',
            method:'POST',
            body:obj

        })
      }),
      loginUser:builder.mutation({
        query:(obj)=>({
          url:'/api/login',
          method:'POST',
          body:obj
        })
      })
    }),
  })



export const {useRegisterUserMutation,useLoginUserMutation}=AuthQuery