import React, { useEffect } from 'react'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
const navigate =  useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("uid")){
      navigate("/login")
    }
  },[])


  return (
    <>
    <div className='flex max-h-screen overflow-hidden'>
        <Sidebar/>
        <Main/>
        
        
    </div>
    
    </>
  )
}

export default Dashboard