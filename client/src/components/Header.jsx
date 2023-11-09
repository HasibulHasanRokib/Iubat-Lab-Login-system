import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/studentContext";
import { URL } from '../App'
import { useDispatch } from "react-redux";
import { SIGNOUT_SUCCESS } from "../features/instructorSlice";
import Spinner from "./spinner";

const Header = () => {

  const { studentData } = useContext(StudentContext)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch(`${URL}/api/instructor/sign-out`, {     
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {password} ),
        credentials: "include"
      })

      const data = await res.json()
      if (data.success === true) {
        dispatch(SIGNOUT_SUCCESS())
        setLoading(false)
      } else {
        setLoading(false)
        setError(data.message)
      }

    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const current = new Date();
  const time = currentTime.toLocaleTimeString("en-US");
  const date = current.toDateString()

  return (
    <header className='flex justify-between max-md:gap-4 border-2 p-3 bg-white'>
      <div className="flex flex-col max-w-[12rem] justify-start items-start gap-1">
        <h2 className='text-xs'>Computer Lab 1 (CSE Practice Lab) (Only for CSE Department)</h2>
        <p className='text-xs'>Seat :{studentData && studentData.length || 0}/70</p>
        {show === true ? (
          <>
            <form className="flex" onSubmit={handleLogout}>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="border outline-slate-300 px-2 max-md:w-24" placeholder="Enter password" />
              <button disabled={loading} type="submit" className="bg-gray-700 text-white text-sm px-3 py-1">{loading ? <Spinner /> : "Logout"}</button>
            </form>
            {error && <p className="text-xs text-red-500 py-1">{error}</p>}
          </>
        ) : (
          <button type="button" onClick={() => setShow(true)} className='text-xs text-blue-600 hover:underline'>System logout</button>
        )}

      </div>
      <h1 className='max-md:hidden font-semibold text-3xl max-md:text-lg uppercase'>Ict Center</h1>
      <div className="">
        <p className='font-semibold text-xl'>{date}</p>
        <p className='text-xs'>{time}</p>
      </div>
    </header>
  )
}

export default Header
