import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
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
    

    const {setUser,setUserList} = useContext(userListContext);
    const navigate = useNavigate()
    

    

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
       
        try {
            await signInWithEmailAndPassword(auth,email,password);
            
            
            auth.onAuthStateChanged(async (user)=>{
                console.log(user)
                // for retrieving user data
                const docRef = doc(db,"Users",user.uid);
                // reference for retrieving the subcollection list
                const listRef = collection(db,"Users",auth.currentUser.uid,"list");

                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    
                    const {email,firstName,lastName} = docSnap.data();
                    setUser({
                        email,
                        firstName,
                        lastName
                    })

                
                }
                else{
                    console.log("something went wrong...")
                }

                const snapshot = await getDocs(listRef);

                if(snapshot){
                    const list = snapshot.docs.map(doc => {
                        const docData = doc.data();
                        const convertedData = {
                            id:doc.id,
                            ...doc.data(),
                            taken_date:new Date(docData.taken_date)
                        }
                        return convertedData;
                       
                        });

                        



                        
        
                        setUserList([...list].sort((a,b)=>a.taken_date - b.taken_date))
                }

               
                
               

                
            })

            toast.success("Login successful");
            navigate("/dashboard")
            
            
            
            console.log("login successfull...")
        } catch (error) {
            toast.error(error.message);
        }
        
    }


    // redirecting user to dashboard if already signedIn
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                navigate("/dashboard")
            }
        })
    },[])



  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <form onSubmit={handleLoginSubmit} className=' bg-[#555555] px-16 py-8 rounded-md shadow-md shadow-gray-400'>
            <div className='text-5xl flex items-center justify-center text-white'>
            <CgProfile />
            </div>
            <div className='mt-8'>
                <label htmlFor="email" className='font-semibold text-white'>email</label>
                <input type="text" className='block border-none outline-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}

                />
            </div>
            <div className='mt-3'>
                <label htmlFor="password" className='font-semibold text-white'>Password</label>
                <input type="password" className='block border-none outline-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className='mt-8 mb-4'>
              <button type='submit' className=' w-full py-2 font-semibold tracking-wider rounded-md text-white bg-[#282928]'>Login</button>
            </div>
            <div>
               <Link to="/register">
               <span className='text-white tracking-wide underline'>signup</span>
               </Link>
            </div>
        </form>

        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
       
       
    </div>
  )
}

export default Login