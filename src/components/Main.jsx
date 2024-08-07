import React, { useEffect } from 'react'
import { IoAdd } from "react-icons/io5";

import { useState } from 'react';
import AddUdaarDept from './AddUdaarDept';
import Table from './Table';
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { doc,collection,getDoc,getDocs } from 'firebase/firestore';
import { db } from '../firebaseConnection/connection';
import { saveAs } from 'file-saver';
import { exportToExcel } from 'react-json-to-excel';
import { toast } from 'react-toastify';



const Main = () => {

  
    const {userList,setUserList,isAddBox,setIsAddBox,isLoading,setIsLoading,setUser} = useContext(userListContext)
    const [search,setSearch] = useState("")
    const [searchData,setSearchData] = useState([])
    
    
    const totalUdhaarList = userList?.filter(user=>user.transaction_type=="udhaar")
    const totalUdhaar = totalUdhaarList?.reduce((total,user)=>Number(total) + Number(user?.amount), 0);

    const totalDebtList = userList?.filter(user=>user?.transaction_type=="debt")
    const totalDebt = totalDebtList?.reduce((total,user)=>Number(total) + Number(user?.amount),0);


    const fetchData = async () => {
        try {
               // for retrieving user data
               const userId = localStorage.getItem("uid")
               const docRef = doc(db,"Users",userId);
               // reference for retrieving the subcollection list
               const listRef = collection(db,"Users",userId,"list");

               const docSnap = await getDoc(docRef);
              
               if(docSnap.exists()){
                   
                   const {email,firstName,lastName,profileUrl} = docSnap.data();
                   setUser({
                       email,
                       firstName,
                       lastName,
                       profileUrl:profileUrl
                   })

               
               }
               else{
                   toast.error("something went wrong")
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

               setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        setSearchData(userList)
        fetchData()
        return ()=>{

        };

    },[])

    // download table in excel format
    const handleDownload = () => {
        if(userList.length > 0){
            const data = userList.map(({id,...rest})=>rest);
            exportToExcel(data,"udhaarlist");
        }
        else{
            toast.info("Nothing to export!");
        }
        
    }


    // handle search functionality
    // const handleSearch = (searchValue) => {
    //     setSearch(searchValue);
    //     const searchResult = userList.filter(user=>user?.name?.toLowerCase()?.includes(search) || user?.transaction_type?.toLowerCase()?.includes(search) || user?.status?.toLowerCase()?.includes(search))
    //     setSearchData(searchResult)
    // }

   



  return (
    <aside className={`min-w-[85%] relative px-8  bg-[#141414] overflow-y-auto ${isAddBox ? "pseudoClass": ""}`}>
        <main>
            <section className='md:flex md:items-center md:mt-8 mt-4  gap-5'>
                <div className={`card flex items-center justify-between min-h-[100px] p-2 gap-5 min-w-[250px] bg-[#1d1d1d] rounded-md text-white thinShadow ${isAddBox ? "" : "relative"}`}>
                  
                    <FaArrowDown className={`absolute top-2 right-2 border border-gray-500 p-1 rounded-sm text-xl bg-[#3e3e3e] text-[#68bc44] ${isAddBox ? "hidden" : ""}`} />
                    

                    <p className='text-sm'>
                        Total amount <br/> to receive
                    </p>
                    <p className='text-2xl font-semibold'>
                        {
                            isLoading ? "Loading.." :  "Rs " + totalUdhaar
                        }
                        
                    </p>

                </div>

                <div className={`card mt-6 md:mt-0  flex items-center justify-between min-h-[100px] p-2 gap-5 min-w-[250px] bg-[#1d1d1d] rounded-md text-white thinShadow  ${isAddBox ? "" : "relative"}`}>
                <FaArrowUp className={`absolute top-2 right-2 border border-gray-500 p-1 rounded-sm text-xl bg-[#3e3e3e] text-[#f5072b] ${isAddBox ? "hidden" : ""}`} />
                    <p className='text-sm'>
                        Total amount <br/> to give
                    </p>
                    <p className='text-2xl font-semibold'>
                    {
                            isLoading ? "Loading.." :  "Rs " + totalDebt
                    }
                    </p>

                </div>
               
            </section>

            <div className="search-bar md:flex items-center mt-8 justify-between">

            <button className='border flex items-center p-2 gap-2 rounded-md bg-[#242424] text-white hover:bg-[#0f0f0f] hover:text-white' onClick={()=>setIsAddBox(true)}>
                <IoAdd className='text-xl text-white' />
                <p>Add</p>

                </button>

            <div className='mt-4 md:mt-0'>
                <input type="text" className='p-2 min-w-full md:min-w-[250px] rounded-sm outline-none bg-[#2b2b2b] text-white font-light' placeholder='type...' value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>

            </div>

           
               <div className='text-right'>
                <button className='text-white bg-blue-800 px-2 py-1 cursor-pointer rounded-md mt-4'
                onClick={handleDownload}
                >download excel</button>
               </div>

                {/* list */}
                <Table search={search} />

              
           
        </main>

        {
            isAddBox && (
                <div className='fixed top-[50%] left-[50%] translate-x-[-30%]'>
                    <AddUdaarDept fetchData={fetchData} />
                </div>
                
            )
        }

      
    </aside>
  )
}

export default Main