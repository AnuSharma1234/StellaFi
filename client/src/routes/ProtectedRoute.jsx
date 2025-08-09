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
        <div className="flex h-screen w-full bg-twitter-background text-twitter-white">
            <div className="fixed inset-0 bg-gradient-to-br from-twitter-background via-twitter-darker to-twitter-surface opacity-30 animate-pulse-gentle pointer-events-none"></div>
            
            <div className="relative z-10 flex w-full">
                {/* Sidebar - Hidden on mobile, shown on larger screens */}
                <div className="hidden lg:block">
                    <LeftSidebar />
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex flex-1 overflow-hidden">
                        <main className="flex-1 overflow-y-auto">
                            <div className="animate-fade-in">
                                <Outlet />
                            </div>
                        </main>

                        {/* Right Sidebar - Only show on larger screens and specific routes */}
                        {showRightSidebar && (
                            <div className="hidden xl:block">
                                <RightSidebar />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
