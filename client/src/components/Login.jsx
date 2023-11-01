import React, { useState } from 'react'
import { URL } from '../App'
import Spinner from './spinner'
const Login = () => {

    const[studentid,setStudentid]=useState()
    const[password,setPassword]=useState()
    const [message,setMessage]=useState(false)
    const [loading,setLoading]=useState(false)

    const current = new Date();
    const time = current.toLocaleTimeString("en-US");
    const date=current.toDateString()

    const handleLogin=async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const res=await fetch(`${URL}/api/student/sign-in`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({studentid,password})
            })
            const data=await res.json()
            if(data.success===false){
                setLoading(false)
                setMessage(data.message)
            }
            setLoading(false)
            setMessage(data.message)
            
        } catch (error) {
            setLoading(false)
            setMessage(error.message)
        }

    }

  return (
    <>
     <main className='w-4/6 min-h-screen right-0 absolute p-3'>
     <header className='flex justify-between border-2 p-3'>
     <div className="">
        <h2 className='text-xs'>Computer Lab 1 (CSE Practice Lab) (Only for CSE Department)</h2>
        <p className='text-xs'>Seat : 48/70</p>
        <button className='text-xs text-blue-600 hover:underline'>System logout</button>
       </div>
       <h1 className='font-semibold text-3xl'>ICT Center</h1>
       <div className="">
       <p className='font-semibold text-2xl'>{date}</p>
       <p>{time}</p>
       </div>
     </header>
     <section className=' h-44 border-2 flex flex-col justify-center items-center'>

      
      <div className="flex">

        <form className='flex gap-4 items-end ' onSubmit={handleLogin}>
        <span className='flex flex-col'>
            <label className='text-sm m-1'>Student ID</label>
            <input onChange={(e)=>{setStudentid(e.target.value)}} value={studentid} className='border py-1 px-3 outline-slate-300' type="text" id="studentid" placeholder='Enter Your ID' />
        </span>
        <span className='flex flex-col'>
            <label className='text-sm m-1' >Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className='border py-1 px-3 outline-slate-300' type="password" id="password" placeholder='Enter Password' />
        </span>
        <button type='submit' className='bg-blue-600 p-[0.4rem]  text-white  font-semibold text-sm hover:opacity-90'>{loading ?<Spinner/>:"Login/Logout"}</button>
        </form>

      </div>
      <h5 className='font-bold text-xs mt-5 text-orange-400 opacity-50'>Note:You have to logout when you will leave the lab. Otherwise you will be blocked.</h5>
      {message && <h3 className='font-semibold  text-xs mt-2 flex items-center justify-between text-red-500'>{message}</h3>}
     
     </section>
     <section className='border-2 min-h-screen mt-2'>
        <table>
            <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Login Time</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Hasibul Hasan Rokib</td>
                <td>19303027</td>
                <td>10:17 PM</td>
            </tr>
            <tr>
                <td>2</td>
                <td> Rokib</td>
                <td>19303027</td>
                <td>10:17 PM</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Hasibbul Hasan </td>
                <td>19303027</td>
                <td>10:17 PM</td>
            </tr>
        </table>
     </section>
     </main>
    </>
  )
}

export default Login
