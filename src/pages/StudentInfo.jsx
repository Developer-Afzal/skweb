import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GET, POST } from '../utils/Api'
import Payment from '../Components/Student/Payments/Payment'

const StudentInfo = () => {
  const param = useParams()
  const [userData, setuserData] = useState('')
  const [ISpay, setISpay] = useState(false)
  useEffect(()=>{
    const {id} = param
    const FetchData = async ()=>{
      const Response = await GET(`studentinfo/${id}`)
      if(Response?.data) setuserData(Response?.data?.userData)
      console.log(Response);
    }
    FetchData()
  },[param])

  const Cancelpay =()=>{
    setISpay(false)
  }

  return (
   <>
{!ISpay ?(<Container className='student-block m-0' fluid>
            <Row>
            <Col sm={4}>
            </Col>
            <Col sm={8} ><h3 className='heading text-justify'>{userData?.s_name} </h3></Col>
            <Col sm={4}>
            <div className='_flex'>
                <input type='file' id="uploadfile" style={{display:'none'}}/>
              <label for="uploadfile" onClick={()=> console.log('wff')}>
                <img style={{width:'150px'}} src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1720551489~exp=1720555089~hmac=a8decdcac2a6654067709542e9280ca99e073d85b48a7257cd748524bf9a5d92&w=740"/>
              </label>
              </div>
            </Col>
            <Col sm={12} md={4} className='text-start'>
              <table>
                <tr>
                  <td className='table-fChild'>Student Name</td>
                  <td className='text-center px-3'>:</td>
                  <td  className='ps-5'>{userData?.s_name}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Enrollment No</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.enroll_no}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Student Class</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.s_class}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Board</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.board}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Fee</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.coaching_fee}</td>
                </tr>
              </table>
            </Col>
            <Col sm={12} md={4} className='text-start pb-4'>
              <table>
                <tr>
                  <td className='table-fChild'>Father Name</td>
                  <td className='text-center px-3'>:</td>
                  <td  className='ps-5'>{userData?.f_name}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Pincode</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.pincode}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Address</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.s_address}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Joining Date</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.joining_date}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>conatct No</td>
                  <td className='text-center'>:</td>
                  <td className='ps-5'>{userData?.s_contact}</td>
                </tr>
              </table>
            </Col>
            </Row>
            <Row >
              <Col sm={3} className='col-3 p-0  border-end'><button className='default-btn w-100 rounded-0 px-4 text-center'> Fee Status</button></Col>
              <Col sm={3} className='col-3 p-0 border-end'><button className='default-btn w-100 rounded-0 px-3 text-center'>Important Dates</button></Col>
              <Col sm={3} className='col-3 p-0 border-end'><button className='default-btn w-100 rounded-0 px-3 text-center'> Test Results</button></Col>
              <Col sm={3}  className='col-3 ps-0 pe-1 '><button className='default-btn w-100 rounded-0 px-2 text-center'>Attendence Tracker</button></Col>
            </Row>
            <Row className='m-0'>
              <Col sm={6}>
              <h5 className='text-center heading'>Fee Status</h5>
              <table className='w-100'>
                <tr>
                  <td className="studentinfotable" style={{background:userData?.month?.Apr ? 'green' : 'red'}}>Apr</td>
                  <td className="studentinfotable" style={{background:userData?.month?.May ? 'green' : 'red'}}>May</td>
                  <td className="studentinfotable" style={{background:userData?.month?.Jun ? 'green' : 'red'}}>Jun</td>
                  <td className="studentinfotable" style={{background:userData?.month?.Jul ? 'green' : 'red'}}>Jul</td>
                </tr>
                <tr>
                <td className="studentinfotable" style={{background:userData?.month?.Aug ? 'green' : 'red'}}>Aug</td>
                <td className="studentinfotable" style={{background:userData?.month?.Sep ? 'green' : 'red'}}>Sep</td>
                <td className="studentinfotable" style={{background:userData?.month?.Oct ? 'green' : 'red'}}>Oct</td>
                <td className="studentinfotable" style={{background:userData?.month?.Nov ? 'green' : 'red'}}>Nov</td>
                </tr>
                <tr>
                <td className="studentinfotable" style={{background:userData?.month?.Dec ? 'green' : 'red'}}>Dec</td>
                <td className="studentinfotable" style={{background:userData?.month?.Jan ? 'green' : 'red'}}>Jan</td>
                <td className="studentinfotable" style={{background:userData?.month?.Feb ? 'green' : 'red'}}>Feb</td>
                <td className="studentinfotable" style={{background:userData?.month?.Mar ? 'green' : 'red'}}>Mar</td>
                </tr>
              </table>
              </Col>
              <Col sm={6} className='_flex '>
                <button className='default-btn px-3' onClick={()=> setISpay(true)}> Pay  Fee Online</button>
              </Col>
            </Row>
    </Container>):(
      <><Payment data={userData} action={Cancelpay}/></>
    )}
    
   </>
  )
}

export default StudentInfo