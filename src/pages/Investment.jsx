import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import { userListContext } from '../context/ContextProvider'
import { IoAdd } from "react-icons/io5";
import AddInvestment from '../components/AddInvestment'
import { getDocs,collection} from 'firebase/firestore'
import InvestmentList from '../components/InvestmentList'
import { db } from '../firebaseConnection/connection'
import TotalInvestment from '../components/TotalInvestment'
import MobileNavbar from '../components/MobileNavbar'
import { exportToExcel } from 'react-json-to-excel';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify'


const Investment = () => {

const navigate =  useNavigate()
const {setNavActive,isSignIn} = useContext(userListContext)
const [search,setSearch] = useState("")
const [addInvestment,setAddInvestment] = useState(false)
const location = useLocation()
const url = location.pathname.slice(1)





const [investmentList,setInvestmentList] = useState([])
const [isLoading,setIsLoading] = useState(false)
const [total,setTotal] = useState(0)
const [error,setError] = useState("")

const userId = localStorage.getItem("uid")


useEffect(()=>{
    
    setNavActive(url)
    fetchInvestmentList();
  },[])

  const fetchInvestmentList = async () => {
    try {
       if(userId){
       
        setIsLoading(true)
        const listRef = collection(db,"Users",userId,"investments");

        const investmentSnap = await getDocs(listRef);
        const list = investmentSnap.docs.map(doc=>{
         const docData = {
          id:doc.id,
          ...doc.data()
         }
         return docData;
        })
        // console.log(list)

        const totalSum = list.reduce((sum,item)=>sum + Number(item.amount),0);
        setTotal(totalSum)
        

        setInvestmentList(list)
        setIsLoading(false)
       
       }
       else{
        
        navigate("/login")
       }
    } catch (error) {
      setError(error?.message)
      toast.error(error?.message)
    }
  }

   // download table in excel format
   const handleDownload = () => {
   
    if(investmentList.length > 0){
        const data = investmentList.map(({id,...rest})=>rest);
        exportToExcel(data,"investmentlist");
    }
    else{
        toast.info("Nothing to export!");
    }
    
}
  

  return (
    <>
    <div className='relative md:hidden'>
      </div>
    <MobileNavbar />
    <div className={`flex max-h-screen overflow-hidden `}>
    <Sidebar/>
    <aside className={`min-w-[85%] relative px-8 text-white overflow-y-auto ${addInvestment ? "pseudoClass" : ""} text-xs md:text-base`}>
       
        <TotalInvestment total={total} addInvestment={addInvestment} />
            <div className="search-bar md:flex items-center mt-4 md:mt-8 justify-between">

            <button className='border flex items-center p-2 gap-2 rounded-md bg-[#242424] text-white hover:bg-[#0f0f0f] hover:text-white' onClick={()=>setAddInvestment(true)}>
                <IoAdd className='text-xl text-white' />
                <p>Add</p>

                </button>

            <div className='mt-4 md:mt-0'>
                <input type="text" className='p-2 min-w-full md:min-w-[250px] rounded-sm outline-none bg-[#2b2b2b] text-white font-light' placeholder='type...' value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>

            </div>

            {
              addInvestment && <div className='fixed top-[50%] left-[50%] translate-x-[-30%]'>
              <AddInvestment setAddInvestment={setAddInvestment} setInvestmentList={setInvestmentList} fetchInvestmentList={fetchInvestmentList} />
              </div>
            }
           <div className='text-right'>
                <button className='text-white bg-blue-800 px-2 py-1 cursor-pointer rounded-md mt-4'
                onClick={handleDownload}
                >download excel</button>
               </div>
            <InvestmentList 
            investmentList={investmentList} 
            setInvestmentList={setInvestmentList} 
            isLoading={isLoading}
            setIsLoading = {setIsLoading}
            fetchInvestmentList={fetchInvestmentList}
            addInvestment={addInvestment}
            />
            

    </aside>
    <ToastContainer />
    
    
</div>
</>
  )
}

export default Investment