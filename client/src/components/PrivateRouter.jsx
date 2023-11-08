import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {

  const{instructor}=useSelector((state)=>state.instructor)

    return instructor ? <Outlet/> : <Navigate to={"/sign-in"}/>
  
}

export default PrivateRouter
