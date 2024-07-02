import React, { useState } from 'react'
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { Link,useNavigate } from 'react-router-dom';
import { MdAnalytics } from "react-icons/md";
import { useContext } from 'react';
import { userListContext } from '../context/ContextProvider';
import { MdLogout } from "react-icons/md";
import Hamburger from 'hamburger-react'
import { AnimatePresence, motion } from "framer-motion";


const MobileNavbar = () => {
    const {currentUser} = useContext(userListContext)
    const [isClose,setIsClose] = useState(false);
    const [isOpen, setOpen] = useState(false)
    console.log(currentUser)
    const navigate = useNavigate()

    const handleLogout = () => {
        const decision = confirm("Do you want to logout?")
        if(decision){
            localStorage.clear();
            navigate("/")
        }
    }

    let navToggle = document.querySelector('.nav-toggle')
    let bars = document.querySelectorAll('.bar')
   

    console.log(navToggle)

   


  return (
    <div className='px-8 py-2'>
    <div className='w-full  rounded-tl-md rounded-tr-md  text-white  flex items-center justify-between text-[1rem] md:hidden '>
     <div className='relative  md:hidden'>
       <h2 className='text-[1rem] text-[#ffbd59] font-consert'>udhaarbook.</h2>
      </div>
      <Hamburger toggled={isOpen} toggle={setOpen} className="text-base" />
    
    </div>

    <div className='nav-items'>
    <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className=" shadow-4xl right-0 top-[3.5rem] pb-4 pt-0  border-b border-b-white/20"
          >
            <ul className="grid gap-2">
            <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1
                    }}
                  
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700 text-white"
                  >
                    <Link
                     to="/dashboard"
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                      }
                     
                    >
                     Dashboard
                     
                    </Link>
                  </motion.li>
              
                  <motion.li
                  to="/investment"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2
                    }}
                  
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700 text-white"
                  >
                    <Link
                    to="/investment"
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                      }
                     
                    >
                     Investment
                     
                    </Link>
                  </motion.li>

                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3
                    }}
                  
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700 text-white"
                  >
                    <Link
                     to="/analysis"
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                      }
                     
                    >
                     Analysis
                     
                    </Link>
                  </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  )
}

export default MobileNavbar