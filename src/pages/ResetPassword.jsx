import React, {useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { POST } from '../utils/Api'
const ResetPassword = () => {
    const form = useForm();
    const navigate =useNavigate()
    const [passmismatch, setPassmismatch] = useState(false)
    const {register, handleSubmit, formState:{errors}} = form;
    const urlData = useParams()    

//====== Chnage Handling
const HandleChange = ()=>{
    setPassmismatch(false)
   
    
}

    // Handleing from here 
    const handleform = async(data)=>{
        const {password, confirmpassword}= data        
        if(password !== confirmpassword) return setPassmismatch(true)
        const FormData = {id:urlData?.userid, token:urlData?.id,  password: password}
         await POST('resetpass',FormData )        
    }
  return (
   <Container>
    <Row>
        <Col sm={6} className='view-block offset-sm-3 pt-4'>
            <h1 className='heading'>Reset Account Password</h1>
            <form>
            <input type='password' name="password" style={{background:errors.password  ? "#e6c49b" : 'none'}} placeholder='New Password' {...register("password", {required:{value:true, message:'Please Enter New Password'}} )}/><p className='p-0 m-0 errorStyle'>{errors.password?.message}</p>
            <input type='password' onKeyDown={HandleChange} name="confirmpassword" style={{background:errors.confirmpassword || passmismatch  ? "#e6c49b" : 'none'}} placeholder='Confirm Password' {...register("confirmpassword", {required:{value:true, message:'Please Enter Confirm Password'}} )} className='mt-3'/>
            <p className='p-0 m-0 errorStyle'>{errors.confirmpassword?.message}</p>
            {!errors.confirmpassword && passmismatch ? <p className='p-0 m-0 errorStyle'>Mismatch Password</p>: null}
            <button type='submit' className='default-btn mt-3' onClick={handleSubmit(handleform)}>Submit</button>
            <button type='reset' className='default-btn mt-3' onClick={()=>navigate('/login')}>Back</button>
            </form>
        </Col>
    </Row>
   </Container>
  )
}

export default ResetPassword