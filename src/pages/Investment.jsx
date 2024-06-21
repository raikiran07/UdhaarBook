import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import { userListContext } from '../context/ContextProvider'

const Investment = () => {

const navigate =  useNavigate()
const {setNavActive,navActive} = useContext(userListContext)
console.log(navActive)
const location = useLocation()
const url = location.pathname.slice(1)

useEffect(()=>{
   
    setNavActive(url)
   


    if(!localStorage.getItem("uid")){
      navigate("/login")
    }
  },[])

  return (
    <div className='flex max-h-screen overflow-hidden'>
    <Sidebar/>
    <aside className={`min-w-[85%] relative px-8 text-white overflow-y-auto py-8`}>
        <h1>Investment page</h1>
    </aside>
    
    
</div>
  )
}

export default Investment