import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate,useLocation } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import { userListContext } from '../context/ContextProvider'
import MobileNavbar from '../components/MobileNavbar'
import { FaIndianRupeeSign } from "react-icons/fa6";
import AddDeduction from '../components/AddDeduction'
import { db } from '../firebaseConnection/connection'
import { collection,doc,getDocs,getDoc,addDoc, updateDoc,serverTimestamp,query,orderBy, deleteDoc,writeBatch } from 'firebase/firestore'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Expenditure = () => {
const navigate =  useNavigate()
const {setNavActive,isAddBox,isSignIn,currentUser,setUser,setIsLoading} = useContext(userListContext)
const [salary,setSalary] = useState(null)
const [remaining,setRemaining] = useState(0)
const [showBoxes,setShowBoxes] = useState(false)
const [deductions,setDeductions] = useState([])
const [expenditureList,setExpenditureList] = useState([])
const [totalExpenditure,setTotalExpenditure] = useState(0)
const [loading,setLoading] = useState(false)


const location = useLocation()
const url = location.pathname.slice(1)
const expenditureRef = collection(db,"Users",localStorage.getItem("uid"),"Expenditures")
const moneyRef = collection(db,"Users",localStorage.getItem("uid"),"Money");

const userId = localStorage.getItem("uid")

useEffect(()=>{
   
    setNavActive(url)

    if(!userId){
      navigate("/login")
    }
    else{
      fetchData();
    }

    return ()=>{

    }
  },[])

  const handleShowBoxes = async() => {
    try {
      if(salary){
        setRemaining(salary)
        
        const data = await addDoc(moneyRef,{"salary":salary,
          "remaining":salary
        })
      
        localStorage.setItem("moneyId",data.id);

        
        setShowBoxes(true)
      }
      else{
        alert("enter valid salary")
      }
    } catch (error) {
      
    }
  }


  const handleAddDeductions = () => {
      setDeductions([...deductions,{cost:"",title:"",timestamp:serverTimestamp(),uniqueId:Date.now()}])
  }


  const handleChange = (id,field, event) => {
    setDeductions(deductions.map(input => 
      input.uniqueId === id ? { ...input, [field]: event.target.value } : input
    ));
  };

 const handleSubmit = async() => {
  const totalExpenditure = deductions.reduce((sum,item)=>sum + Number(item.cost),0);
  const remainingSal = remaining - totalExpenditure;
  
  


  
  try {
   
  const docRef = doc(db,"Users",userId,"Money",localStorage.getItem("moneyId"))
  await updateDoc(docRef,{"remaining":remainingSal})
  setRemaining(remainingSal)

  //  const listRef = collection(db,"Users",localStorage.getItem("uid"),"Expenditures")
  
   
   deductions.forEach(async item=>{
    await addDoc(expenditureRef,item);
   })

   fetchData()
   setDeductions([])
   toast.success("item added successfully")
   
  } catch (error) {
    console.log(error)
  }

 }


//  remove deduction input field
 const handleRemove = (id) => {
  const filterList = deductions.filter(item=>item.uniqueId != id);
  setDeductions(filterList)
 }



//  fetchData function to fetch initial data from the database when component loads

 const fetchData = async () => {
  if(userId){
    setLoading(true)
    try {

      if(!currentUser.email){
        const docRef = doc(db,"Users",userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
                   
          const {email,firstName,lastName,profileUrl} = docSnap.data();
          setUser({
              email,
              firstName,
              lastName,
              profileUrl:profileUrl
          })

          setIsLoading(false);

      
      }
      }
      
      const deductionQuery = query(expenditureRef,orderBy('timestamp','desc'))
      const moneyRef = collection(db,"Users",localStorage.getItem("uid"),"Money")
      const moneyData = await getDocs(moneyRef)
  
      if(!moneyData.empty){
  
        const data = moneyData.docs.map(doc=>{
          const docData = {
            id:doc.id,
            ...doc.data()
          }
          return docData
          })
  
         
          const salaryRemaining = data[0];
          setSalary(salaryRemaining.salary)
          setRemaining(salaryRemaining.remaining)
          localStorage.setItem("moneyId",salaryRemaining.id);
          setShowBoxes(true)
      }
      
  
  
      const deductionData = await getDocs(deductionQuery)
      const list = []
      if(!deductionData.empty){
        deductionData.forEach(doc=>list.push({id:doc.id,...doc.data()}))
        const tRemaining = list.reduce((sum,item)=>sum + Number(item.cost),0);
        setTotalExpenditure(tRemaining)
        setExpenditureList(list)
      }
      

      setLoading(false)
     
      
    } catch (error) {
      console.log(error)
    }
  }
  else{
    navigate("/")
  }
  
  
 }


//  Delete function for expenditure
 const handleDelete = async (id,cost) => {
  try {
    const docRef = doc(db,"Users",localStorage.getItem("uid"),"Expenditures",id);
    await deleteDoc(docRef);
    alert("document deleted successfully")
    
    const remainingRef = doc(db,"Users",localStorage.getItem("uid"),"Money",localStorage.getItem("moneyId"))
    await updateDoc(remainingRef,{"remaining":remaining+Number(cost)})
    setRemaining(prev=>prev+Number(cost))
    setTotalExpenditure(prev=>prev-Number(cost))
    const updatedList = expenditureList.filter(item=>item.id !== id);
    
    setExpenditureList(updatedList)
    toast.success("item deleted successfully")
  } catch (error) {
    console.log(error)
  }
 }

//  handle reset function
const handleReset = async () => {
  try {
  
    const moneyDataRef = doc(db,"Users",localStorage.getItem("uid"),"Money",localStorage.getItem("moneyId"))
    await deleteDoc(moneyDataRef)
    setSalary(0)
    setRemaining(0)
    console.log("wtf")
    setShowBoxes(false)
    console.log("wtf above")
    await deleteCollection(`Users/${localStorage.getItem("uid")}/Expenditures`)
    console.log("wtf")
    setExpenditureList([])
    toast.info("Data reset successful")
    
  } catch (error) {
    console.log(error)
  }
}


// current Month
const convertDateIntoReadable = () => {
   
  
    // Parse pe date string into a Date object
    const date = new Date();

    // Define options for toLocaleDateString to get pe desired format
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Format pe date
    const formattedDate = date.toLocaleDateString('en-GB', options);
   
    // console.log(formattedDate)
    return formattedDate;
 
 
  
}

const deleteCollection = async (collectionPath) => {


  try {

    const collectionRef = collection(db,collectionPath);
    const querySnapshot = await getDocs(collectionRef);

  const batch = writeBatch(db);

  querySnapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
    
  } catch (error) {
    console.log(error)
  }
  
};



  

  return (
    <>
    
    <MobileNavbar />
    <div className={`flex max-h-screen overflow-hidden `}>
    <Sidebar />
    <aside className={`min-w-[85%] relative px-8 text-white overflow-y-auto py-4 text-xs md:text-base`}>
        <h2 className='text-xl mb-4'>Track your expenditures - <span className='bg-amber-500 p-1 rounded-md'>{convertDateIntoReadable()}</span></h2>
        {
          showBoxes && (
            <div className='total-amount flex flex-col  md:items-center md:flex-row text-4xl gap-4 my-8 '>
            <div className="salary  card mt-6 md:mt-0  min-h-[100px] p-2 gap-5 min-w-[250px] bg-[#1d1d1d] rounded-md text-white thinShadow">
              <span className='text-xl'>salary</span> <br></br>
              Rs.
              {
                salary
              }
            </div>
            <div className="salary card mt-6 md:mt-0  min-h-[100px] p-2 gap-5 min-w-[250px] bg-[#1d1d1d] rounded-md text-white thinShadow">
              <span className='text-xl'>remaining</span><br></br>
              Rs. {
                remaining
              }
  
            </div>
  
          </div>
          )
        }
       
       {
        !showBoxes && (
          <div className='flex items-center'>
          <div className='flex items-center border rounded-md border-gray-500 outline-none text-gray-300 bg-[#2a2929]  p-2 mr-4 max-w-[20%]'>
          <FaIndianRupeeSign className='text-base' />
          <input type="number" placeholder='enter your monthly salary' className='bg-transparent outline-none border-none' value={salary} onChange={(e)=>setSalary(e.target.value)} /> 
          </div>
          
          <button className='border p-2 tracking-wider rounded-md bg-[#242424] text-white hover:bg-[#0f0f0f] hover:text-white'
          onClick={()=>handleShowBoxes()}
          >Save</button>
        </div>
        )
       }

       {/* expenditure list */}
       {
        loading ? <h2 className='mt-8'>Fetching data...</h2> : 
        (

          <div className="main flex flex-col-reverse md:flex-row md:gap-8">

          {
           expenditureList.length > 0 && <div className=' max-w-[90%] md:max-w-[50%] flex-1'>
             <div className='grid grid-cols-3 my-4'>
               <p className='px-2 py-1 text-xl font-bold'>Item</p>
               <p className='px-2 py-1 text-xl font-bold'>Cost</p>
             </div>
             {
               expenditureList.map(item=>{
                 return  <li className="border-b-[1px] border-gray-600 tracking-wider  grid grid-cols-3 font-light" key={item.id}>
                 <p  className="px-2 py-1 font-medium text-white">{item.title}</p>
                 <p  className="px-2 py-1 font-medium text-white">Rs {item.cost}</p>
                 <p className='px-2 py-1   text-white flex items-center justify-center'>
                     <button className='border p-2 text-sm hover:bg-red-800'
                     onClick={()=>handleDelete(item.id,item.cost)}
                     >
                     <MdDelete />
   
                     </button>
                 
                 
                 </p>
             </li>
               })
             }
             <hr></hr>
             {
               totalExpenditure && <li className='grid grid-cols-3 my-4'>
                 <p className='font-semibold px-2 py-1'>Total Expenditure</p>
                 <p className='font-semibold px-2 py-1'>Rs {totalExpenditure}</p>
               </li>
             }
           </div>
          }
   
         <div className="deductions flex-1">
           {
             showBoxes && (
               <div className="btn-container flex items-center gap-4">
           
           <button className='reset-btn border p-2 tracking-wider rounded-md bg-[#de2e2e] text-white hover:bg-[#ec4e4e] hover:text-white'
           onClick={handleReset}
           >Reset</button>
           <button className="addDeduction border p-2 tracking-wider rounded-md bg-[#242424] text-white hover:bg-[#0f0f0f] hover:text-white" onClick={handleAddDeductions}>
             Deduction
           </button>
           </div>
             )
           }
           
          
   
           {
             deductions.map(item=>{
               return <AddDeduction key={item.uniqueId} id={item.uniqueId} cost={item.cost} title={item.title}  onChange={handleChange} deductions={deductions} handleRemove={handleRemove} />
             })
           }
           
           {
             deductions.length > 0 && (
               <button className='addDeduction border p-2 tracking-wider rounded-md bg-blue-600 text-white  mt-4'
           onClick={handleSubmit}
           >Submit</button>
             )
           }
           
         </div>
   
          </div>

        )
       }
     

      

       
    </aside>
    </div>
    <ToastContainer />
    </>
  )
}

export default Expenditure