import React, { useContext } from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { userListContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection } from 'firebase/firestore';
import {db,auth} from '../firebaseConnection/connection'
import { deleteDoc,doc } from 'firebase/firestore';



const Table = ({search}) => {

   const {userList,setUserList,setIsAddBox,isLoading,setEditId,setIsLoading,isAddBox} = useContext(userListContext)


   

   const convertDateIntoReadable = (dateString) => {
   
    if(dateString){
      // Parse pe date string into a Date object
      const date = new Date(dateString);

      // Define options for toLocaleDateString to get pe desired format
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      // Format pe date
      const formattedDate = date.toLocaleDateString('en-US', options);
     
      // console.log(formattedDate)
      return formattedDate;
    }

    return "Not Mentioned"
   
    
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
      toast.error(error.message);
    }
    
}

// handle edit functionality 
const handleEdit = async(id) => {
   
    setEditId(id);
    setIsAddBox(true)
}







    
  return (
     
    <section className='mt-4 rounded-md bg-[#1d1d1d] thinShadow text-[12px] h-[450px] overflow-y-auto'>
   
       
            <div className='table-container h-full'>
               <div className={`${isAddBox ? "" : "sticky top-0"} p-2 md:p-4  z-10 bg-[#1d1d1d]`}>
               <div className={`table-head grid grid-cols-5 md:grid-cols-7 bg-[#2b2b2b] rounded-md text-white ${isAddBox ? "" : "sticky top-0"}`}>
                <p className='px-6 py-3'>Name</p>
                <p className='px-6 py-3'>Transaction Type</p>
                <p className='px-6 py-3 hidden md:block'>Taken Date</p>
                <p className='px-6 py-3'>Amount</p>
                <p className='px-6 py-3'>Return Date</p>
                <p className='px-6 py-3 hidden md:block'>Status</p>
                <p className='px-6 py-3'>Action</p>
                </div>
               </div>
                

                <div className="table-body px-2 md:px-4">

                {
                isLoading ? <p className='p-2 text-md text-white'>fetching data...</p> : (
                    
                        !userList?.length > 0 ? (
                         
                                <p className='text-gray-200 pt-2'>No data available to show</p>
                           
                        ) : 

                        <ol className='list-decimal'>
                        
                        
                            {
        
                            userList?.filter(user=>user?.name?.toLowerCase()?.includes(search) || user?.transaction_type?.toLowerCase()?.includes(search) || user?.status?.toLowerCase()?.includes(search))?.map(user=>{
                                return(
                                    <li className="border-b-[1px] border-gray-600 tracking-wider  grid grid-cols-5 md:grid-cols-7 font-light" key={user.id}>
                                    <p  className="px-6 py-4 font-medium text-white">{user.name}</p>
                                    <p  className="px-6 py-4 font-medium text-white">{user.transaction_type}</p>
                                    <p  className="px-6 py-4 font-medium text-white">{`${convertDateIntoReadable(user.taken_date)}`}</p>
                                    <p  className={`px-6 py-4 font-medium  ${user.transaction_type=="udhaar" ? "text-[#68bc44]" : "text-[#f5072b]"}`}>Rs {user.amount}</p>
                                    <p  className="px-6 py-4 font-medium text-white hidden md:block">{
                                        `${convertDateIntoReadable(user.return_date) ? convertDateIntoReadable(user.return_date) : "Not Mentioned" }`
                                    }</p>
                                    <p  className="px-6 py-4 font-medium text-white hidden md:block">{user.status}</p>
                                    <p  className="px-6 py-4   text-white flex flex-col  md:flex-row items-center gap-2 md:gap-4">
                                        <button className='border p-2 text-sm hover:bg-blue-800 hover:text-white'
                                        onClick={()=>handleEdit(user.id)}
                                        >
                                        <RiEdit2Fill />
                    
                                        </button>
                                        <button className='border p-2 text-sm hover:bg-red-800'
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