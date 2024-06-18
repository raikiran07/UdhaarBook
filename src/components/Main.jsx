import React from 'react'
import { IoAdd } from "react-icons/io5";

import { useState } from 'react';
import AddUdaarDept from './AddUdaarDept';
import Table from './Table';
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";


const Main = () => {

  
    const {userList,setUserList,isAddBox,setIsAddBox,isLoading} = useContext(userListContext)
    const [search,setSearch] = useState("")
    console.log(userList)
    
    const totalUdhaarList = userList?.filter(user=>user.transaction_type=="udhaar")
    const totalUdhaar = totalUdhaarList?.reduce((total,user)=>Number(total) + Number(user?.amount), 0);

    const totalDebtList = userList?.filter(user=>user?.transaction_type=="debt")
    const totalDebt = totalDebtList?.reduce((total,user)=>Number(total) + Number(user?.amount),0);

    
   


    

   

    
    


  return (
    <aside className={`min-w-[85%] relative px-8 ${isAddBox ? "pseudoClass" : ""} bg-[#141414] overflow-y-auto`}>
        <main>
            <section className='flex items-center mt-8  gap-5'>
                <div className='card flex items-center justify-between min-h-[100px] p-2 gap-5 min-w-[250px] bg-[#1d1d1d] rounded-md text-white thinShadow relative'>
                  
                    <FaArrowDown className='absolute top-2 right-2 border border-gray-500 p-1 rounded-sm text-xl bg-[#3e3e3e] text-[#68bc44]' />
                    

                    <p className='text-sm'>
                        Total amount <br/> to receive
                    </p>
                    <p className='text-2xl font-semibold'>
                        {
                            isLoading ? "Loading.." :  "Rs " + totalUdhaar
                        }
                        
                    </p>

                </div>

                <div className='card  flex items-center justify-between min-h-[100px] p-2 gap-5 min-w-[250px] bg-[#1d1d1d] rounded-md text-white thinShadow relative'>
                <FaArrowUp className='absolute top-2 right-2 border border-gray-500 p-1 rounded-sm text-xl bg-[#3e3e3e] text-[#f5072b]' />
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

            <div className="search-bar flex items-center mt-8 justify-between">

            <button className='border flex items-center p-2 gap-2 rounded-md bg-[#242424] text-white hover:bg-[#0f0f0f] hover:text-white' onClick={()=>setIsAddBox(true)}>
                <IoAdd className='text-xl text-white' />
                <p>Add</p>

                </button>

            <div>
                <input type="text" className='p-2 min-w-[250px] rounded-sm outline-none bg-[#2b2b2b] text-white font-light' placeholder='type...' value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>

            </div>

           
               

                {/* list */}
                <Table search={search} />

              
           
        </main>

        {
            isAddBox && (
                <div className='z-100 fixed top-[50%] left-[50%] translate-x-[-30%]'>
                    <AddUdaarDept />
                </div>
                
            )
        }

      
    </aside>
  )
}

export default Main