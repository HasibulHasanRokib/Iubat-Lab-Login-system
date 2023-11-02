import React, { useState } from 'react'
import Logo from "../assets/IUBAT.png"
import { URL } from '../App'
import {FaXmark} from "react-icons/fa6"
import Spinner from './spinner'

const Registration = () => {

  const [newStudent,setNewStudent]=useState({studentid:"",program:"",fullname:"",gender:"",email:"",phone:"",password:""})

  const [message,setMessage]=useState(false)
  const [loading,setLoading]=useState(false)


  const handleChange=(e)=>{
    setNewStudent({...newStudent,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    setLoading(true)
    const res=await fetch(`${URL}/api/student/sign-up`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newStudent)
    })
    const data=await res.json()
    if(data.message===false){
      setMessage(data.message)
      setLoading(false)
    }else{
      setMessage(data.message)
      setLoading(false)
      setNewStudent({studentid:"",program:"",fullname:"",gender:"",email:"",phone:"",password:""})

    }
    
  } catch (error) {
    console.log(error.message)
    setMessage(error.message)
    setLoading(false)

  }
  }

  return (
    <>
     <section className='border-2 w-2/6 p-3 my-3 mx-2 h-screen fixed z-50'>
      <div className=" flex flex-col justify-center items-center">
      <img className='w-12' src={Logo} alt="" />
        <h1 className='text-xl capitalize'>iubat computer lab</h1>
        <p className='font-semibold  text-sky-400'>Registration form</p>
      </div>
     {message && <h3 className='font-semibold my-3 text-xs bg-amber-300 px-2 py-2 flex items-center justify-between text-white'>{message} <FaXmark className='inline-block cursor-pointer' onClick={()=>setMessage(false)} /></h3>}
       <form className='flex flex-col gap-2 border px-3 py-5 mt-5' onSubmit={handleSubmit}>
        <label className='font-semibold text-sm'>Student ID</label>
        <input className='border py-1 px-2 outline-slate-300' type="text" placeholder='Enter Student ID' id="studentid" onChange={handleChange} value={newStudent.studentid} />
      
        <label className='font-semibold text-sm'>Program</label>
        <select className='border py-1 px-2 outline-slate-200' id="program" onChange={handleChange} value={newStudent.program}>
            <option value="">Choose</option>
            <option value="bcse">BCSE</option>
            <option value="beee">BEEE</option>
        </select>

        <label className='font-semibold text-sm'>Full Name</label>
        <input className='border py-1 px-2 outline-slate-300' type="text" placeholder='Enter Full Name' id='fullname' onChange={handleChange} value={newStudent.fullname} />
      
        <label className='font-semibold text-sm'>Gender</label>
        <select className='border py-1 px-2 outline-slate-200' id="gender" value={newStudent.gender} onChange={handleChange} >
            <option value="">Choose</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>

        <label className='font-semibold text-sm'>Email Address</label>
        <input className='border py-1 px-2 outline-slate-300' type="email" placeholder='Enter Email Address' id='email' onChange={handleChange} value={newStudent.email}/>
      
        
        <label className='font-semibold text-sm'>Mobile Number</label>
        <input className='border py-1 px-2 outline-slate-300' type="number" placeholder='Enter Mobile Number' id='phone' onChange={handleChange} value={newStudent.phone} />
      
        
        <label className='font-semibold text-sm'>Password</label>
        <input className='border py-1 px-2 outline-slate-300' type="password" id='password' onChange={handleChange} value={newStudent.password} placeholder='Enter Password' />
      
        <button className='bg-blue-600 px-2 py-1 mt-4  text-white hover:opacity-90' type="submit">{loading ? <Spinner/>:"Submit"}</button>

       </form>
     </section> 
    </>
  )
}

export default Registration
