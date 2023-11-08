import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import Logo from '../assets/IUBAT.png'
import { useState } from "react"
import {URL} from '../App'


const StudentUpdate = () => {

 const {id}=useParams()
 
 const location=useLocation()
 const navigate=useNavigate()

 const{studentid,fullname,email,phone,lastLogin,lastLogout,isLoggedIn,isBanned}=location.state;
 
 const[info,setInfo]=useState({fullname:fullname,email:email,isBanned:isBanned})

 const handleUpdate=async(e)=>{
 e.preventDefault()
 console.log(info)
 try {
 const res=await fetch(`${URL}/api/student/info/${id}`,{
  mode: 'no-cors',
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(info)
 })
 const data=await res.json()
 if(data.success===true){
  navigate('/admin-panel')
 }
  
 } catch (error) {
  console.log(error.message)
 }
 }

const handleChange=(e)=>{
setInfo({...info,[e.target.id]:e.target.value})
}


const handleDelete=async()=>{
  try {
    const res=await fetch(`${URL}/api/student/delete/${id}`,{
      mode: 'no-cors',
      method:"Delete"
    })
    const data=await res.json()
    console.log(data)
    if(data.success===true){
      navigate("/admin-panel")
    }
  } catch (error) {
    console.log(error.message)
  }
}


  return (
    <>
    <header className='flex justify-between items-center bg-white py-3 shadow-md px-16'>
     <div className='flex items-end'>
      <img className='w-14' src={Logo} alt="" />
      <h1 className='font-bold text-2xl mx-2 max-md:hidden'>Admin<span className='text-slate-500'>Panel</span></h1>
      </div>

      <ul className='flex gap-8'>
        <li><Link to={'/admin-panel'} className='font-semibold'>Dashboard</Link></li>
        <li><Link className='font-semibold'>Setting</Link></li>
      </ul>
    </header> 

     <section className=" py-4 md:px-6 px-1 mt-5">
     <form className="flex flex-col justify-center items-end" onSubmit={handleUpdate}>
      <table>
        <thead>
          <td>#</td>
          <td>Id</td>
          <td className="max-md:hidden">Name</td>
          <td className="max-md:hidden">Email</td>
          <td className="max-md:hidden">Phone</td>
          <td>Last Login</td>
          <td className="max-md:hidden">Last Logout</td>
          <td>Status</td>
          <td>isBanned</td>
        </thead>
        <tbody>
        <tr>
        <td>1</td>
          <td>{studentid}</td>
          <td className="max-md:hidden"><input className="p-3 w-full outline-slate-300" type="text" id="fullname" onChange={handleChange} value={info.fullname}/></td>
          <td className="max-md:hidden"><input className=" w-full p-3 outline-slate-300"  type="email" id="email" onChange={handleChange} value={info.email} /></td>
          <td className="max-md:hidden">{phone}</td>
          <td>{lastLogin[0].timestamp}</td>
          <td className="max-md:hidden">{lastLogout[0]?.timestamp}</td>
          <td>{isLoggedIn===true?"Active":"Offline"}</td>
          <td>
            <select id="isBanned" value={info.isBanned}  className={`p-1 md:p-3 border-2 shadow-sm ${isBanned===true?"text-red-500":"text-green-500"} w-full outline-slate-300 font-bold`} onChange={handleChange}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </td>
        </tr>
        </tbody>
      </table>
      <div className="flex gap-3">
      <button type="submit" className="bg-sky-500  py-3 px-6 font-semibold text-white hover:opacity-90 my-6">Update</button>
      <button type="button" onClick={handleDelete} className="bg-red-500  py-3 px-6 font-semibold text-white hover:opacity-90 my-6">Delete</button>
      </div>
      </form>
     </section>

     <h2 className="font-bold my-3 text-xl text-center">Student Time History:</h2>
     <section className="p-4 mt-5 flex gap-4 justify-center">
     
      <table className="md:w-1/4">
        <thead>
          <td>#</td>
          <td>Login Time</td>
        </thead>
        <tbody>
          {lastLogin && lastLogin.map((time,index)=>{
            return <tr>
               <td>{index+1}</td>
               <td>{time.timestamp}</td>
            </tr>
          })}
        </tbody>
      </table>

      <table className="md:w-1/4">
        <thead>
          <td>#</td>
          <td>Logout Time</td>
        </thead>
        <tbody>
          {lastLogout && lastLogout.map((time,index)=>{
            return <tr>
               <td>{index+1}</td>
               <td>{time.timestamp}</td>
            </tr>
          })}
        </tbody>
      </table>

     </section>
    </>
  )
}

export default StudentUpdate
