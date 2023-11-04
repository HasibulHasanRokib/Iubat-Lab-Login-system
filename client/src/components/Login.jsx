import { useEffect, useState } from 'react'
import { URL } from '../App'
import Spinner from './spinner'
import { useDispatch, useSelector } from 'react-redux'
import { GET_REQUEST, GET_REQUEST_FAILED, GET_REQUEST_SUCCESS } from '../services/studentSlice'

const Login = () => {

    const[studentid,setStudentid]=useState()
    const[password,setPassword]=useState()
    const [message,setMessage]=useState(false)

    const{isLoading,currentStudent,error}=useSelector((state)=>state.student)

    const dispatch=useDispatch()

    const [currentTime, setCurrentTime] = useState(new Date());

    console.log(currentStudent)

    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     setCurrentTime(new Date());
    //   }, 1000);
  
    //   return () => clearInterval(intervalId);
    // }, []);

    const current = new Date();
    const time = currentTime.toLocaleTimeString("en-US");
    const date=current.toDateString()

    const handleLogin=async(e)=>{
        e.preventDefault()
        try {
            // dispatch(GET_REQUEST())
            const res=await fetch(`${URL}/api/student/sign-in`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({studentid,password}),
                credentials:"include"
            })
            const data=await res.json()
            if(data.success===false){
                setMessage(data.message)
            //    dispatch(GET_REQUEST_FAILED(data.message))

            }else{
                // dispatch(GET_REQUEST_SUCCESS(data.studentExist))
                setMessage(data.message)
            }
            
            setPassword("")
            setStudentid("")
            

        } catch (error) {
            setMessage(error.message)
            // dispatch(GET_REQUEST_FAILED(error.message))

        }

    }
    
    useEffect(()=>{
    const activeStudent=async()=>{
    try {
        dispatch(GET_REQUEST())
        const res=await fetch(`${URL}/api/student/current-users`)
        const data=await res.json()
        dispatch(GET_REQUEST_SUCCESS(data.activeUser))
        console.log(data.activeUser)
    } catch (error) {
        console.log(error.message)
        dispatch(GET_REQUEST_FAILED(error.message))
    }
    }
    activeStudent()
    },[])
  


  return (
    <>
     <main className='w-4/6 max-md:w-full min-h-screen right-0 absolute p-3'>

     <header className='flex justify-between border-2 p-3'>
     <div className="flex flex-col max-w-[12rem] justify-start items-start gap-1">
        <h2 className='text-xs'>Computer Lab 1 (CSE Practice Lab) (Only for CSE Department)</h2>
        <p className='text-xs'>Seat :{currentStudent && currentStudent.length}/70</p>
        <button className='text-xs text-blue-600 hover:underline'>System logout</button>
       </div>
       <h1 className='font-semibold text-3xl max-md:text-lg uppercase'>Ict Center</h1>
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
        <button type='submit' className='bg-blue-600 p-[0.4rem]  text-white  font-semibold text-sm hover:opacity-90'>{isLoading ?<Spinner/>:"Login/Logout"}</button>
        {/* <button type='submit' className='bg-blue-600 p-[0.4rem]  text-white  font-semibold text-sm hover:opacity-90'>Login/Logout</button> */}
    </form>

      </div>
      <h5 className='font-semibold text-xs text-orange-800 opacity-50'>Note:You have to logout when you will leave the lab. Otherwise you will be blocked.</h5>
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
         {currentStudent && currentStudent.map((student,index)=>{
            return <tr key={student?._id}>
                <td>{index+1}</td>
                <td className=' capitalize'>{student?.fullname}</td>
                <td>{student?.studentid}</td>
                <td>{student?.lastLogin[0].timestamp}</td>
            </tr>
         })}
        </tbody>
        </table>

     </section>

     </main>
    </>
  )
}

export default Login
