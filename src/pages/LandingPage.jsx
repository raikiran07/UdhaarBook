import React,{useEffect} from 'react'
// import { TbCircleNumber1Filled } from "react-icons/tb";
import { Link,useNavigate } from 'react-router-dom'


const LandingPage = () => {
const navigate = useNavigate()

  useEffect(()=>{
    const uid = localStorage.getItem("uid")
    if(uid){
      navigate("/dashboard")
    }
  },[])





  return (
    <div className='landing w-full min-h-[100vh] relative text-xs md:text-base bg-black'>
      <nav className='px-4 py-3 flex items-center justify-between md:px-16 md:py-8 fixed top-0 left-0 w-full bg-black z-50'>
      <div className='relative'>
       <h2 className='text-[1.3rem] md:text-[2rem] text-[#ffbd59] font-consert'>udhaarbook.</h2>
      </div>
      <div className='flex items-center justify-center gap-2 md:gap-4'>
        <Link to="/login">
        <button className='bg-blue-600 px-2 py-1 text-white rounded-md'>Login</button>
        </Link>
        <Link to="/register">
        <button className='bg-orange-600 px-2 py-1 text-white rounded-md'>Register</button>
        </Link>
        
        
      </div>
      </nav>
      
        
        <header className='text-center text-white z-40 relative pt-[2rem] md:pt-[4rem] px-1'>
        <h1 className='curveFont text-[3rem] text-center  pt-16 md:text-6xl'>Easy Peasy Udhaar Book, <br/>Manage your udhaar and debt.</h1>
        <p className='px-8 text-sm md:text-base mt-1 md:px-48'>udhaarbook is a free platform to maintain your udhaars and debts, where udhaar means money you have given to someone and debt means money that you have taken from someone else.</p>
        
        </header>
     <div className='w-full text-center'>
     <h2 className='text-white text-center mt-8 text-xl curveUnderlined mb-8'>Features and Process</h2>

     </div>
       
       
        <div className='flex flex-col items-center justify-center gap-4 max-w-[60%] mx-auto mt-4 ease-linear md:flex-row  min-w-[80%] md:min-w-[70%] pb-4'>
            <div className=' text-gray-800 border p-2 bg-gray-300 rounded-md min-h-[260px] flex-1 '>
            <h1 className='text-xl bg-gray-800 text-white max-w-[30px] min-h-[30px] rounded-full flex items-center justify-center'>1</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
            An easy sign-in method involves using Single Sign-On (SSO)  to streamline access and enhance security.

            </p>
            <Link to="/login">
            <span className='underline text-blue-800'>singIn</span>
            </Link>
            
            </div>
            <div className='card text-white border p-2 rounded-md hover:bg-gray-300 hover:text-gray-800 min-h-[260px] flex-1 bg-black '>
            <h1 className='text-xl border max-w-[30px] min-h-[30px] rounded-full flex items-center justify-center text-white'>2</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
            An easy sign-up method uses  email verification to quickly create accounts with minimal user input and maximum convenience.
            </p>
            <Link to="/register">
            <span className='underline text-blue-700'>singUp</span>
            </Link>
            
            </div>
            <div className='card text-white border p-2 rounded-md hover:bg-gray-300 hover:text-gray-800 min-h-[260px] flex-1 bg-black '>
            <h1 className='text-xl border max-w-[30px] min-h-[30px] rounded-full flex items-center justify-center text-white ease-linear '>3</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
            udhaarbook provides an easy udhaar management system for seamless tracking and managing of debts.
            </p>
          
            
            </div>
        </div>

    </div>
  )
}

export default LandingPage