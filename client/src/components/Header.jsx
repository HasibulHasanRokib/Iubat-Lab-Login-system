import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/studentContext";

    const Header = () => {
      
    const{studentData}=useContext(StudentContext)
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);

    const current = new Date();
    const time = currentTime.toLocaleTimeString("en-US");
    const date=current.toDateString()

    return (
    <header className='flex justify-between border-2 p-3'>
    <div className="flex flex-col max-w-[12rem] justify-start items-start gap-1">
       <h2 className='text-xs'>Computer Lab 1 (CSE Practice Lab) (Only for CSE Department)</h2>
       <p className='text-xs'>Seat :{studentData && studentData.length}/70</p>
       <button className='text-xs text-blue-600 hover:underline'>System logout</button>
      </div>
      <h1 className='font-semibold text-3xl max-md:text-lg uppercase'>Ict Center</h1>
      <div className="">
      <p className='font-semibold text-xl'>{date}</p>
      <p className='text-xs'>{time}</p>
      </div>
    </header>
  )
}

export default Header
