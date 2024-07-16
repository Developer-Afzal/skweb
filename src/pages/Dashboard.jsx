import React, { useEffect } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import Chart from '../Components/ChartComponent'
import { POST, GET } from '../utils/Api'
import { useDispatch } from 'react-redux'
import {GetLogout} from '../features/LoginSlice'
const Dashboard = () => {
  const dispatch =  useDispatch()
  useEffect(()=>{
    const FetchData = async ()=>{
        const Response = await GET('dashboard')
        if(Response?.message === "token Expired"){
          console.log('running');
          const res = await POST('logout')
          console.log(res?.data);
          if(res?.data?.message === "success"){
            dispatch(GetLogout())
          }
        }
    }
    FetchData()
  }, [])

 const  AddmissionData = [
    ["Students Attendence", "IX", "X", "XI", "XII"],
    ["Jan", 56, 50, 20,45],
    ["Dec", 70, 60, 25,54],
    ["Nov", 60, 120, 80, 54],
    ["Oct", 30, 54, 35, 54],
  ];

  const  AttendenceData = [
    ["Attendance", "percentage"],
    ["CLASS IX", 33],
    ["CLASS X", 26],
    ["CLASS XI", 22],
    ["CLASS XII", 10], // Below limit.
  ];

const attendenceOptions = {
    title: "Attendence Tacker",
    sliceVisibilityThreshold: 0.1,  // 20%
  };

const addmissionOption ={
  chart :{
    title:'Total Students IX:200   X:150   XI:140   XII:130',
  }
} 

  return (
    <Container className='p-3'>
      <Row>
        <Col sm={12} className='upperContent'>
          <Stack gap={3} className='flex-sm-row'>
              <Col sm={4} xs={12}  className='border-2 dashboard-Card'>
                <b>Monthly Revenue &#8377;</b>
                <Col className='_flex justify-content-between m-0'><b className='m-0'>24144 &#8377; </b><button className='default-btn'>Check Now</button></Col> 
              </Col>
              <Col sm={4} xs={12} className='border-2 dashboard-Card '>
               <b> Annual Revenue &#8377;</b>
               <Col className='_flex justify-content-between m-0'><b className='m-0'>2434344 &#8377; </b><button className='default-btn'>Check Now</button></Col> 
                </Col>
              <Col sm={4} xs={12} className='border-2 dashboard-Card'>
                <b>Number of Student</b>
                <Col className='_flex justify-content-between m-0'><b className='m-0'>7289 </b><button className='default-btn'>Check Now</button></Col>
              </Col>
          </Stack>
        </Col>
        <Col sm={12}>
          <Stack gap={4} className='flex-sm-row'>
            <Col sm={8}>
              <Chart chartType="Bar" data={AddmissionData} dataoption={addmissionOption}/>
            </Col>
            <Col sm={4} className='border-2 dashboard-Card ms-2 text-center p-0'>
            <Chart chartType="PieChart" data={AttendenceData} dataoption={attendenceOptions}/>
            </Col>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard