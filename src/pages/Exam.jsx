import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import resultimg from '../Images/result.jpg'
import {GET, POST} from '../utils/Api'
import { Select, Typography } from '@mui/material'

import axios  from 'axios'

const Exam = () => {

  const [loading, setloading] = useState(false)
  const [file, setFile] = useState(null);
  const [activeColor, setactiveColor] = useState("upload")
  const [opentabscreen, setopentabscreen] = useState(false)
  const [searchkey, setsearchkey] = useState('')
  const [resultData, setresultData] = useState(null)

  const fetchData = async () => {
    // Simulate fetching data asynchronously with setTimeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = ['item1', 'item2', 'item3']; // Static data
        resolve(data);
      }, 2000); // Simulate a delay of 1 second
    });
  };
  

  const processData = async () => {
    try {
      const data = await fetchData();
      // Process data further if needed
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };
  
  processData();

// accept file 
const handleFilechange =(e)=>{
  setFile(e.target.files[0]);
  
}


  // upload result 

  const uploadresult = async (e)=>{
    if (!file) {
      console.log('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const Response = await POST('uploadresult', formData);
    } catch (error) {
      console.log(error);
    }}

const searchHandle = async ()=>{
  const data =  {enroll_no : searchkey}
  const Response = await POST('findresult',data )
  setresultData(Response?.data?.data)
  console.log(Response?.data?.data?.results);
}


// Download Student List
const baseurl = process.env.REACT_APP_BASEURL
const Downloadstdlist = async () => {
  try {
    const response = await axios.get(`${baseurl}allstudents`, {
      responseType: 'blob', // Important to set the response type to blob
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studentlist.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error('There was an error downloading the CSV file:', error);
  }
};

// const Downloadstdlist = async ()=>{
//   const Response = await GET('allstudents');

// }

 
  return (
   <Container fluid>
      {!opentabscreen ? (<Row>
        <Col xs={12} sm={6}>
        <img src={resultimg} alt="result" className='w-100'/>
        </Col>
        <Col xs={12}  sm={6} className='d-flex align-items-center'>
        <Row>
        <div class="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between flex-column flex-sm-row"><b> Class IX </b><button class="default-btn" onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        <div class="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between"><b> Class X </b><button class="default-btn"  onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        <div class="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between"><b> Class XI </b><button class="default-btn" onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        <div class="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between"><b> Class XII </b><button class="default-btn" onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        </Row>
        </Col>
      </Row>) :(<Row>
        <Col sm={12} className='_flex justify-content-starts gap-0'>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0' style={{background:activeColor === "upload" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('upload')}>Upload Result</button></Col>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0' style={{background:activeColor === "result" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('result') }>Check Result</button></Col>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0' style={{background:activeColor === "list" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('list') }>Student List</button></Col>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0' style={{background:activeColor === "Event" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('Event') }>Update Event</button></Col>
        </Col>
        {activeColor === "upload" ? (
          <Col sm={12} className='_flex p-5 tab-window'>
          <div className='d-flex'>
            <select>
              <option value="Quaterly">Quaterly</option>
              <option value="Halfyearly">Halfyearly</option>
              <option value="Annual">Annual</option>
            </select>
          <input type='file' accept='.csv' onChange={handleFilechange}/>
          <button className='default-btn m-0 px-2' onClick={uploadresult}>Upload</button>
          </div>
        </Col>
        ):activeColor === "result" ? (
        <Col sm={12} className='_flex p-5 tab-window'>
          <Col sm={8} className='text-center'>
            
            {resultData ? 
              <Row className='border border-bottom-0'>
                <Col>Enrollment No : {resultData?.enroll_no}</Col>
                <Col>Student Name : {resultData?.s_name}</Col>
                <Col>Student Class : {resultData?.s_class}</Col>
                <Col sm={12} className='border border-start-0 border-end-0 py-2'>
                  <b>Quarterly Test Results</b>
                
                <Col sm={12} className='_flex mt-2'>
                  <Col className='text-center border'><p className='p-0 m-0'>Hindi</p><p  className='ps-2 m-0'>{resultData?.results?.Quaterly?.Hindi}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>English</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.English}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Math</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.Math}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Physics</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.Physics}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Chemistry</p><p className='pe-4 m-0'>{resultData?.results?.Quaterly?.Chemistry}</p></Col>
                </Col>
                </Col>
                {resultData?.results?.Halfyearly ?
                  <Col sm={12} className='border border-start-0 border-end-0 py-2'>
                  <b>Quarterly Test Results</b>
                
                <Col sm={12} className='_flex mt-2'>
                  <Col className='text-center border'><p className='p-0 m-0'>Hindi</p><p  className='ps-2 m-0'>{resultData?.results?.Quaterly?.Hindi}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>English</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.English}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Math</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.Math}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Physics</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.Physics}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Chemistry</p><p className='pe-4 m-0'>{resultData?.results?.Quaterly?.Chemistry}</p></Col>
                </Col>
                </Col> : null
                }
                {resultData?.result?.Annual ?
                <Col sm={12} className='border border-start-0 border-end-0 py-2'>
                  <b>Quarterly Test Results</b>
                
                <Col sm={12} className='_flex mt-2'>
                  <Col className='text-center border'><p className='p-0 m-0'>Hindi</p><p  className='ps-2 m-0'>{resultData?.results?.Quaterly?.Hindi}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>English</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.English}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Math</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.Math}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Physics</p><p className='p-0 m-0'>{resultData?.results?.Quaterly?.Physics}</p></Col>
                  <Col className='text-center border'><p className='p-0 m-0'>Chemistry</p><p className='pe-4 m-0'>{resultData?.results?.Quaterly?.Chemistry}</p></Col>
                </Col>
                </Col> : null
                }
              </Row>
              
            // <><table>
            //     <tr>
            //       <th className='border-1'>Hindi</th>
            //       <th className='border-1'>English</th>
            //       <th className='border-1'>Math</th>
            //       <th className='border-1'>Physics</th>
            //       <th className='border-1'>Chemistry</th></tr>
            //     <tr>
            //       <td className='border-1'>{resultData?.results?.Quaterly?.Hindi}</td>                
            //       <td className='border-1'>{resultData?.results?.Quaterly?.English}</td>                
            //       <td className='border-1'>{resultData?.results?.Quaterly?.Math}</td>                
            //       <td className='border-1'>{resultData?.results?.Quaterly?.Physics}</td>                
            //       <td className='border-1'>{resultData?.results?.Quaterly?.Chemistry}</td>                
            //     </tr>
            //   </table></>
            :<><input placeholder='Student Enrollment No' className='w-100 border-1 text-center' onChange={(e)=> setsearchkey(e.target.value)}/>
            <button type='submit' className='default-btn mt-2' onClick={searchHandle}>Search</button></>}
          </Col>
        </Col>
        ):activeColor === "list" ? (
        <Col sm={12} className='_flex p-5 tab-window'>
          <Col sm={4} className='text-center'>
            <Typography>
              Click to Download Student List
            </Typography>
            <button className='default-btn px-3' onClick={Downloadstdlist}>Download Student List</button>
          </Col>
        </Col>
        ):(
        <Col sm={12} className='_flex p-5 tab-window'>

        </Col>)}
      </Row>)}
   </Container>
  )
}

export default Exam