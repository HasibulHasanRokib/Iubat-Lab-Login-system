import { useDispatch } from 'react-redux'
import Logo from '../assets/IUBAT.png'
import {URL} from '../App.jsx'
import { ADMIN_SIGNOUT } from '../features/adminSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const AdminPanel = () => {
  
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const[students,setStudents]=useState([])
  const[filter,setFilter]=useState("students")
  const [query,setQuery]=useState("")
  const [page,setPage]=useState(1)
  const [prevPage,setPrevPage]=useState()
  const [nextPage,setNextPage]=useState()
  
  const handleSearch=(e)=>{
    e.preventDefault()
  }

  const handleLogout=async()=>{
   try {

   const res=await fetch(`${URL}/api/admin/sign-out`)
   const data=await res.json()

   if(data.success===true){
    dispatch(ADMIN_SIGNOUT())
    navigate('/admin-login')
   }
   } catch (error) {
     console.log(error.message)
   }
  }

  const getStudents=async()=>{
    try {
      const res=await fetch(`${URL}/api/student/${filter}?search=${query}&&page=${page}`)
      const data=await res.json()
      if(data.success===true){
        setStudents(data.students)
        setPrevPage(data.pagination.previousPage)
        setNextPage(data.pagination.nextPage)
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
  getStudents()
  },[students])


  return (
    <>
     <header className='flex justify-between items-center bg-white py-3 shadow-md px-16'>
     <div className='flex items-end'>
      <img className='w-14' src={Logo} alt="" />
      <h1 className='font-bold text-2xl mx-2 max-md:hidden'>Admin<span className='text-slate-500'>Panel</span></h1>
      </div>

      <ul className='flex gap-8'>
        <li><Link to={'/admin-panel'} className='font-semibold'>Dashboard</Link></li>
        <li><Link onClick={handleLogout} className='font-semibold'>Logout</Link></li>
      </ul>
     </header> 

      <section className='py-4 md:px-20 px-3'> 
      <form className='mt-10' onSubmit={handleSearch}>
        <input type="search" onChange={(e)=>setQuery(e.target.value)} value={query} className='border py-1 px-4 outline-slate-300' placeholder='Enter Student Id' />
        <button className='border py-1 px-4 bg-gray-700 text-white'>Search</button>
      </form>

      <div className="flex justify-between py-3 max-md:my-5">
      <h2 className='py-3 font-bold text-xl capitalize'>Total student ({students && students.length})</h2>   
      <select className='p-3 border rounded-md outline-slate-300' onChange={(e)=>setFilter(e.target.value)} >
      <option value="students">Total students</option>
      <option value="active">Active students</option>
      <option value="banned">Block students</option>
      </select>
      </div>

      {students.length===0 ? <h2 className='p-10 text-center font-semibold'>No student</h2>:(
            <>
        <table>
          <thead>
            <td className='font-bold'>#</td>
            <td className='font-bold'>ID</td>
            <td className='font-bold'>Name</td>
            <td className='font-bold max-md:hidden'>Email</td>
            <td className='font-bold max-md:hidden'>Program</td>
            <td className='font-bold max-md:hidden'>Gender</td>
            <td className='font-bold'>LastLogin</td>
            <td className='font-bold max-md:hidden'>LastLogout</td>
            <td className='font-bold'>Blocked</td>
          </thead>
         
          <tbody>
          {students && students.map((data,index)=>{
          const{studentid,fullname,email,phone,lastLogin,lastLogout,isLoggedin,isBanned}=data
          return <tr key={index}>
              <td>{index+1}</td>
              <td>{data.studentid}</td>
              <td className=' capitalize'><Link to={`/student/${data._id}`} state={{studentid,fullname,email,phone,lastLogin,lastLogout,isLoggedin,isBanned}} className='hover:underline'>{data.fullname}</Link></td>
              <td className='max-md:hidden'>{data.email}</td>
              <td className='uppercase max-md:hidden'>{data.program}</td>
              <td className=' capitalize max-md:hidden'>{data.gender}</td>
              <td>{data.lastLogin[0]?.timestamp}</td>
              <td className='max-md:hidden'>{data.lastLogout[0]?.timestamp}</td>
              <td>{data.isBanned===false?<p className='text-green-500 font-bold'>Ok</p>:<p className='text-red-500 font-bold'>Block</p>}</td>
          </tr>
         })}
         </tbody>
         </table>
         <div className="flex gap-4 mt-5 justify-center">
          <button disabled={prevPage===null} onClick={()=>setPage(page-1)} className='bg-slate-700 w-20 text-white p-2 hover:opacity-90 disabled:bg-slate-500 disabled:cursor-not-allowed'>Previous</button>
          <button disabled={nextPage===null}  onClick={()=>setPage(page+1)} className='bg-slate-700 text-white w-20 p-2 hover:opacity-90 disabled:bg-slate-500 disabled:cursor-not-allowed'>Next</button>
         </div>
          </>
          )}    
      </section>
    </>
  )
}

export default AdminPanel
