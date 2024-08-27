import React from 'react'
import Sidebar from '../components/Sidebar'
import MobileNavbar from '../components/MobileNavbar'
import AddWishlist from '../components/AddWishlist'

const Wishlist = () => {
  return (
    <>
    <MobileNavbar />
    <div className={`flex max-h-screen overflow-hidden `}>
    
    <Sidebar />
    <aside className={`min-w-[85%] relative px-8 text-white overflow-y-auto py-4 text-xs md:text-base`}>
        <h1>Wishlist</h1>

        <AddWishlist />

    </aside>
    </div>
   
    </>
  )
}

export default Wishlist