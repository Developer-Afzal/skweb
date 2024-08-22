import React, { useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { POST } from '../utils/Api'
import { useNavigate } from 'react-router-dom'
const ForgetPass = () => {
    const email = useRef()
    const navigate = useNavigate()
    const [emailSend, setemailSend] = useState(false)
    const sendEmail = async(e)=>{
        e.preventDefault()
        const formData ={
            email:email.current.value
        }
        const Response = await POST('forgetpass',formData )
        if(Response?.status == 200){
            setemailSend(true)
        }else{
            setemailSend(false)
        }
    }
  return (
    <Container>
        <Row>
            {!emailSend ? (<Col sm={6} className='view-block offset-sm-3 pt-3'>
            <h1 className='heading'>Enter Your Email Address</h1>
            <form onSubmit={sendEmail}>
            <input ref={email} type='email' placeholder='Enter Your Register Email' className='border-1'/>
            <button className='default-btn mt-3' type='submit'>Send</button>
            </form>
            </Col>):(
                <Col sm={6} className='view-block offset-sm-3 pt-3'>
                    <h1 className='heading'> Please check your registred email</h1>
                    <button className='default-btn' onClick={()=> navigate(-1)}>Back</button>
                </Col>
            )}
        </Row>
    </Container>
  )
}

export default ForgetPass