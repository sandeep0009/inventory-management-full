import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserSlice } from "../slice/userSlice";
import { SideBarSlice } from "../slice/Sidebar.slice";
import { AuthQuery } from "../queries/Auth.query";
import { ConsumerQuery } from "../queries/Consumer.query";
import { OrderQuery } from "../queries/Order.query";
export const store =configureStore(
    {
        reducer:{
            [UserSlice.name]:UserSlice.reducer,
            [SideBarSlice.name]:SideBarSlice.reducer,
            [AuthQuery.reducerPath]:AuthQuery.reducer,
            [ConsumerQuery.reducerPath]:ConsumerQuery.reducer,
            [OrderQuery.reducerPath]:OrderQuery.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(AuthQuery.middleware, ConsumerQuery.middleware,OrderQuery.middleware),
        });
        
        setupListeners(store.dispatch);
        