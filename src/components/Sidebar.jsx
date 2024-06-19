import React from 'react'
import { IoLogOut } from "react-icons/io5";
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import {auth} from '../firebaseConnection/connection'
import { useNavigate } from 'react-router-dom';



const Sidebar = () => {

  const {currentUser,isLoading,setUser,setUserList,setIsSignIn} = useContext(userListContext)
  const navigate = new useNavigate()

  const handleLogout = async () => {
    try {
      const isLogout = confirm("Do you want to logout?");
      if(isLogout){
        await auth.signOut();
        localStorage.clear()
        setIsSignIn(false)
        setUser(null)
        setUserList([])
        navigate("/login")
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }
  


  return (
    <aside className=' min-w-[15%] min-h-screen p-2 bg-[#0f0f0f] relative text-white z-20'>
        <div className="profile text-center mt-8">
            <div className='profileImage h-16 w-16 bg-white rounded-full mx-auto'></div>
            {
              isLoading ? <p className='text-white'>Loading...</p> : (
                <h2>{currentUser?.firstName}</h2>
              )
            }
            
        </div>
        <div className='nav-items'>
            {/* <ul className='mt-16'>
                <li className='mt-4'>
                <button className='border w-[60%] flex items-center justify-center gap-3 p-2 mx-auto text-left rounded-md'>
                <GiPayMoney className='text-2xl' />
                <p>To Pay</p>
                </button>

                </li>
                <li className='mt-4'>
                <button className='border w-[60%] flex items-center justify-center gap-3 p-2 mx-auto rounded-md'>
                <GiReceiveMoney className='text-2xl'/>
                <p>To Receive</p>
                </button>

                </li>
            </ul> */}
            
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