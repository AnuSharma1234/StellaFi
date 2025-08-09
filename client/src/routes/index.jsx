import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Auth from "../pages/auth.page";
import { useWallet } from "../provider/key.provider";
import Landing from "../pages/landing.page";
import Profile from "../pages/profile.page";

const Routes = () => {
    const { publicKey } = useWallet()

    const router = createBrowserRouter([
        {
            path: '/auth',
            element: <Auth/>
        },
        {
            path : '/auth/profile',
            element : <Profile/>
        },
        {
            path: '/',
            element: publicKey ? (
                <ProtectedRoute/>
            ) : (
                <Landing/>
            ),
            children: publicKey ? [
                {
                    path: '/',
                    element: <h1>Home Dashboard</h1>
                }
            ] : []
        }
    ])

    return <RouterProvider router={router}/>
}

export default Routes