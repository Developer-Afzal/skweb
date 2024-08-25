import React from 'react'
import pagenotFimg from '../Images/pageNotFound.jpg'
import { useNavigate } from 'react-router-dom'
const PageNotfound = () => {
  const navigate = useNavigate()
  return (
    <div className='pageNot-found _flex flex-column'>
      <img src={pagenotFimg} className='w-50'/>
      <p className='heading'>Page Not Found ! <button className='default-btn' onClick={()=> navigate('/')}>Back to Home</button></p>
      
    </div>
  )
}

export default PageNotfound