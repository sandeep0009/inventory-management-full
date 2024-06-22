import { createSlice } from "@reduxjs/toolkit";

export const SideBarSlice = createSlice({
    name: "sidebar",
    initialState: {
        sideBarToggle: false,
        collapsed: false,
    },
    reducers: {
        setToggle(state,action) {
            state.sideBarToggle = !state.sideBarToggle;
        },
        collapseSideBar(state,action){
            state.collapsed = !state.collapsed        }
    }
});

export const { setToggle ,collapseSideBar} = SideBarSlice.actions;

export const selectSideBarToggle = (state) => state.sidebar;


