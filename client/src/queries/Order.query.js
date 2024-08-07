import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from '../utils/backendUrl'

export const OrderQuery = createApi({
    reducerPath: 'OrderQuery',
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL}),
    endpoints: (builder) => ({
      addOrder: builder.mutation({
        query: (obj) =>( {
            url:'/api/create-order',
            method:'POST',
            body:obj,
            headers:{
              'Authorization': 'Bearer ' + localStorage.getItem("token")
          }

        })
      }),
      deleteOrder:builder.mutation({
        query:(_id)=>({
          url:'/api/delete-order/'+_id,
          method:'DELETE',
      
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),
      }),
      getAllOrder:builder.query({
        query:(obj)=>({
          url:`/api/get-all-order?query=${obj.query}&page=${obj.page}`,
          method:'GET',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),

      }),

      getInvoiceOrder:builder.query({
        query:(_id)=>({
          url:`/api/get-order-invoice/`+_id,
          method:'GET',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }),

      }),

     

  
    }),
  })



export const {useAddOrderMutation,useDeleteOrderMutation,useGetAllOrderQuery,useGetInvoiceOrderQuery}=OrderQuery