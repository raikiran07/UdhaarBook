import React, { useState } from 'react'
import { IoLogOut } from "react-icons/io5";
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import {auth} from '../firebaseConnection/connection'
import { useNavigate, useSearchParams,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Sidebar = () => {

  const {currentUser,isLoading,setUser,setUserList,setIsSignIn,navActive,setNavActive} = useContext(userListContext)
  const navigate = new useNavigate()

  console.log(navActive)
  

  const handleLogout = async () => {
    try {
      const isLogout = confirm("Do you want to logout?");
      if(isLogout){
        
        await auth.signOut();
        localStorage.clear()
        setIsSignIn(false)
        setUser(null)
        setUserList([])
        navigate("/")
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }
  


  return (
    <aside className=' min-w-[15%] min-h-screen p-2 bg-[#0f0f0f] relative text-white z-20 hidden md:block'>
        <div className="profile text-center mt-8">
            <div className='profileImage h-16 w-16 bg-white rounded-full mx-auto text-black flex items-center justify-center'>
              <p className='text-2xl font-semibold'>
              {
                currentUser?.firstName?.slice(0,1)?.toUpperCase()
              }
              </p>
             
            </div>
            {
              isLoading ? <p className='text-white'>Loading...</p> : (
                <h2>{currentUser?.firstName}</h2>
              )
            }
            
        </div>
        <div className='nav-items'>
            <ul className='mt-16'>
                <li className=''>
                <button className={`w-[60%] flex items-center justify-start gap-3 p-2 mx-auto rounded-md ${navActive=="dashboard" ? "thinShadow" : ""}`}>
                <Link to="/dashboard">
                udhaar
                </Link>
                </button>

                </li>
                <li className=''>
                <button className={`w-[60%] flex items-center justify-start gap-3 p-2 mx-auto rounded-md ${navActive=="investment" ? "thinShadow" : ""}`}>
               <Link to="/investment">investment</Link>
                </button>

                </li>
                <li className=''>
                <button className={`w-[60%] flex items-center justify-start gap-3 p-2 mx-auto rounded-md ${navActive=="analysis" ? "thinShadow" : ""}`}>
               <Link to="/analysis">analysis</Link>
                </button>

                </li>
            </ul>
            
        </div>
            
                
            

        <div className='logout absolute w-full bottom-8 left-0'>
        <button className='border w-[60%] flex items-center justify-center gap-3 p-2 mx-auto rounded-md hover:bg-red-500 hover:text-white'
        onClick={()=>handleLogout()}
        >
                <IoLogOut className='text-2xl' />
                <p>Log Out</p>
        </button>

        </div>
    </aside>
  )
}

export default Sidebar