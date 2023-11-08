import React from "react"
import { useEffect, useState } from "react"
import { URL } from '../App'


export const StudentContext=React.createContext()

const StudentProvider=({children})=>{

    const [studentData,setStudentData]=useState()

    const getAllData=async()=>{
        try {
            const res=await fetch(`${URL}/api/student/active`)
            const data=await res.json()
            setStudentData(data.students)
        } catch (error) {
        console.log(error.message)
        }
    }
    
    useEffect(()=>{
    getAllData()
    },[studentData])

    return <StudentContext.Provider value={{studentData}}>
        {children}
    </StudentContext.Provider>
}

export default StudentProvider;

