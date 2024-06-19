import React, { useEffect } from 'react'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

  // useEffect(()=>{
  //   toast.success("Login Successful")
  // },[])

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