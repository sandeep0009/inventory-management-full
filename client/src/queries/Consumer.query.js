import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ConsumerQuery = createApi({
    reducerPath: 'ConsumerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['getAllConsumers'],
    endpoints: (builder) => ({
      registerConsumer: builder.mutation({
        query: (obj) =>( {
            url:'/api/consumer',
            method:'POST',
            body:obj,
            headers:{
              'Authorization': 'Bearer ' + localStorage.getItem("token")
          }

        })
      }),
      deleteConsumer:builder.mutation({
        query:(_id)=>({
          url:'/api/delete-consumer/'+_id,
          method:'DELETE',
      
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),
        invalidatesTags:['getAllConsumers']
      }),
      getAllConsumers:builder.query({
        query:(obj)=>({
          url:`/api/get-all-consumers?query=${obj.query}&page=${obj.page}`,
          method:'GET',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),
        providesTags:['getAllConsumers']

      }),
    
      getAllSearchConsumer:builder.query({
        query:(obj)=>({
          url:`/api/get-search-user`,
          method:'GET',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),

      }),
      getConsumerById:builder.query({
        query:(_id)=>({
          url:'/api/get-consumer-byId/'+_id,
          method:'GET',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),
       
      }),
      
      updateConsumerById:builder.mutation({
        query:(obj,_id)=>({
          url:'/api/update-consumer/'+_id,
          method:'PATCH',
          body:obj,
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),      
      }),
      
      getConsumerDashboard:builder.query({
        query:()=>({
          url:`/api/`,
          method:'GET',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),

      }),
    
      
    }),
  })



export const {useRegisterConsumerMutation,useDeleteConsumerMutation,
  useGetAllConsumersQuery,useUpdateConsumerByIdMutation,
  useGetConsumerByIdQuery,useGetAllSearchConsumerQuery,
useGetConsumerDashboardQuery}=ConsumerQuery