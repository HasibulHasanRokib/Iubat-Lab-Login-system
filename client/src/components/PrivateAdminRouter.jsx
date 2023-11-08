import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateAdminRouter = () => {

  const{admin}=useSelector((state)=>state.admin)
  
    return admin ? <Outlet/> : <Navigate to={"/admin-login"}/>
}

export default PrivateAdminRouter
