import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/Login";
import PrivateRouter from "./components/PrivateRouter";


export const URL = 'http://localhost:3000';

const App = () => {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouter/>}>
        <Route path="/" element={<Home/>}/>
        </Route>
        <Route path="/sign-in" element={<Login/>}/>
      </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
