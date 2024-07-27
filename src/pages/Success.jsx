import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { POST } from '../utils/Api'
const Success = () => {
    const param = useParams()
    useEffect(()=>{
        console.log(param);
       const FetchInfo = async ()=>{
        const Response = await POST(`success/${param}`, param)
        console.log(Response);
       }
       FetchInfo()
    },[param])
  return (
   <>
    <Container className='payment-block _flex'>
        <Row>
            <Col>
            Payment Success
            <Link to ='/'>Back to Home</Link>
            </Col>
        </Row>
    </Container>
   </>
  )
}

export default Success