import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import {auth,db,storage} from '../firebaseConnection/connection'
import { useContext,useRef } from 'react';
import { userListContext } from '../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { doc,setDoc,collection,addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosAddCircle } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import MaleProfile from '../assets/male-profile.png'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Register = () => {

   
    const navigate = new useNavigate()
    const imgRef = useRef(null)

    const [email,setemail] = useState("")
    const [password,setPassword] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [profileUrl,setProfileUrl] = useState(MaleProfile)
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrl,setImageUrl] = useState("")

   let downloadUrl = "";


    const handleRegisterSubmit = async(e) => {
        e.preventDefault();
        setIsUploading(true)
        try {
            if(!selectedImage){
                return alert("please upload profile image");
            }

            setIsUploading(true);
            setError(null);

            await createUserWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            const storageRef = ref(storage, `images/${selectedImage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedImage);

            const selectedType = ["image/png", "image/jpg", "image/jpeg"];
            const fileSize = 1048576;

            if (selectedImage && selectedType.includes(selectedImage.type) && selectedImage.size <= fileSize){

                setError(false)
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                      // Update UI with progress if needed
                    },
                    (error) => {
                      setError(error);
                      console.error(error);
                    },
                    async () => {
                      downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                      setImageUrl(downloadUrl)
                      console.log(downloadUrl)
                      
                      
            
                      // Save the download URL to Firestore
                    //   const imageRef = collection(firestore, 'images'); // Adjust collection name as needed
                    //   await addDoc(imageRef, { url: downloadUrl });
            
                      setIsUploading(false);
                      console.log('Image uploaded successfully!');
                      if(user){
                        await setDoc(doc(db,"Users",user.uid),{
                            email:user.email,
                            firstName:firstName,
                            lastName:lastName,
                            profileUrl:downloadUrl
                        })
        
                          // Create a subcollection 'tasks' under the user's document
                        // await db.collection('Users').doc(uid).collection('list')
                        const userRef = doc(db,"Users",user.uid);
                         // Use addDoc to create a subcollection named 'tasks' under the user's document
        
                        const taskCollectionRef = collection(userRef, 'list');
                        const investmentList = collection(userRef,"investments")
        
                       
                        toast.success("registration successful")
        
                        setTimeout(()=>{
                            navigate("/login")
                        },3000)
                        
                      
                    }
                    }
                  );

            }

           
            
           
           
        } catch (error) {
            console.log(error.message)
        }
       
        
    }

    const handleUpload = () => {
        imgRef.current.click();
    }

    const uploadImageDisplay = async() => {
        const uploadedFile = imgRef.current.files[0];
        setSelectedImage(uploadedFile)
        const cachedURL = URL.createObjectURL(uploadedFile);
        setProfileUrl(cachedURL);
    }



  return (
    <div className='text-xs md:text-base'>
    <nav className='px-4 py-3 flex items-center justify-between md:px-16 md:py-8 bg-[#0f0f0f] fixed w-full top-0 left-0'>
      <div className='relative'>
       <h2 className='text-[1.3rem] md:text-[2rem] text-[#ffbd59] font-consert'>udhaarbook.</h2>
      </div>
      <div className='flex items-center justify-center gap-2 md:gap-4'>
      <button className=' px-2 py-1 text-white rounded-md bg-[#0f0f0f] thinShadow'
      onClick={()=>navigate(-1)}
      >
          Back
        </button>
        <Link to="/">
        <button className='bg-orange-600 px-2 py-1 text-white rounded-md'>Landing</button>
        </Link>
        
        
      </div>
      </nav>
    
    <div className='w-full h-[100vh] flex items-center justify-center bg-[#0f0f0f]'>
        <form onSubmit={handleRegisterSubmit} className=' bg-[#141414] px-16 py-8 rounded-md thinShadow mt-[2rem]'>
        <h3 className='text-[1.5rem] text-white text-center mb-6'>New User</h3>
        <div className='relative max-w-fit mx-auto'>

        
            <div className='flex items-center justify-center text-white p-1 w-12 h-12 mx-auto rounded-full bg-gray-100 cursor-pointer overflow-hidden'>
        
             <input type="file" 
             id="file"
             ref={imgRef} 
             onChange={uploadImageDisplay}
             hidden />
             
            
             <img src={profileUrl} alt="" className='w-[100%] h-[100%] object-cover scale-110' />

             

            </div>
            {/* <IoIosAddCircle className='z-30 text-xl text-white absolute bottom-0 right-[-5px]' /> */}
            <button className='flex items-center justify-center mt-2 text-xs p-1 gap-2 rounded-md bg-blue-600 text-white'
            onClick={handleUpload}
            >
            <FiUpload /> upload
            </button>
            </div>
            <div className='mt-8'>
                <label htmlFor="firstname" className='font-semibold text-white'>First Name</label>
                <input type="text" className='block border-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="firstname"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                required
                />
            </div>
            <div className='mt-4'>
                <label htmlFor="lastname" className='font-semibold text-white'>Last Name</label>
                <input type="text" className='block border-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="lastname"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                required
                />
            </div>
            <div className='mt-4'>
                <label htmlFor="email" className='font-semibold text-white'>email</label>
                <input type="email" className='block border-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                required
                />
            </div>
            <div className='mt-3'>
                <label htmlFor="password" className='font-semibold text-white'>Password</label>
                <input type="password" className='block border-none px-2 py-2 rounded-sm text-sm   text-gray-600 min-w-[250px] bg-gray-300' id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
            </div>
            <div className='mt-8 mb-4'>
              <button type='submit' className='w-full py-2 font-semibold tracking-wider rounded-md text-white bg-blue-600'>Register</button>
            </div>

            <p>
                <Link to="/login">
                <span className='text-white tracking-wider underline'>signin</span>
                </Link>
            </p>
        </form>

        {/* toastify message */}
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
    </div>
  )
}

export default Register