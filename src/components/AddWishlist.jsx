import React from 'react'
import { useState } from 'react'

const AddWishlist = () => {
    const [todo,setTodo] = useState({
        title:"",
        deadLine:"",
        completed:false
    })

    const [wishList,setWishList] = useState([])


    const handleAddWishList = (e) => {
        console.log("added")
        e.preventDefault();
         setWishList(prev=>{
            return [...prev,todo];
         })
         console.log(wishList)
    }

    const handleChange = (e,key) => {
        setTodo(prev=>{
            return {
                ...prev,
                [key]:e.target.value
            }
        })

       


    }


  return (
    <div>
        
          <form onSubmit={handleAddWishList} className='flex items-center gap-4 mt-8'>
       
       <div className='flex flex-col'>
       <label htmlFor="title" className='mr-1 font-semibold text-white'>
           Title
       </label>
       <input type="text" id='title' name="title" className='border rounded-md border-gray-500 p-[3px] outline-none text-gray-300 bg-[#2a2929]' 
       required
       value={todo.title}
       onChange={(e)=>handleChange(e,"title")}
        />
       </div>

       <div className='flex flex-col'>
        <label htmlFor="deadline">Dead Line</label>
        <input type="date" id="deadline" name="deadline" className='border rounded-md border-gray-500 p-[3px] outline-none text-gray-300 bg-[#2a2929]'
        value={todo.deadLine}
        onChange={(e)=>handleChange(e,"deadLine")}
         />
       </div>



      

       
           <button className='border py-1 px-2 bg-blue-600 text-white tracking-wider rounded-md mt-5' type="submit">Submit</button>
          
     

     
          
     
       
   </form>

   {/* Displaying WishLists */}

    {
        wishList.length > 0 && <div>
            {
                wishList.map(todo=>{
                    return <p>{todo.title}</p>
                })
            }
        </div>
    }


    </div>
  )
}

export default AddWishlist