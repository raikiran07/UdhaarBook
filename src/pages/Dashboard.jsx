import React, { useEffect } from 'react'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { userListContext } from '../context/ContextProvider';
import { useContext } from 'react';
import MobileNavbar from '../components/MobileNavbar';


const Dashboard = () => {
const navigate =  useNavigate()
const {setNavActive,navActive,isAddBox,isSignIn} = useContext(userListContext)
console.log(navActive)
const location = useLocation()
const url = location.pathname.slice(1)
console.log(isSignIn)

  useEffect(()=>{
   
    setNavActive(url)
   


    if(!localStorage.getItem("uid")){
      navigate("/login")
    }
  },[])


  return (
    <div className='relative w-full h-screen text-xs md:text-base'>
      <div className='relative px-8 py-2 md:hidden'>
       <h2 className='text-[1rem] text-[#ffbd59] font-consert'>udhaarbook.</h2>
      </div>
      <MobileNavbar/>
    <div className={`flex max-h-screen overflow-hidden `}>
        <Sidebar/>
        <Main/>
        
        
    </div>
   
    
    </div>
  )
}

export default Dashboard