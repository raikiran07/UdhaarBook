import React from 'react'
// import { TbCircleNumber1Filled } from "react-icons/tb";
import { Link } from 'react-router-dom'
import backgroundVideo from '../assets/backgroundVideo.mp4'

const LandingPage = () => {
  return (
    <div className='landing w-full h-[100vh] relative'>
      
        
        <header className='text-center text-white z-40'>
        <h1 className='curveFont text-4xl  pt-16 md:text-6xl'>Easy Peasy Udhaar Book</h1>
        <h1 className='curveFont text-2xl mt-2 md:text-6xl'>Manage your udhaar and debt</h1>
        </header>

        <h2 className='text-white text-center mt-24 text-2xl'>Features and Process</h2>
        <hr className='max-w-[30px] mx-auto mt-2' />
        <div className='flex flex-col items-center justify-center gap-4 max-w-[60%] mx-auto mt-4 ease-linear md:flex-row'>
            <div className=' text-gray-800 border p-2 bg-gray-300 rounded-md min-h-[260px]'>
            <h1 className='text-2xl bg-gray-800 text-white max-w-[50px] min-h-[50px] rounded-full flex items-center justify-center'>1</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dicta tempora excepturi perspiciatis? Aliquam labore voluptas consequuntur aspernatur molestiae est?

            </p>
            <Link to="/login">
            <span className='underline text-blue-800'>singIn</span>
            </Link>
            
            </div>
            <div className='card text-white border p-2 rounded-md hover:bg-gray-300 hover:text-gray-800 min-h-[260px]'>
            <h1 className='text-2xl border max-w-[50px] min-h-[50px] rounded-full flex items-center justify-center text-white'>2</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dicta tempora excepturi perspiciatis? Aliquam labore voluptas consequuntur aspernatur molestiae est?
            </p>
            <Link to="/register">
            <span className='underline text-blue-700'>singUp</span>
            </Link>
            
            </div>
            <div className='card text-white border p-2 rounded-md hover:bg-gray-300 hover:text-gray-800 min-h-[270px]'>
            <h1 className='text-2xl border max-w-[50px] min-h-[50px] rounded-full flex items-center justify-center text-white ease-linear '>3</h1>
            <p className='text-lg tracking-wide min-h-32 mt-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dicta tempora excepturi perspiciatis? Aliquam labore voluptas consequuntur aspernatur molestiae est?
            </p>
          
            
            </div>
        </div>

    </div>
  )
}

export default LandingPage