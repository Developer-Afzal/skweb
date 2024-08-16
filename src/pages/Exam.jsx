import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import resultimg from '../Images/result.jpg'
import {GET, POST, DELETE} from '../utils/Api'
import { Select, Typography } from '@mui/material'
import axios  from 'axios'
import deleteIcon from '../Images/delete.png'
import Snackbarcompo from '../Components/Snackbarcompo'

const Exam = () => {

  const [loading, setloading] = useState(false)
  const [file, setFile] = useState(null);
  const [activeColor, setactiveColor] = useState("upload")
  const [opentabscreen, setopentabscreen] = useState(false)
  const [searchkey, setsearchkey] = useState('')
  const [resultData, setresultData] = useState(null)
  const [eventList, seteventList] = useState(false);
  const [eventData, seteventData] = useState([]);
  const [examTerm, setexamTerm] = useState('')
  const [snackBar, setsnackBar] = useState({
    Click: false,
    message: "",
    msgType: "",
  });
  useEffect(()=>{
    const FetchEvent = async ()=>{
      const Response = await GET('geteventlist')
      seteventData(Response?.data?.EventData)
    }
    FetchEvent()
  },[])

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
      // console.log('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', examTerm)
    try {
      const Response = await POST('uploadresult', formData);
      if(!Response?.data) return openSnackBar({ Click: true, msg:Response?.message, msgType:'error' });
      
    } catch (error) {
    }}

const searchHandle = async ()=>{
  const data =  {enroll_no : searchkey}
  const Response = await POST('findresult',data )
  setresultData(Response?.data?.data)
  // console.log(Response?.data?.data?.results);
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


const updateEvent = async ()=>{
  const data =  {para : searchkey}
  const Response = await POST('addevent',data )
  if(Response?.data?.message === "success"){
    seteventData( [...eventData, Response?.data?.Data])
    openSnackBar({ Click: true, msgType: "success", msg: "Successfully created" });
  }
  
  seteventList(false)
}

const deleteEvent = async (id)=>{
  const Response = await DELETE('deletevent', id)
  if(Response?.data?.message === "success"){
    const filteredData = eventData.filter(itm => itm._id != id)
    seteventData(filteredData)
  }
  console.log(Response?.data?.message);
}

const openSnackBar = (value) => {
  setsnackBar((prevState) => ({
    ...prevState,
    Click: value.Click,
    message: value.msg,
    msgType: "error",
  }));
};

 
  return (
   <Container fluid>
      {!opentabscreen ? (<Row>
        <Col xs={12} sm={6}>
        <img src={resultimg} alt="result" className='w-100'/>
        </Col>
        <Col xs={12}  sm={6} className='d-flex align-items-center'>
        <Row>
        <div className="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between flex-column flex-sm-row"><b> Class IX </b><button className="default-btn" onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        <div className="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between flex-column flex-sm-row"><b> Class X </b><button className="default-btn"  onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        <div className="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between flex-column flex-sm-row"><b> Class XI </b><button className="default-btn" onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        <div className="border-2 dashboard-Card col-5 m-3 d-flex justify-content-between flex-column flex-sm-row"><b> Class XII </b><button className="default-btn" onClick={()=> setopentabscreen(true)}>Check Now</button></div>
        </Row>
        </Col>
      </Row>) :(<Row>
        <Col sm={12} className='_flex justify-content-starts gap-0'>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0 border border-end-1' style={{background:activeColor === "upload" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('upload')}>Upload Result</button></Col>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0 border border-end-1' style={{background:activeColor === "result" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('result') }>Check Result</button></Col>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0 border border-end-1' style={{background:activeColor === "list" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('list') }>Student List</button></Col>
          <Col sm={3}><button className='w-100 default-btn rounded-0 m-0' style={{background:activeColor === "Event" ? '#dd940b' : 'rgb(194 185 169)'}} onClick={()=> setactiveColor('Event') }>Update Event</button></Col>
        </Col>
        {activeColor === "upload" ? (
          <Col sm={12} className='_flex p-5 tab-window'>
          <div className='w-75 w-md-25'>
            <div className='border pb-2 rounded-2 px-2'>
            <label className='ms-2'>Select Exam Term</label>
            <select className='upload-select default-btn w-100 ' onChange={(e)=> setexamTerm(e.target.value)}>
              <option value="">Select</option>
              <option value="Quaterly">Quaterly</option>
              <option value="Halfyearly">Halfyearly</option>
              <option value="Annual">Annual</option>
            </select>
            </div>
          <div className='border my-2 rounded-2 px-2'>
          <label className='ms-2'>Choose CSV file</label>
          <input type='file' accept='.csv' onChange={handleFilechange}/>  
          </div>
          <button className='default-btn ms-2' onClick={uploadresult}>Upload</button>
          </div>
        </Col>
        ):activeColor === "result" ? (
        <Col sm={12} className='_flex p-5 tab-window'>
          <Col sm={8} className='text-center'>
            {resultData ? 
              <Row className='border border-bottom-0'>
                <Col>Enrollment No : {resultData?.enroll_no}</Col>
                <Col>Student Name : {resultData?.s_name}</Col>
                <Col className='text-end'>Student Class : {resultData?.s_class} <button className='default-btn' onClick={()=> setresultData('')}>Back</button></Col>
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
            :<><input placeholder='Student Enrollment No' className='w-100 border-1 text-center' onChange={(e)=> setsearchkey(e.target.value)}/>
            <button type='submit' className='default-btn mt-2' onClick={searchHandle}>Search</button></>}
          </Col>
        </Col>
        ):activeColor === "list" ? (
        <Col sm={12} className='_flex p-5 tab-window'>
          <Col sm={4} className='text-center'>
            <Typography className='heading'>
              Click to Download Student List
            </Typography>
            <button className='default-btn px-3' onClick={Downloadstdlist}>Download Student List</button>
          </Col>
        </Col>
        ):(
        <Col sm={12} className='_flex p-5 tab-window flex-column'>
          <h1 className='heading'>Event List </h1>
           {eventList ?  <Col sm={12} className='_flex text-center flex-column'>
            <input palceholder="update latest evensts" className='w-50 border-1 text-center' onChange={(e)=> setsearchkey(e.target.value)}/>
            <div>
            <button className='default-btn' onClick={updateEvent}>Update</button>
            <button className='default-btn mx-3' onClick={()=> seteventList(false)}>Cancel</button>
            </div>
            </Col> :
            <Col sm={8}>
              <div className='w-100 text-end border'><button className='default-btn' onClick={()=> seteventList(true) }>ADD NEW</button></div>
                {eventData ? 
                eventData.map((itm, index)=> <div className='_flex justify-content-between align-items-center border px-2 my-1' key={index}>
                  <p className='p-0 m-0' key={itm._id}>{itm.paragraph} </p> 
                  <img src={deleteIcon} className='icons' onClick={()=> deleteEvent(itm._id)}/>
                  </div>):<p></p>}
            </Col>}
        </Col>)}
      </Row>)}
      <Snackbarcompo data={snackBar} openSnackBar={openSnackBar} />
   </Container>
  )
}

export default Exam