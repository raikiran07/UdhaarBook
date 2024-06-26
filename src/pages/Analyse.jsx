import React from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate,useLocation } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import { userListContext } from '../context/ContextProvider'
import MobileNavbar from '../components/MobileNavbar'

const Analyse = () => {
const navigate =  useNavigate()
const {setNavActive,isAddBox,isSignIn} = useContext(userListContext)

const location = useLocation()
const url = location.pathname.slice(1)

useEffect(()=>{
   
    setNavActive(url)
   


    if(!localStorage.getItem("uid")){
      navigate("/login")
    }
  },[])

  return (
    <>
    <div className='relative px-8 py-2 md:hidden'>
       <h2 className='text-[1rem] text-[#ffbd59] font-consert'>udhaarbook.</h2>
      </div>
    <MobileNavbar />
    <div className={`flex max-h-screen overflow-hidden `}>
    <Sidebar />
    <aside className={`min-w-[85%] relative px-8 text-white overflow-y-auto py-4 text-xs md:text-base`}>
        <h2>Analysis of data, coming soon...</h2>
    </aside>
    </div>
    </>
  )
}

export default Analyse