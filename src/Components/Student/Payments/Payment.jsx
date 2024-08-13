import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import {set, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { POST } from '../../../utils/Api'
import Snackbarcompo from '../../Snackbarcompo'
import {loadStripe} from '@stripe/stripe-js';
import PamentStatus from './PamentStatus'
import Spinner from 'react-bootstrap/Spinner';
import { useSnackbar } from '../../../Context/SnackbarContext'
const stripePromise = loadStripe(process.env.REACT_APP_PAYMENT_KEY)
const Payment = (props) => {
  const {enroll_no, s_name, s_class, coaching_fee} = props.data
  const {action} = props
  const navigate = useNavigate()
  const form = useForm();
  const [showpament, setshowpayment] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [showspinner, setshowspinner] = useState(false)
  const showSnackbar =  useSnackbar()
  const {register, handleSubmit, reset, setValue, formState:{errors}} = form;
  useEffect(()=>{
    SetFormValues()
  }, [])


  const formhandler = async (data)=>{
    setshowspinner(true)
    console.log(data);
    
    const Response = await POST('getfeeinfo', data)
    const monthStatus = Response?.data?.FeeMonth
    if(monthStatus === true){
      setshowspinner(false)
      showSnackbar(`Fee already submitted for ${data?.F_month} month`, 'error');
      return
    } 
    setshowspinner(false)
    MakePayment(data)
  
  }

  const MakePayment = async(data)=>{
    // const stripe = await loadStripe('sdfsffsksbcjks')

    const session =  await POST('create-checkout-session', data)

    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId:session?.data?.id
    })
    showSnackbar(`Fee submitted`, 'error');

    if(result.error){
      console.log(result.error);
    }

    setshowpayment(true)
  }

  const SetFormValues =()=>{
    setValue('enroll_no', enroll_no )
    setValue('s_name', s_name )
    setValue('s_class', s_class)
    setValue('amt', coaching_fee)
    
  }





  return (
   <>
     {!showpament ? ( <Container className='payment-block'>
      <Row>
      <div>
        <h3 className='heading pt-5'>Pay Fee</h3>
          <form onSubmit={handleSubmit(formhandler)}>
            <input placeholder='Enrollment No' type="tel" className='m-2' name="enroll_no" disabled="true" {...register('enroll_no', {required:{value:true, message:"Enrollment number is required"}})}/>
            <p className='ps-3 m-0 errorStyle'>{errors.enroll_no?.message}</p>
            <input placeholder='Student Name' type='text' className='m-2' name="s_name"  disabled="true"  {...register('s_name', {required:{value:true, message:"Student Name is required"}})}/>
            <p className='ps-3 m-0 errorStyle'>{errors.s_name?.message}</p>
            <select className='m-2'  name="s_class" disabled="true"  {...register('s_class', {required:{value:true, message:"Student Class is required"}})}>
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
            <input placeholder='Fee Amount' className='m-2' name="amt" disabled="true"  {...register('amt', {required:{value:true, message:"Fee Amount is required"}})}/>
            <p className='ps-3 m-0 errorStyle'>{errors.amt?.message}</p>
            <div className='m-2'>
              <button type="submit" className='default-btn'>
                Next {showspinner ? <Spinner animation="border" size='sm' /> : null}
              </button> 
              <button type="reset" className='default-btn' onClick={()=>{reset(); action();}}>Back</button>
            </div>
          </form>
         </div>
      </Row>
    </Container> ):(<><PamentStatus/> </>)}
          
   </>
    
  
  )}

export default Payment