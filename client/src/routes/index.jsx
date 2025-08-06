import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Auth from "../pages/auth.page";
import { useWallet } from "../provider/key.provider";
import Landing from "../pages/landing.page";

const Routes = () =>{

    const publicKey = useWallet()

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element : <ProtectedRoute/>,
            children : [
                {
                    path : '/',
                    element : <h1>Home Dashboard</h1>
                }, // as soon as components ban jayenge I'll replace them , ye sirf temp hai
           ]
        }
    ]

    const routesForNotAuthenticatedOnly = [
        {
            path : '/',
            element : <Landing/>
        },
        {
            path : '/auth',
            element : <Auth/>
        } 
    ]

    const router = createBrowserRouter([
        ...(publicKey ? routesForAuthenticatedOnly : []),
        ...routesForNotAuthenticatedOnly
    ])

    return <RouterProvider router={router}/>
}

export default Routes