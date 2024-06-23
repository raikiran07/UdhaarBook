import React from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { Link,useNavigate } from 'react-router-dom';
import { MdAnalytics } from "react-icons/md";
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import { MdLogout } from "react-icons/md";


const MobileNavbar = () => {
    const {currentUser} = useContext(userListContext)
    console.log(currentUser)
    const navigate = useNavigate()

    const handleLogout = () => {
        const decision = confirm("Do you want to logout?")
        if(decision){
            localStorage.clear();
            navigate("/")
        }
    }


  return (
    <nav className='w-full  rounded-tl-md rounded-tr-md  text-white px-7 py-6 absolute bottom-0 z-50 left-[50%] translate-x-[-50%] bg-[#0f0f0f] flex items-center justify-between text-[1rem] thinShadow md:hidden'>
    <div className='flex items-center justify-center gap-2'>
    <h1>Hi,</h1>
    <span>{currentUser?.firstName}</span>
    </div>
    <div className='flex items-center justify-center text-center gap-4'>
        <div className=''>
        <Link to="/dashboard">
        <FaMoneyCheckDollar className='' />
        
        </Link>
        </div>
        <div>
        <Link to="/investment">
        <BsBriefcaseFill />
        
        </Link>
                             
        </div>
        <div>
        <Link to="/analysis">
        <MdAnalytics />
        
        </Link>
                             
        </div>
    </div>
    <div>
        <button onClick={()=>handleLogout()}>
        <MdLogout />
        </button>
    </div>
    </nav>
  )
}

export default MobileNavbar