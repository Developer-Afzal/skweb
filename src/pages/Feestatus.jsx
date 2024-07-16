import React, { useEffect, useState,  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {GET, POST, PUT} from '../utils/Api'
import { Container, Row, Col } from 'react-bootstrap'
import {set, useForm} from 'react-hook-form'
import Snackbarcompo from '../Components/Snackbarcompo';
import Spinner from 'react-bootstrap/Spinner';
// import StripeCheckout from 'react-stripe-checkout'
const Feestatus = () => {
  const params = useParams()
  const form = useForm();
  const {register, handleSubmit, reset, setValue, formState:{errors}} = form;
  const [StudentData, setStudentData] = useState([])
  const [showForm, setshowForm] = useState(false)
  const [showpayment, setshowPayment] =useState(false)
  const [snackBar, setsnackBar] = React.useState({Click:false, message:'', msgType:''});
  const [refreshData, setrefreshData] = useState(false);
  const [showspinner, setshowspinner] = useState(false)
  
  const CurrentDate = new Date() 
  const MM = CurrentDate.getMonth() + 1;
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchData = async ()=>{
      const Response = await GET(params?.userId ? `studentlist/${params?.userId}` : 'studentlist')
      console.log(Response === "Invaild Token");
      if(Response?.message === "Invaild Token") navigate('/')
      setStudentData(Response?.data)
    }
    fetchData()
  },[params, refreshData])


  const SetFormValues =()=>{
    setValue('enroll_no', StudentData?.enroll_no)
    setValue('s_name', StudentData?.s_name)
    setValue('s_class', StudentData?.s_class)
    setValue('amt', StudentData?.coaching_fee)
    
  }
  const formhandler = async (data)=>{
    data['_id'] = StudentData?._id
    const Response = await PUT('payment', data)
        if(Response.message) {
          openSnackBar({click:true,message:Response.message, msgType:'error' })
        }else {
          openSnackBar({click:true,message:"Fee submitted", msgType:'success' })
          setshowForm(false);
          setrefreshData(!refreshData)
        }
  }
  const openSnackBar = (e)=>{
    setsnackBar((prevState)=>({
      ...prevState,
      Click:e.click,
      message:e.message,
      msgType:e.msgType
    }))
   }

  return (
    <>
    <Container>
      {!showForm && params?.userId 
       ? (<Row>
        <Col sm={12} className='text-center pb-3'>
        <h2 className='heading'>Fee Status</h2>
        </Col>
        <Col sm={6} className='_flex'>
          <Col sm={12} className='_flex  flex-wrap'>
          <button className='default-btn' style={{background:StudentData?.month?.Apr ? 'green' : 'red'}}>Apr</button>
          <button className='default-btn' style={{background:StudentData?.month?.May ? 'green' : 'red'}}>May</button>
          <button className='default-btn' style={{background:StudentData?.month?.Jun ? 'green' : 'red'}}>Jun</button>
          <button className='default-btn' style={{background:StudentData?.month?.Jul ? 'green' : 'red'}}>Jul</button>
          <button className='default-btn' style={{background:StudentData?.month?.Aug ? 'green' : 'red'}}>Augt</button>
          <button className='default-btn' style={{background:StudentData?.month?.Sep ? 'green' : 'red'}}>Sep</button>
          <button className='default-btn'style={{background:StudentData?.month?.Oct ? 'green' : 'red'}}>Oct</button>
          <button className='default-btn' style={{background:StudentData?.month?.Nov ? 'green' : 'red'}}>Nov</button>
          <button className='default-btn' style={{background:StudentData?.month?.Nov ? 'green' : 'red'}}>Dec</button>
          <button className='default-btn' style={{background:StudentData?.month?.Jan ? 'green' : 'red'}}>Jan</button>
          <button className='default-btn' style={{background:StudentData?.month?.Feb ? 'green' : 'red'}}>Feb</button>
          <button className='default-btn' style={{background:StudentData?.month?.Mar ? 'green' : 'red'}}>Mar</button>
          </Col>
        </Col>
        <Col sm={6}>
          <table>
            <tr><td>Student Name</td><td>:</td><td className='ps-5'>{StudentData?.s_name}</td></tr>
            <tr>
            <td>Date of Birth</td><td>:</td><td className='ps-5'>{StudentData?.s_dob}</td>
            </tr>
            <tr>
            <td>Board</td><td>:</td><td className='ps-5'>{StudentData?.board}</td>
            </tr>
            <tr><td>Class</td><td>:</td><td className='ps-5'>{StudentData?.s_class}</td></tr>
            <tr><td>Coaching Timing</td><td>:</td><td className='ps-5'>{StudentData?.coaching_time}</td></tr>
            <tr><td>Joining Date</td><td>:</td><td className='ps-5'>{StudentData?.joining_date}</td></tr>
          </table>
          <button className='default-btn mt-5' onClick={()=> {SetFormValues(); setshowForm(true)}}>Accept Fee</button>
          <button className='default-btn mt-5' onClick={()=> navigate(-1)}>Back</button>
        </Col>
      </Row>) : (<Row>
          <Col sm={8} className='offset-2'>
          <form >
            <input placeholder='Enrollment No' type="tel" className='m-2' name="enroll_no" disabled = {showForm} {...register('enroll_no', {required:{value:true, message:"Enrollment number is required"}})}/>
            <p className='ps-3 m-0 errorStyle'>{errors.enroll_no?.message}</p>
            <input placeholder='Student Name' type='text' className='m-2' name="s_name" disabled = {showForm} {...register('s_name', {required:{value:true, message:"Student Name is required"}})}/>
            <p className='ps-3 m-0 errorStyle'>{errors.s_name?.message}</p>
            <select className='m-2'  name="s_class" disabled={showForm}  {...register('s_class', {required:{value:true, message:"Student Class is required"}})}>
              <option value="">Select Class</option>
              <option value="XI">IX</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
            <p className='ps-3 m-0 errorStyle'>{errors.s_class?.message}</p>
            <select className='m-2' name="F_month" {...register('F_month', {required:{value:true, message:"Fee month is required"}})}>
              <option value="">Select Month</option>
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>Apr</option>
              <option>May</option>
              <option>Jun</option>
              <option>Jul</option>
              <option>Aug</option>
              <option>Sep</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
            <p className='ps-3 m-0 errorStyle'>{errors.F_month?.message}</p>
            <input placeholder='Fee Amount' className='m-2' name="amt" disabled={showForm}  {...register('amt', {required:{value:true, message:"Fee Amount is required"}})}/>
            <p className='ps-3 m-0 errorStyle'>{errors.amt?.message}</p>
            <div className='m-2'>
              <button type="submit" className='default-btn' onClick={handleSubmit(formhandler)}>
                Submit
                {showspinner ? <Spinner animation="border" size='sm' /> : null}
              </button>
              <button className='default-btn' onClick={(e)=> { e.preventDefault(); reset(); navigate(-1) }}>
                Back
              </button>
            {/* <StripeCheckout
              stripeKey=''
              token=""
              name="Submit"

            >
              <button className='default-btn' type="submit" onClick={handleSubmit(submithandler)}>
                Submit
              </button>
            </StripeCheckout> */}
            </div>
          </form>
          </Col>
      </Row>)}
      <Snackbarcompo data={snackBar} openSnackBar={openSnackBar}/>
    </Container>
    </>
  )
}

export default Feestatus