import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/Login";
import PrivateRouter from "./components/PrivateRouter";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Error from "./pages/Error";
import PrivateAdminRouter from "./components/PrivateAdminRouter";
import StudentUpdate from "./pages/StudentUpdate";


export const URL = 'https://iubbat-lab-login.onrender.com';

const App = () => {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouter/>}>
        <Route path="/" element={<Home/>}/>
        </Route>
        
        <Route element={<PrivateAdminRouter/>}>
        <Route path="/admin-panel" element={<AdminPanel/>}/>
        <Route path="/student/:id" element={<StudentUpdate/>}/>
        </Route>

        <Route path="/sign-in" element={<Login/>}/>
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="*" element={<Error/>}/>

      </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
