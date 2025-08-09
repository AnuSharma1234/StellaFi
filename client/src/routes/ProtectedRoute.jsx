import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useWallet } from '../provider/key.provider'
import LeftSidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'  

export const ProtectedRoute = () => {
    const { publicKey } = useWallet();
    const location = useLocation();
    
    const showRightSidebar = location.pathname === '/' || location.pathname === '/discover';
    
    if (!publicKey) {
        return <Navigate to="/auth" replace />
    }
    
    return (
        <div className="flex h-screen w-full overflow-y-hidden bg-twitter-background text-twitter-white overflow-hidden">
            <div className="fixed inset-0 bg-gradient-to-br from-twitter-background via-twitter-darker to-twitter-surface opacity-50 animate-pulse pointer-events-none"></div>
            
            <div className="relative z-10 flex w-full">
                <LeftSidebar />

                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex flex-1 overflow-hidden">
                        <main className="flex-1 overflow-y-auto">
                            <div className="animate-fade-in">
                                <Outlet />
                            </div>
                        </main>

                        {showRightSidebar && <RightSidebar />}
                    </div>
                </div>
            </div>
        </div>
    )
}
