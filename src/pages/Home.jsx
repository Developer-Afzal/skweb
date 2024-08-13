import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Bannerimg from '../Images/banner-1.jpg'
import { useNavigate } from 'react-router-dom'
import {GET, POST} from '../utils/Api'
import Snackbarcompo from '../Components/Snackbarcompo'
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
  const navigate = useNavigate()
  const [disablebtn, setdisablebtn] = useState(false)
  const [enrollmentNo, setenrollmentNo] = useState('')
  const [snackBar, setsnackBar] = React.useState({Click:false, message:'', msgType:''});
  const [showspinner, setshowspinner] = useState(false)

  const getStudent = async ()=>{
    setshowspinner(true)
    setdisablebtn(true) 
    const Response = await POST('studentlogin', {enrollno:enrollmentNo})
    setshowspinner(false)
    if(!enrollmentNo){
      openSnackBar({click:true, message:"Enrollment no is required", mgss:'error' })
       return  setdisablebtn(false) 
    }
    if(Response?.data){
      setdisablebtn(false)
      navigate(`/studentinfo/${Response?.data?.data?.enroll_no}`)
    }else {
      setdisablebtn(false) 
      openSnackBar({click:true,message:Response?.message, mgss:'error' })
    }
  }


  const openSnackBar = (e)=>{
    setsnackBar((prevState)=>({
      ...prevState,
      Click:e.click,
      message:e.message,
      msgType:e.mgss
    }))
   }
  return (

      <Container className="main-block" fluid>
        <Row className="banner p-0 m-0">
          <Col className='offset-0 offset-md-8 mt-5 ' sm={4}>
            <label>Student Enrollment No</label>
            <input placeholder='Enter Student enrollment' className='border-1' onChange={(e)=> setenrollmentNo(e.target.value) }/>
            <button className='default-btn mt-2' disabled={disablebtn} onClick={getStudent}>
              check {showspinner ? <Spinner animation="border" size='sm'/> : null}
              </button>
            </Col>
        </Row>
        <Snackbarcompo data={snackBar} openSnackBar={openSnackBar}/>
      </Container>
    
  )
}

export default Home