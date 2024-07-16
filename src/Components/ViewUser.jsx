import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {GET} from '../utils/Api'

const ViewUser = () => {
  const UserList = useSelector((state) => state.crud.users);
  const [ViewSingleUser, setViewSingleUser] = useState();
  const [FeeStatus , setfeestatus] = useState('unpaid')
  const CurrentDate = new Date() 
  const MM = CurrentDate.getMonth() + 1; 
  const navigate = useNavigate()
  const Param = useParams();
  useEffect(()=>{
    const fetchSingleuser = async ()=>{
      const response  = await GET(`studentlist/${Param?.userId}`)
      setViewSingleUser(response?.data)
      if(response?.data?.month){
        if(Object.keys(response?.data?.month).length === MM -3) setfeestatus('paid')
      }
      
    }
    fetchSingleuser()
  },[])

  const findFeestatus =(value)=>{
      for(let i in  ViewSingleUser?.month){
        console.log(i);
      }
  }


  return (
      <Container className='view-block'>
        <Col xs sm={{span: 4, offset: 3 }} className='text-center view-heading'>
          Student Details
        </Col>
        <Col xs sm={12} >
          <Row>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className='p-0'><p className='p-0 m-0'>Student Name</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.s_name}</Col>
          <Col xs={{span: 5, offset: 2}} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Date of Birth</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.s_dob}</Col>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Board</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.board}</Col>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Class</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.s_class}</Col>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Coaching Timing</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.coaching_time}</Col>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Student Email</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.s_email}</Col>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Student's Father Name </p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.f_name}</Col>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Address</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.s_address}</Col>
          <Col xs={{span: 5, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'><p className='p-0 m-0'>Fees</p></Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.coaching_fee}</Col>
            <Col xs={{span: 8, offset:2 }} sm={{span: 2, offset: 4 }} className=' py-3 px-0'><button className='default-btn' onClick={()=> navigate(`/feestatus/${ViewSingleUser?._id}`)}>Check</button><button className='default-btn' onClick={()=> navigate(-1)}>Back</button></Col>
          </Row>
        </Col>
      
      </Container>
  )
}

export default ViewUser