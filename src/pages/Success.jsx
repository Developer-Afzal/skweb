import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { GET, POST } from '../utils/Api'
const Success = () => {
    const {id, enrollno, month } = useParams()
    const [paymantData, setpaymantData] = useState(false)
    useEffect(()=>{
       const FetchInfo = async ()=>{
        const Response = await GET(`success/${id}`)
        console.log(Response);
        if(Response?.data){
            setpaymantData(Response?.data)
            updatestudentfee()
        }
       }
       console.log(id);
       FetchInfo()
    },[id])

    const updatestudentfee = async ()=>{
        const Data  =  {
            enroll_no:enrollno,
            F_month:month
        }
        const Response = await POST('updatefeemonth',Data)
        console.log(Response);
    }

  return (
   <>
    <Container className='payment-block _flex'>
        <Row>
            <Col>
               <p>{paymantData?.message}</p>
            <Link to ={`/studentinfo/${enrollno}`}>Back to Home</Link>
            </Col>
        </Row>
    </Container>
   </>
  )
}

export default Success