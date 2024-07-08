import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from '../utils/backendUrl'

export const AuthQuery = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
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