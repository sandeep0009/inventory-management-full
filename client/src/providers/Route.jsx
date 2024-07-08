import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Login from "../pages/Login"
import Register from "../pages/Register"
import HomePage from "../pages/Home";
import Inovoice from "../pages/Invoice/Inovoice";
import Orders from "../pages/Orders/Orders";
import User from "../pages/user/User";

export const Router = createBrowserRouter([
    {
        path: '/login',   
        Component: Login
    },
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/',
                Component: HomePage
            },
            {
                path: '/invoice',
                Component: Inovoice
            },
            {
                path: '/orders',
                Component: Orders
            },
            {
                path: '/user',
                Component: User
            }
        ]
    },
    {
        path: '/register',
        Component: Register
    }
]);
