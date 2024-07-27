import React from 'react'

const AddNew = ({name,price,setAddBox,box,index,fields,setFields}) => {
    console.log(index)

    const handleDelete = () => {
      
        const updatedBox = box.filter(item=>item.index != index);
        console.log(updatedBox)
        setAddBox(updatedBox)
    }

  


  return (
    <>
    
            <div className='border max-w-[70%] p-8 text-white'>
        <div>
            <button onClick={handleDelete}>
                close
            </button>
        </div>
        <form className='flex items-center justify-center gap-4'>
            
            <div>
                <label htmlFor="name">Name</label> <br></br>
                <input type="text" placeholder='enter name' className='p-2 text-gray-500' />
            </div>
            <div>
                <label htmlFor="cost">Cost</label> <br></br>
                <input type="number" className='p-2 text-gray-500' />
            </div>

        </form>
    </div>
  
    
    </>
  )
}

export default AddNew