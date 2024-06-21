import React from 'react'
import { createContext } from 'react'
import {useState } from 'react'
import { db } from "../firebaseConnection/connection";
import {
  collection,

} from "firebase/firestore";





export const userListContext = createContext()

const userCollectionRef = collection(db,"list")





const ContextProvider = ({children}) => {
 

  const [userList,setUserList] = useState([])
  const [isAddBox,setIsAddBox] = useState(false);
  const [currentUser,setUser] = useState({})
  const [isLoading,setIsLoading] = useState(true)
  const [editId,setEditId] = useState(null)
  const [isSignIn,setIsSignIn] = useState(false)
  const [navActive,setNavActive] = useState("dashboard")



 





 
  return (
   <userListContext.Provider value={{userList,setUserList,isAddBox,setIsAddBox,userCollectionRef,currentUser,setUser,collection,isLoading,setIsLoading,editId,setEditId,isSignIn,setIsSignIn,navActive,setNavActive}}>
    {children}
   </userListContext.Provider>
  )
}

export default ContextProvider