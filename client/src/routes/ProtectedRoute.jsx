import { Navigate, Outlet } from 'react-router-dom'
import { useWallet } from '../provider/key.provider'

export const ProtectedRoute = () => {
    const { publicKey } = useWallet();
    
    if (!publicKey) {
        return <Navigate to="/auth" replace />
    }
    
    return <Outlet />
}
