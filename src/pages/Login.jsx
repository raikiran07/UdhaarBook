import {signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState,useEffect } from 'react'
import { CgProfile } from "react-icons/cg";
import {auth,db} from '../firebaseConnection/connection'
import { collection, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDocs,doc } from 'firebase/firestore';

const Login = () => {

    const [email,setemail] = useState("")
    const [password,setPassword] = useState("")
    

    const {setIsSignIn,isSignIn} = useContext(userListContext);
    const navigate = useNavigate()
    

    

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
       
        try {
            await signInWithEmailAndPassword(auth,email,password);
            
            
            // Immediately set the user sign-in state and store UID
            setIsSignIn(true);
            const user = auth.currentUser;
            console.log(user)
            if (user) {
                localStorage.setItem("uid", user.uid);
            }

            toast.success("login successful")
            
            // setTimeout(()=>{
            //   navigate("/dashboard")
            // },5000)
            navigate("/dashboard")
        
          
        } catch (error) {
          const err = error.message.slice(22,-2)
           toast.error(err)
        }
        
    }


    // redirecting user to dashboard if already signedIn
    useEffect(()=>{
       
      if(localStorage.getItem("uid")){
        setIsSignIn(true)
        navigate("/dashboard")
      }
     
    },[])



  return (
    <div className='w-full h-[100vh] flex items-center justify-center bg-[#0f0f0f]'>
        <form onSubmit={handleLoginSubmit} className=' bg-[#141414]  px-16 py-8 rounded-md thinShadow '>
            <div className='text-5xl flex items-center justify-center text-white'>
            <CgProfile />
            </div>
            <div className='mt-8'>
                <label htmlFor="email" className='font-semibold text-white'>email</label>
                <input type="text" className='block border-none outline-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                required

                />
            </div>
            <div className='mt-3'>
                <label htmlFor="password" className='font-semibold text-white'>Password</label>
                <input type="password" className='block border-none outline-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
            </div>
            <div className='mt-8 mb-4'>
              <button type='submit' className=' w-full py-2 font-semibold tracking-wider rounded-md text-white bg-[#282928]'>Login</button>
            </div>
            <div className='text-[0.8rem] flex items-end justify-between'>
              <Link to="/forgotpassword">
              <span className='text-white tracking-wide underline'>Forgot Password</span>
              </Link>
               <Link to="/register">
               <span className='text-white tracking-wide underline'>signup</span>
               </Link>

            </div>
        </form>

        <ToastContainer
        autoClose={2000}
         />
       
       
       
    </div>
  )
}

export default Login