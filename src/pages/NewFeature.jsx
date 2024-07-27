import React, { useState } from 'react'
import AddNew from '../components/AddNew'
import Sidebar from '../components/Sidebar'

const NewFeature = () => {

    const [fields, setFields] = useState([]);
    const [total,setTotal] = useState(0)

    // data structure
    const dataStructure = [
        {
            title:"Self Business",
            Total : 45000,
            list:[
                {
                    name : "kitchen",
                    price:3000,
                    index:1
                    
                }
            ]
        }
    ]

   
    const [add,setAdd] = useState(false)
    // const [box,setAddBox] = useState([])

  

    const handleSubmit = () => {
       
        const totalAmount = fields?.map(item=>item.price).reduce((sum,cur)=>sum+Number(cur),0);
        setTotal(totalAmount)
      
    }

    const addFields = (e) => {
        e.preventDefault();
        setFields(prev=>[...prev,{name:"",price:"",index:fields.length > 0 ? fields.length + 1 : 1}]);
        console.log(fields)
      };


      const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newFields = fields.map((field, i) =>
          i === index ? { ...field, [name]: value } : field
        );
        setFields(newFields);
        // handleSubmit()
      };


      const handleDelete = (index) => {
        console.log(index)
        const filterBox = fields.filter(box=>box.index != index);
        setFields(filterBox)
      }


    


  return (
    <div className='p-8 border-red-500 text-white border'>
        {/* <Sidebar /> */}
        <button className='border py-2 px-8 bg-blue-600 text-white rounded-md mb-2' onClick={()=>setAdd(true)}>
            Add
        </button>


        {
            add && (
                <form className='border p-2'>
                <div>
                    <div className='border max-w-fit p-2'>
                        2000
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                    <div>
                    
                    <input type="text" id="investmentName" placeholder='self business' className='p-2 text-gray-500'
                   
                     />
                    </div>
                    <div>
                       
                        <input type="number" className='p-2 text-gray-500'
                         value={total}
                         onChange={(e)=>setTotal(e.target.value)}
                         />
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        <button className='border p-2 bg-blue-500 text-white' onClick={()=>setAdd(false)}>Submit</button>
                        <button className='border p-2 bg-blue-500 text-white' onClick={(e)=>addFields(e)}>Add</button>
                    </div>
                    </div>
                   
                </div>
            </form>
            )
        }


       
       
        
       
        {/* <AddNew setAddMore={setAddMore} addMore={addMore} /> */}
        {
            fields?.map((field,index)=>{
                return (
                    <div key={field.index}>
                        <span onClick={()=>handleDelete(field.index)}>close</span>
                       <div>
                        <div key={index} className="field-pair flex items-center justify-start gap-4">
                          <input
                            type="text"
                            name="name"
                            value={field.name}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder={`Name ${index + 1}`}
                            className="dynamic-input text-gray-600 p-1"
                          />
                          <input
                            type="number"
                            name="price"
                            value={field.price}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder={`Price ${index + 1}`}
                            className="dynamic-input text-gray-600 p-1"
                          />
                        </div>
                        </div>
                        
                        </div>
                     
                )
            })
        }

        {
            add && (
                <button className='bg-blue-500 p-2 rounded-md mt-4' onClick={handleSubmit}>Submit</button>
            )
        }
       
        

    </div>
  )
}

export default NewFeature