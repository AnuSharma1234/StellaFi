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
        <div className="flex h-screen w-full bg-gradient-to-br from-twitter-background via-twitter-darker to-twitter-surface text-twitter-white overflow-hidden">
            {/* Animated background overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-twitter-blue/3 via-transparent to-purple-500/3 animate-pulse-gentle pointer-events-none"></div>
            
            {/* Floating orbs for visual appeal */}
            <div className="fixed top-20 left-20 w-64 h-64 bg-twitter-blue/5 rounded-full blur-3xl animate-pulse-gentle pointer-events-none"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-gentle pointer-events-none" style={{animationDelay: '1s'}}></div>
            
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
