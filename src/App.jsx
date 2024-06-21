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
      path:"/forgotpassword",
      element:<ForgotPassword />
    }
  ])
  

  // useEffect(()=>{

  //   const unsubscribeAuth = onAuthStateChanged(auth,async(user)=>{
  //     console.log(user)
  //     if(user){
  //       const docRef = doc(db,"Users",user.uid);
  //               // reference for retrieving the subcollection list
  //               const listRef = collection(db,"Users",auth.currentUser.uid,"list");

  //               const docSnap = await getDoc(docRef);
  //               if(docSnap.exists()){
                    
  //                   const {email,firstName,lastName} = docSnap.data();
  //                   setUser({
  //                       email,
  //                       firstName,
  //                       lastName
  //                   })

                
  //               }
  //               else{
  //                   console.log("something went wrong...")
  //               }

  //               const snapshot = await getDocs(listRef);

  //               if(snapshot){
  //                   const list = snapshot.docs.map(doc => {
  //                       const docData = doc.data();
  //                       const convertedData = {
  //                           id:doc.id,
  //                           ...doc.data(),
  //                           taken_date:new Date(docData.taken_date)
  //                       }
  //                       return convertedData;
                       
  //                       });

  //                       setUserList([...list].sort((a,b)=>a.taken_date - b.taken_date))
  //                       setIsLoading(false)
  //     }
  //     else{
  //       console.log("no user present")
  //     }
  //   }
  //   else{
  //     setIsLoading(false)
  //     // window.location.href = "/login"
  //   }
  //   })

  //   return unsubscribeAuth;
  // },[])

 return (
    <>
   
   
      
    <RouterProvider router = {router}>
         
    </RouterProvider>
  
   
   
    
      
    </>
  )
}

export default App
