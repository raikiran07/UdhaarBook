import React, { useEffect, useState } from 'react'
import { db,auth } from '../firebaseConnection/connection';
import { collection,addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AddInvestment = ({setAddInvestment,setInvestmentList,fetchInvestmentList}) => {
    const [investmentDetails,setInvestmentDetails] = useState({
        name:"",
        investment_type:"Mutual Fund",
        amount:"",
        date:""

    })

    


const updateInvestmentDetails = (e,key) => {
   
    setInvestmentDetails(prevState => ({
        ...prevState,
        [key]: e.target.value,
      }));

   
    };


const handleAddInvestment = async (e) => {
    e.preventDefault();
    try {
        const listRef = collection(db,"Users",auth.currentUser.uid,"investments");
        await addDoc(listRef, investmentDetails);
        setInvestmentList(prev=>[...prev,investmentDetails])
        toast.success("investment added successfully")
        setAddInvestment(false)
        fetchInvestmentList()
    } catch (error) {
       toast.error("something went wrong")
    }
}







  return (
    <div className="model">
    <form onSubmit={handleAddInvestment} className='addBox grid grid-cols-1 md:grid-cols-2 
    min-w-[300px] md:min-w-fit border mx-auto p-4 border-gray-500 gap-6 rounded-md bg-opacity-100 bg-[#1f1f1f] text-white mt-[-14rem] ml-[-5rem] font-light z-50'>
     
        <div className='flex flex-col md:flex-row'>
        <label htmlFor="name" className='mr-1 font-semibold'>
            Investment Name
        </label>
        <input type="text" id='name' name="name" className='border rounded-md border-gray-500 p-[3px] outline-none text-gray-300 bg-[#2a2929]  ' value={investmentDetails.name} onChange={(e)=>updateInvestmentDetails(e,"name")}
        required
         />
        </div>

        <div className='flex flex-col md:flex-row'>
            <label htmlFor="investment-type" className='mr-1 font-semibold'>Investment Type</label>
            <select name="type" id="investment-type" className='border border-gray-400 rounded-md p-[3px]  outline-none text-gray-300 bg-[#2a2929]'
            value={investmentDetails.investment_type} onChange={(e)=>updateInvestmentDetails(e,"investment_type")}
            required
            >
                <option value="Mutual Fund" name="type">Mutual Fund</option>
                <option value="Stock" name="type">Stock</option>
                <option value="Business" name="type">Business</option>
                <option value="Self" name="type">Self</option>
            </select>
        </div>
        
        

        <div className='flex flex-col md:flex-row'>
            <label htmlFor="date" className='mr-1 font-semibold'>Date</label>
            <input type="date" id="date" className='border border-gray-400 rounded-md p-[3px] outline-none  bg-[#2a2929] text-gray-300'
            value={investmentDetails.date} onChange={(e)=>updateInvestmentDetails(e,"date")}
            required
             />
        </div>

        <div className='flex flex-col md:flex-row'>
            <label htmlFor="amount" className='mr-1 font-semibold'>Amount</label>
            <input type="number" id="amount" className='border border-gray-400 rounded-md p-[3px] outline-none text-gray-300 bg-[#2a2929]' 
            value={investmentDetails.amount} onChange={(e)=>updateInvestmentDetails(e,"amount")}
            required
            />
        </div>

        
      

        <div className='flex items-center gap-3'>
            <button className='border py-1 px-2 bg-blue-600 text-white tracking-wider rounded-md' type="submit">Submit</button>
            
            <button className='border py-1 px-2 bg-red-600 text-white tracking-wider rounded-md' onClick={()=>setAddInvestment(false)}>Cancel</button>
        </div>

      
           
      
        
    </form>
    
</div>
  )
}

export default AddInvestment