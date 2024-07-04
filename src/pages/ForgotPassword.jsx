import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConnection/connection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {
    const [userEmail,setUserEmail] = useState("")

const handleNewPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth,userEmail).then(data=>{
    setUserEmail("")
    toast.info("reset link sent to your email")
    }).catch(err=>{
        toast.error(err?.message)
    })

}

  return (
    <div className='w-full h-[100vh] flex items-center justify-center bg-[#0f0f0f]'>
    <form onSubmit={handleNewPassword} className=' bg-[#141414]  px-16 py-8 rounded-md thinShadow '>
        <div className='text-5xl flex items-center justify-center text-white'>
        <CgProfile />
        </div>
        <div className='mt-8'>
            <label htmlFor="email" className='font-semibold text-white'>email</label>
            <input type="text" className='block border-none  px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="email"
            value={userEmail}
            onChange={(e)=>setUserEmail(e.target.value)}
            required

            />
        </div>
        
        <div className='mt-8 mb-4'>
          <button type='submit' className=' w-full py-2 font-semibold tracking-wider rounded-md text-white bg-[#282928]'>Submit</button>
        </div>
        <div>
           <Link to="/login">
           <span className='text-white tracking-wide underline'>signIn</span>
           </Link>
           
        </div>
    </form>

    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

   
   
   
</div>
  )
}

export default ForgotPassword