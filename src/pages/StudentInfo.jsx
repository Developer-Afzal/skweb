import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GET, POST } from '../utils/Api'
import Payment from '../Components/Student/Payments/Payment'

const StudentInfo = () => {
  const param = useParams()
  const [userData, setuserData] = useState('');
  const [PageShow, setPageShow] = useState('Fee')
  const [ISpay, setISpay] = useState(false);
  useEffect(()=>{
    const {id} = param
    const FetchData = async ()=>{
      const Response = await GET(`studentinfo/${id}`)
      if(Response?.data) setuserData(Response?.data?.userData)
      console.log(Response);
    }
    FetchData()
  },[param])

  const YEAR = userData?.joining_date?.split('-', 3)
 

  const Cancelpay =()=>{
    setISpay(false)
  }
  const ChangePage =(e)=>{
    setPageShow(e)
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
            <Col sm={12} md={4}>
              <table>
                <tr>
                  <td className='table-fChild'>Student Name</td>
                  <td className='text-center'>:</td>
                  <td  className='ps-4'>{userData?.s_name}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Enrollment No</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.enroll_no}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Student Class</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.s_class}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Board</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.board}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Fee</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.coaching_fee}</td>
                </tr>
              </table>
            </Col>
            <Col sm={12} md={4} className='text-start pb-4'>
              <table>
                <tr>
                  <td className='table-fChild'>Father Name</td>
                  <td className='text-center'>:</td>
                  <td  className='ps-4'>{userData?.f_name}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Pincode</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.pincode}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Address</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.s_address}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>Joining Date</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.joining_date}</td>
                </tr>
                <tr>
                  <td className='table-fChild'>conatct No</td>
                  <td className='text-center'>:</td>
                  <td className='ps-4'>{userData?.s_contact}</td>
                </tr>
              </table>
            </Col>
            </Row>
            <Row >
              <Col sm={3} className='col-3 p-0 border-end'><button className='default-btn w-100 rounded-0 px-4 text-center' onClick={()=> ChangePage('Fee')} style={{background:PageShow === "Fee" ? '#dd940b' : '#a5a29bc7'}}> Fee Status</button></Col>
              <Col sm={3} className='col-3 p-0 border-end'><button className='default-btn w-100 rounded-0 px-3 text-center' onClick={()=> ChangePage('Imp_Date')} style={{background:PageShow === "Imp_Date" ? '#dd940b' : '#a5a29bc7'}}>Important Dates</button></Col>
              <Col sm={3} className='col-3 p-0 border-end'><button className='default-btn w-100 rounded-0 px-4 text-center' onClick={()=> ChangePage('Test_result')} style={{background:PageShow === "Test_result" ? '#dd940b' : '#a5a29bc7'}}> Test Results</button></Col>
              <Col sm={3}  className='col-3 ps-0 pe-1 '><button className='default-btn w-100 rounded-0 px-2 text-center' onClick={()=> ChangePage('Attendence_Track')} style={{background:PageShow === "Attendence_Track" ? '#dd940b' : '#a5a29bc7'}}>Attendence Tracker</button></Col>
            </Row>
            {PageShow === "Fee" ? (<Row className='m-0'>
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
            </Row>):PageShow === "Imp_Date" ? 
            (<Row>
              <h1>Important Date</h1>
            </Row>):PageShow === "Test_result" ? 
            (<Row>
                <Col className='py-3'>
                <h1 className='heading text-center '>Student Result</h1>
                <table>
                  <tr>
                    <th className='border-1 text-center tdWidth'>{YEAR !== undefined ? <>{YEAR[2]} - {+YEAR[2]+1} </>: null}</th>
                    <th className='border-1 text-center tdWidth'>Hindi</th>
                    <th className='border-1 text-center tdWidth'>English</th>
                    <th className='border-1 text-center tdWidth'>Math</th>
                    <th className='border-1 text-center tdWidth'>Chemistry</th>
                    <th className='border-1 text-center tdWidth'>Physics</th>
                  </tr>
                  <tr>
                    <td className='text-center border-1 tdWidth'><b>Quaterly Test</b></td>
                    <td className='border-1 text-center tdWidth'>{userData?.results?.Quaterly?.Hindi}</td>
                    <td className='border-1 text-center tdWidth'>{userData?.results?.Quaterly?.English}</td>
                    <td className='border-1 text-center tdWidth'>{userData?.results?.Quaterly?.Math}</td>
                    <td className='border-1 text-center tdWidth'>{userData?.results?.Quaterly?.Chemistry}</td>
                    <td className='border-1 text-center tdWidth'>{userData?.results?.Quaterly?.Physics}</td>
                  </tr>
                </table>
                </Col>
            </Row>):
            (<Row>
              <h1>Attendance</h1>
            </Row>)}
    </Container>):(
      <><Payment data={userData} action={Cancelpay}/></>
    )}
    
   </>
  )
}

export default StudentInfo