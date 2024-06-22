import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserSlice } from "../slice/userSlice";
import { SideBarSlice } from "../slice/Sidebar.slice";
export const store =configureStore(
    {
        reducer:{
            [UserSlice.name]:UserSlice.reducer,
            [SideBarSlice.name]:SideBarSlice.reducer
        },
        middleware:(d)=>d().concat()
    }
)

setupListeners(store.dispatch)