import React from 'react'
import { IoClose } from "react-icons/io5";

const AddDeduction = ({id,cost,deductions,onChange,title,handleRemove}) => {
  
  return (
    <div className="deduction-input-div flex items-center mt-8">
        <div>
            <label htmlFor="title">Title</label><br></br>
            <input type="text" id="title" className='border border-gray-400 rounded-md p-[3px] outline-none text-gray-300 bg-[#2a2929] mr-2' placeholder='shopping'
            value={title}
            onChange={(event) => onChange(id, 'title', event)}
             /> 
        </div>
        <div>
            <label htmlFor="cost">Amount</label><br></br>
            <input type="number" id="cost" className='border border-gray-400 rounded-md p-[3px] outline-none text-gray-300 bg-[#2a2929] mr-2' placeholder="1000"
            value={cost}
            onChange={(event)=>onChange(id,'cost',event)}
             />
            
        </div>
           
            <IoClose onClick={()=>handleRemove(id)} />
          </div>
  )
}

export default AddDeduction