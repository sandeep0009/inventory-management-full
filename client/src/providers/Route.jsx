import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Login from "../pages/Login"
import Register from "../pages/Register"
import HomePage from "../pages/Home";
export const Router=createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            {
                path:'/home',
                Component:HomePage
            }
        ]
    },
    {
        path:'/login',
        Component:Login
    },
    {
        path:'/register',
        Component:Register
    }
])