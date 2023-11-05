import { useContext } from "react"
import { StudentContext } from "../context/studentContext"

const Students = () => {

const{studentData}=useContext(StudentContext)

  return (
    <section className='border-2 min-h-screen mt-2 bg-white'>
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
         {studentData && studentData.map((student,index)=>{
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
  )
}

export default Students
