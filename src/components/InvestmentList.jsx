import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { deleteDoc,collection,doc } from 'firebase/firestore';
import { db,auth } from '../firebaseConnection/connection';
import { toast } from 'react-toastify';

const InvestmentList = ({investmentList,setInvestmentList,isLoading,setIsLoading,search,fetchInvestmentList,addInvestment}) => {

    
   const convertDateIntoReadable = (dateString) => {
  
    // Parse pe date string into a Date object
            const date = new Date(dateString);

            // Define options for toLocaleDateString to get pe desired format
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            // Format pe date
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            return formattedDate;
    }


const handleDelete = async (id) => {
    
    try {
        const isConfirm = confirm("Do you want to delete?");
        if(isConfirm){
          
          const listDocRef = collection(db,"Users",auth.currentUser.uid,"investments");
          await deleteDoc(doc(listDocRef, id));
          setInvestmentList(investmentList.filter(item => item.id !== id));
          fetchInvestmentList()
          
        }
        
      } catch (error) {
          toast.error("something went wrong")
      }
}


 
  
  return (
    <section className='mt-4  rounded-md bg-[#1d1d1d] thinShadow text-[12px] h-[450px] overflow-y-auto'>
   
       
    <div className='table-container h-full'>
       
    <div className={`${addInvestment ? "" : "sticky top-0"} p-2 md:p-4  z-10 bg-[#1d1d1d]`}>
    <div className={`table-head grid grid-cols-5 bg-[#2b2b2b] rounded-md text-white place-items-center md:place-items-start`}>
        <p className='px-6 py-3'>Name</p>
        <p className='px-6 py-3'>Type</p>
        <p className='px-6 py-3'>Date</p>
        <p className='px-6 py-3'>Amount</p>
        <p className='px-6 py-3'>Action</p>
        </div>
    </div>
        

        <div className="table-body px-2 md:px-4">

        {
        isLoading ? <p className='p-2 text-md text-white'>fetching data...</p> : (
            
                !investmentList?.length > 0 ? (
                 
                        <p className='text-gray-200 pt-2'>No data available to show</p>
                   
                ) : 

                <ol className='list-decimal'>
                
                
                    {

                  investmentList?.map(investment=>{
                        return(
                            <li className="border-b-[1px] border-gray-600 tracking-wider  grid grid-cols-5 font-light text-xs place-items-center md:place-items-start" key={investment.id}>
                            <p  className="px-6 py-4 font-medium text-white">{investment.name}</p>
                            <p  className="px-6 py-4 font-medium text-white">{investment.investment_type}</p>
                            <p  className="px-6 py-4 font-medium text-white">{`${convertDateIntoReadable(investment.date)}`}</p>
                            <p  className={`px-6 py-4 font-medium`}>Rs {investment.amount}</p>
                           
                            <p  className="px-6 py-4 text-white flex items-center gap-4">
                              
                                <button className='border p-2 text-sm hover:bg-red-800'
                                onClick={()=>handleDelete(investment.id)}
                                >
                                <MdDelete />
            
                                </button>
                            
                            
                            </p>
                        </li>
                        )
                    })
                }
                    
                
                </ol>
            
        )
    }

        </div>

    </div>
    
    


 
   
   
   

<div/>


</section>
  )
}

export default InvestmentList