import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
const Layout = (props) => {
  const [searchKey, setsearchKey] = useState('')
  const Setsearch = (e)=>{
    setsearchKey(e)
  }

  return (
   <>
   <Header srch={Setsearch}/>
   <div className='layout-Block _flex flex-column'>
    <Outlet context={searchKey}/>
   </div>
   <Footer/>
   </>
  )
}

export default Layout