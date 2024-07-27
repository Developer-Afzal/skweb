import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { GET, POST } from '../utils/Api'
const Success = () => {
    const {id} = useParams()
    useEffect(()=>{
       const FetchInfo = async ()=>{
        const Response = await GET(`success/${id}`)
        console.log(Response);
       }
       console.log(id);
       FetchInfo()
    },[id])
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