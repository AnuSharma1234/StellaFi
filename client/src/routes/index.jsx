import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Auth from "../pages/auth.page";
import { useWallet } from "../provider/key.provider";
import Landing from "../pages/landing.page";

// --- Import all your pages that need to be protected ---
import Discover from "../pages/Discover";
import DEX from "../pages/DEX";
import Notifications from "../pages/Notifications";
import Wallet from "../pages/Wallet";

const Routes = () => {
    const { publicKey } = useWallet()

    const router = createBrowserRouter([
        {
            path: '/auth',
            element: <Auth/>
        },
        {
            // This is the parent route for all protected pages
            path: '/',
            // It renders the ProtectedRoute layout if logged in, otherwise the Landing page
            element: publicKey ? (
                <ProtectedRoute/>
            ) : (
                <Landing/>
            ),
            // These are the children that will be rendered inside the <Outlet /> of ProtectedRoute
            children: publicKey ? [
                {
                    // Default route for '/' renders the Discover page
                    path: '/',
                    element: <Discover />
                },
                {
                    path: '/discover',
                    element: <Discover />
                },
                {
                    path: '/dex',
                    element: <DEX />
                },
                {
                    path: '/wallet',
                    element: <Wallet />
                },
                {
                    path: '/notifications',
                    element: <Notifications />
                },
            ] : []
        }
    ])

    return <RouterProvider router={router}/>
}

export default Routes;
