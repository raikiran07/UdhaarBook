import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import {auth,db} from '../firebaseConnection/connection'
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    const {doc,setDoc,collection,addDoc} = useContext(userListContext)
    const navigate = new useNavigate()
  

    const [email,setemail] = useState("")
    const [password,setPassword] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")



    const handleRegisterSubmit = async(e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log(user)
            
            if(user){
                await setDoc(doc(db,"Users",user.uid),{
                    email:user.email,
                    firstName:firstName,
                    lastName:lastName,
                })

                  // Create a subcollection 'tasks' under the user's document
                // await db.collection('Users').doc(uid).collection('list')
                const userRef = doc(db,"Users",user.uid);
                 // Use addDoc to create a subcollection named 'tasks' under the user's document

                const taskCollectionRef = collection(userRef, 'list');
               

                console.log('Subcollection created successfully');

                
                navigate("/login")
            }
            console.log("registered successfully and list created...")
        } catch (error) {
            console.log(error.message)
        }
       
        
    }



  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <form onSubmit={handleRegisterSubmit} className=' bg-[#555555] px-16 py-8 rounded-md shadow-md shadow-gray-400'>
            <div className='text-5xl flex items-center justify-center text-white'>
            <CgProfile />
            </div>
            <div className='mt-8'>
                <label htmlFor="firstname" className='font-semibold text-white'>First Name</label>
                <input type="text" className='block border-none outline-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="firstname"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}

                />
            </div>
            <div className='mt-4'>
                <label htmlFor="lastname" className='font-semibold text-white'>Last Name</label>
                <input type="text" className='block border-none outline-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="lastname"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}

                />
            </div>
            <div className='mt-4'>
                <label htmlFor="email" className='font-semibold text-white'>email</label>
                <input type="email" className='block border-none outline-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="email"
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
              <button type='submit' className='w-full py-2 font-semibold tracking-wider rounded-md text-white bg-[#282928]'>Register</button>
            </div>

            <p>
                <Link to="/login">
                <span className='text-white tracking-wider underline'>signin</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default Register