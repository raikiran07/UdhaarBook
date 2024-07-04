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

const location = useLocation()
const url = location.pathname.slice(1)


  useEffect(()=>{
   
    setNavActive(url)
   


    if(!localStorage.getItem("uid")){
      navigate("/login")
    }
  },[])


  return (
    <div className='relative w-full h-screen text-xs md:text-base'>
     
      <MobileNavbar/>
    <div className={`flex max-h-screen overflow-hidden `}>
        <Sidebar/>
        <Main/>
        
        
    </div>
   
    
    </div>
  )
}

export default Dashboard