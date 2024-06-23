import { useContext, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import { userListContext } from './context/ContextProvider'
import { auth,db } from './firebaseConnection/connection'
import { onAuthStateChanged } from 'firebase/auth'
import { doc,collection,getDoc,getDocs } from 'firebase/firestore'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import Investment from './pages/Investment'
import Analyse from './pages/Analyse'
import NotFound from './pages/NotFound'







function App() {

  const {setUserList,setUser,setIsLoading} = useContext(userListContext)

  const router = createBrowserRouter([
    {
      path:"/",
      element:<LandingPage/>,
    },
    {
      path:"/login",
      element:<Login />,
    },
    {
      path:"/register",
      element:<Register />
    },
    {
      path:"/dashboard",
      element:<Dashboard />
  
    },
    {
      path:"/investment",
      element:<Investment />
    },
    {
      path:"/analysis",
      element:<Analyse />
    },
    {
      path:"/forgotpassword",
      element:<ForgotPassword />
    },
    {
      path:"/*",
      element:<NotFound />
    }
  ])
  


 return (
    <>
   
   
      
    <RouterProvider router = {router}>
         
    </RouterProvider>
  
   
   
    
      
    </>
  )
}

export default App
