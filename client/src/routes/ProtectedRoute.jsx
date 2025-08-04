import { Navigate, Outlet } from 'react-router-dom'
import { useWallet } from '../provider/key.provider'

export const ProtectedRoute = () => {
    const publicKey = useWallet();
    
    // Add console.log for debugging
    console.log("Protected Route Check:", { publicKey })
    
    return publicKey ? <Outlet/> : <Navigate to="/auth" replace />
}
