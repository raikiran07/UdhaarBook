import React, { useEffect, useContext } from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import {list} from '../data/data'
import { userListContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection } from 'firebase/firestore';
import {db,auth} from '../firebaseConnection/connection'
import { deleteDoc,doc } from 'firebase/firestore';


const Table = ({search}) => {

   const {userList,setUserList,setIsAddBox,isLoading,setEditId,setIsLoading,isAddBox} = useContext(userListContext)

   console.log(userList)
   

   const convertDateIntoReadable = (dateString) => {
    console.log(dateString)
    // Parse pe date string into a Date object
            const date = new Date(dateString);

            // Define options for toLocaleDateString to get pe desired format
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            // Format pe date
            const formattedDate = date.toLocaleDateString('en-US', options);
            console.log(formattedDate)
            return formattedDate;
}


// handle delete functionality
const handleDelete = async(id) => {
    try {
      const isConfirm = confirm("Do you want to delete?");
      if(isConfirm){
        
        const listDocRef = collection(db,"Users",auth.currentUser.uid,"list");
        await deleteDoc(doc(listDocRef, id));
        setUserList(userList.filter(item => item.id !== id));
      }
      
    } catch (error) {
        console.log("error in deleting item" + error)
    }
    
}

// handle edit functionality 
const handleEdit = async(id) => {
    console.log(id);
    setEditId(id);
    setIsAddBox(true)
}

useEffect(()=>{

},[userList])




    
  return (
     
    <section className='mt-8 p-8 rounded-md bg-[#1d1d1d] thinShadow text-sm h-[450px] overflow-y-auto'>
   
       
            <div className='table-container h-full'>
               
                <div className={`table-head grid grid-cols-7 bg-[#2b2b2b] rounded-md text-white ${isAddBox ? "" : "sticky top-0"}`}>
                <p className='px-6 py-3'>Name</p>
                <p className='px-6 py-3'>Transaction Type</p>
                <p className='px-6 py-3'>Taken Date</p>
                <p className='px-6 py-3'>Amount</p>
                <p className='px-6 py-3'>Return Date</p>
                <p className='px-6 py-3'>Status</p>
                <p className='px-6 py-3'>Action</p>
                </div>

                <div className="table-body">

                {
                isLoading ? <p className='p-2 text-md text-white'>fetching data...</p> : (
                    
                        !userList?.length > 0 ? (
                         
                                <p className='text-gray-200 pt-2'>No data available to show</p>
                           
                        ) : 

                        <ol className='list-decimal'>
                        
                        
                            {
        
                            userList?.filter(user=>user?.name?.toLowerCase()?.includes(search) || user?.transaction_type?.toLowerCase()?.includes(search) || user?.status?.toLowerCase()?.includes(search))?.map(user=>{
                                return(
                                    <li className="border-b-[1px] border-gray-600 tracking-wider  grid grid-cols-7 font-light" key={user.id}>
                                    <p  className="px-6 py-4 font-medium text-white">{user.name}</p>
                                    <p  className="px-6 py-4 font-medium text-white">{user.transaction_type}</p>
                                    <p  className="px-6 py-4 font-medium text-white">{`${convertDateIntoReadable(user.taken_date)}`}</p>
                                    <p  className={`px-6 py-4 font-medium  ${user.transaction_type=="udhaar" ? "text-[#68bc44]" : "text-[#f5072b]"}`}>{user.amount}</p>
                                    <p  className="px-6 py-4 font-medium text-white">{
                                        `${convertDateIntoReadable(user.return_date) ? "NA" : convertDateIntoReadable(user.return_date) }`
                                    }</p>
                                    <p  className="px-6 py-4 font-medium text-white">{user.status}</p>
                                    <p  className="px-6 py-4 font-medium text-white flex items-center gap-4">
                                        <button className='border p-2 text-xl hover:bg-blue-800 hover:text-white'
                                        onClick={()=>handleEdit(user.id)}
                                        >
                                        <RiEdit2Fill />
                    
                                        </button>
                                        <button className='border p-2 text-xl hover:bg-red-800'
                                        onClick={()=>handleDelete(user.id)}
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
    <ToastContainer />

</section>
  )
}

export default Table