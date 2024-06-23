import React from 'react'
// import { TbCircleNumber1Filled } from "react-icons/tb";
import { Link } from 'react-router-dom'
import backgroundVideo from '../assets/backgroundVideo.mp4'

const LandingPage = () => {
  return (
    <div className='landing w-full h-[100vh] relative'>
      
        
        <header className='text-center text-white z-40 relative'>
        <h1 className='curveFont text-[1.5rem]  pt-16 md:text-6xl'>Easy Peasy Udhaar Book</h1>
        <h1 className='curveFont text-[1rem] lg:mt-2 md:text-6xl'>Manage your udhaar and debt</h1>
        </header>
     <div className='w-full text-center'>
     <h2 className='text-white text-center mt-24 text-2xl curveUnderlined mb-8'>Features and Process</h2>

     </div>
       
       
        <div className='flex flex-col items-center justify-center gap-4 max-w-[60%] mx-auto mt-4 ease-linear md:flex-row'>
            <div className=' text-gray-800 border p-2 bg-gray-300 rounded-md min-h-[260px] flex-1 '>
            <h1 className='text-2xl bg-gray-800 text-white max-w-[50px] min-h-[50px] rounded-full flex items-center justify-center'>1</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
            An easy sign-in method involves using Single Sign-On (SSO)  to streamline access and enhance security.

            </p>
            <Link to="/login">
            <span className='underline text-blue-800'>singIn</span>
            </Link>
            
            </div>
            <div className='card text-white border p-2 rounded-md hover:bg-gray-300 hover:text-gray-800 min-h-[260px] flex-1 '>
            <h1 className='text-2xl border max-w-[50px] min-h-[50px] rounded-full flex items-center justify-center text-white'>2</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
            An easy sign-up method uses  email verification to quickly create accounts with minimal user input and maximum convenience.
            </p>
            <Link to="/register">
            <span className='underline text-blue-700'>singUp</span>
            </Link>
            
            </div>
            <div className='card text-white border p-2 rounded-md hover:bg-gray-300 hover:text-gray-800 min-h-[260px] flex-1 '>
            <h1 className='text-2xl border max-w-[50px] min-h-[50px] rounded-full flex items-center justify-center text-white ease-linear '>3</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
            udhaarbook provides an easy udhaar management system for seamless tracking and managing of debts.
            </p>
          
            
            </div>
        </div>

    </div>
  )
}

export default LandingPage