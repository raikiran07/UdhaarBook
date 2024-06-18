import React from 'react'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='flex max-h-screen overflow-hidden'>
        <Sidebar/>
        <Main/>
        
    </div>
  )
}

export default Dashboard