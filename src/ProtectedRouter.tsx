import { useAuth } from "./context/AuthContext"
import { Navigate,Outlet } from "react-router-dom"



export const ProtectedRouter = () => {
    const { user, isAutheticaded,loading } = useAuth()
    
    
    if (!loading && !isAutheticaded) return <Navigate to='/login' replace />;




    return (
        <Outlet/>
    )
}

