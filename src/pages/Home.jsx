import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Bannerimg from '../Images/banner-1.jpg'
import { useNavigate } from 'react-router-dom'
import {GET, POST} from '../utils/Api'

const Home = () => {
  const navigate = useNavigate()
  const [disablebtn, setdisablebtn] = useState(true)
  const [enrollmentNo, setenrollmentNo] = useState('')
  const getStudent = async ()=>{
    setdisablebtn(true)
    console.log(enrollmentNo);
    const Response = await POST('studentlogin', {enrollno:enrollmentNo})
    if(Response?.data) return navigate(`/studentinfo/${Response?.data?.data?.enroll_no}`)
    
  }
  return (

      <Container className="main-block" fluid>
        <Row className="banner p-0 m-0">
          <Col className='offset-8 mt-5 ' sm={4}>
            <label>Student Enrollment No</label>
            <input placeholder='Enter Student enrollment' className='border-1' onChange={(e)=> { setenrollmentNo(e.target.value); setdisablebtn(false)}}/>
            <button className='default-btn mt-2' disabled={disablebtn} onClick={getStudent}>check</button>
            </Col>
        </Row>
      </Container>
    
  )
}

export default Home