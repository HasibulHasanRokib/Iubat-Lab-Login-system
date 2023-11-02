import React, { useEffect, useState } from 'react'
import { URL } from '../App'
import Spinner from './spinner'
const Login = () => {

    const[studentid,setStudentid]=useState()
    const[password,setPassword]=useState()
    const [message,setMessage]=useState(false)
    const [loading,setLoading]=useState(false)

    const [studentData,setStudentData]=useState()

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
                body:JSON.stringify({studentid,password}),
                credentials:"include"
            })
            const data=await res.json()
            if(data.success===false){
                setLoading(false)
                setMessage(data.message)
            }
            setLoading(false)
            setMessage(data.message)
            setPassword("")
            setStudentid("")
        } catch (error) {
            setLoading(false)
            setMessage(error.message)
        }

    }


    useEffect(()=>{
    const getActiveStudent=async()=>{   
    const res=await fetch(`${URL}/api/student/active`,{
        method:"GET",
        credentials:"include"
    })
    const data=await res.json()
    setStudentData(data.student)
    } 
    getActiveStudent()
    },[])

  return (
    <>
     <main className='w-4/6 min-h-screen right-0 absolute p-3'>
     
     <header className='flex justify-between border-2 p-3'>
     <div className="flex flex-col max-w-[12rem] justify-start items-start gap-1">
        <h2 className='text-xs'>Computer Lab 1 (CSE Practice Lab) (Only for CSE Department)</h2>
        <p className='text-xs'>Seat : 0/70</p>
        <button className='text-xs text-blue-600 hover:underline'>System logout</button>
       </div>
       <h1 className='font-semibold text-3xl uppercase'>Ict Center</h1>
       <div className="">
       <p className='font-semibold text-xl'>{date}</p>
       <p className='text-xs'>{time}</p>
       </div>
     </header>

     <section className=' h-auto py-6 border-2 flex flex-col justify-center items-center'>  
      <div className="flex">

        <form className='flex gap-4 items-end p-5' onSubmit={handleLogin}>
        <span className='flex flex-col'>
            <label className='text-sm m-1'>Student ID</label>
            <input onChange={(e)=>{setStudentid(e.target.value)}} value={studentid} className='border py-1 px-3 outline-slate-300' type="text"  placeholder='Enter Your ID'  required/>
        </span>
        <span className='flex flex-col'>
            <label className='text-sm m-1' >Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className='border py-1 px-3 outline-slate-300' type="password" placeholder='Enter Password' required />
        </span>
        <button type='submit' className='bg-blue-600 p-[0.4rem]  text-white  font-semibold text-sm hover:opacity-90'>{loading ?<Spinner/>:"Login/Logout"}</button>
        </form>

      </div>
      <h5 className='font-bold text-xs text-orange-400 opacity-50'>Note:You have to logout when you will leave the lab. Otherwise you will be blocked.</h5>
      {message && <h3 className='font-semibold  text-xs mt-2 flex items-center justify-between text-red-500'>{message}</h3>}
     </section>


     <section className='border-2 min-h-screen mt-2'>
        <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Login Time</th>
            </tr> 
        </thead>   
        <tbody>
        <tr key={studentData?._id}>
                <td>{1}</td>
                <td>{studentData?.fullname}</td>
                <td>{studentData?.studentid}</td>
                <td>{time}</td>
       </tr>
         {/* {studentData && studentData.map((student,index)=>{
        return <tr key={student._id}>
                <td>{index+1}</td>
                <td>{student.fullname}</td>
                <td>{student.studentid}</td>
                <td>{time}</td>
            </tr>
        })} */}
        </tbody>
        </table>
     </section>
     </main>
    </>
  )
}

export default Login
