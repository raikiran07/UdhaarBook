import React, { useEffect } from 'react'
import { useContext } from 'react'
import { userListContext } from '../context/ContextProvider'
import { useState } from 'react'
import { collection } from 'firebase/firestore'
import {db,auth} from '../firebaseConnection/connection'
import { getDoc,updateDoc,addDoc,getDocs,doc,setDoc} from 'firebase/firestore'
import { update } from 'firebase/database'




// input form for adding udhaar and dept

const AddUdaarDept = ({fetchData}) => {

    const {userList,setUserList,setIsAddBox,isAddBox,userCollectionRef,editId,setEditId} = useContext(userListContext)


    const [userDetails,setUserDetails] = useState({

        name:"",
        transaction_type:"udhaar",
        taken_date:"",
        amount:null,
        return_date:"",
        status:"Pending"
    })

 

   const editOn =  () => {
    if(editId){
        const [editData] = userList.filter(user=>user.id==editId);
        const takenDate = convertDate(editData.taken_date)
        console.log(takenDate)
        console.log(editData)
        setUserDetails({
            ...editData,
            taken_date:takenDate
        })
    }
       
       
  
   }

   function convertDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Add leading 0 for single-digit months
    const day = String(dateObject.getDate()).padStart(2, '0'); // Add leading 0 for single-digit days
  
    return `${year}-${month}-${day}`;
  }

    useEffect(()=>{
        editOn();
    },[])



    

 // Function to update user details
 const updateUserDetails = (e,key) => {
    setUserDetails(prevState => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };


//   function to add new userDetails
const handleAddDetails = async (e) => {
    e.preventDefault();
    // userList.push(userDetails)
    
   

    try {
        if(editId){
            // working here
            const docRef = doc(collection(db,"Users",auth.currentUser.uid,"list"),editId);
            await setDoc(docRef,userDetails);
            alert(`${userDetails.transaction_type} is saved successfully`);
            // setUserList(prevData=>prevData.map(item=>(item.id==editId ? {...item,...userDetails} : item)))
            fetchData();

            setEditId(null);
            
        }
        else{
            const listRef = collection(db,"Users",auth.currentUser.uid,"list");
            const addItem = await addDoc(listRef, userDetails);
            // setUserList([...userList, { id: addItem.id, ...userDetails }]);
            fetchData()
        }
        
       
        setIsAddBox(false)
       
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    
   
}

const handleCancel = () => {
    setEditId(null);
    setIsAddBox(false)
}



  return (
     
      <div className="model">
      <form onSubmit={handleAddDetails} className='addBox grid grid-cols-1 md:grid-cols-2 min-w-[300px] md:min-w-fit border mx-auto p-4 border-gray-500 gap-6 rounded-md bg-opacity-100 bg-[#1f1f1f] text-white  font-light z-50 mt-[-18rem] ml-[-5rem]  '>
       
          <div className='flex flex-col md:flex-row'>
          <label htmlFor="name" className='mr-1 font-semibold'>
              Name
          </label>
          <input type="text" id='name' name="name" className='border rounded-md border-gray-500 p-[3px] outline-none text-gray-300 bg-[#2a2929]  ' value={userDetails.name} onChange={(e)=>updateUserDetails(e,"name")}
          required
           />
          </div>

          <div className='flex flex-col md:flex-row'>
              <label htmlFor="transaction-type" className='mr-1 font-semibold'>Transaction Type</label>
              <select name="type" id="transaction-type" className='border border-gray-400 rounded-md p-[3px]  outline-none text-gray-300 bg-[#2a2929]'
              value={userDetails.transaction_type} onChange={(e)=>updateUserDetails(e,"transaction_type")}
              required
              >
                  <option value="udhaar" name="type">udhaar</option>
                  <option value="debt" name="type">debt</option>
              </select>
          </div>
          
          

          <div className='flex flex-col md:flex-row'>
              <label htmlFor="taken-date" className='mr-1 font-semibold'>Taken date</label>
              <input type="date" id="taken-date" className='border border-gray-400 rounded-md p-[3px] outline-none  bg-[#2a2929] text-gray-300'
              value={userDetails.taken_date} onChange={(e)=>updateUserDetails(e,"taken_date")}
              required
               />
          </div>

          <div className='flex flex-col md:flex-row'>
              <label htmlFor="amount" className='mr-1 font-semibold'>Amount</label>
              <input type="number" id="amount" className='border border-gray-400 rounded-md p-[3px] outline-none text-gray-300 bg-[#2a2929]' 
              value={userDetails.amount} onChange={(e)=>updateUserDetails(e,"amount")}
              required
              />
          </div>

          <div className='flex flex-col md:flex-row'>
              <label htmlFor="return-date" className='mr-1 font-semibold'>
                 Return Date
              </label>
              <input type="date" id="return-date" className='border border-gray-400 rounded-md p-[3px] outline-none text-gray-300 bg-[#2a2929]'
              value={userDetails.return_date} onChange={(e)=>updateUserDetails(e,"return_date")} 
              
              />
          </div>
          <div className='flex flex-col md:flex-row'>
              <label htmlFor="status" className='mr-2 font-semibold'>
                  Status
              </label>
                  <select name="status" id="status" className='border border-gray-400 rounded-md p-[3px] outline-none text-gray-300 bg-[#2a2929]'
                  value={userDetails.status} onChange={(e)=>updateUserDetails(e,"status")}
                  required
                  >
                      <option value="Pending" name="status">Pending</option>
                      <option value="completed" name="status">Completed</option>
                  </select>
              
          </div>

          <div className='flex items-center gap-3'>
              <button className='border py-1 px-2 bg-blue-600 text-white tracking-wider rounded-md' type="submit">Submit</button>
              <button className='border py-1 px-2 bg-red-600 text-white tracking-wider rounded-md' onClick={()=>handleCancel()}>Cancel</button>
          </div>

        
             
        
          
      </form>
      
  </div>
  )
}

export default AddUdaarDept