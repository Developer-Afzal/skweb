import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { GET, POST } from '../utils/Api'
const Success = () => {
    const {id} = useParams()
    const [paymantData, setpaymantData] = useState(second)
    useEffect(()=>{
       const FetchInfo = async ()=>{
        const Response = await GET(`success/${id}`)
        console.log(Response);
        if(Response){
            setpaymantData(Response?.data)
        }
       }
       console.log(id);
       FetchInfo()
    },[id])
  return (
   <>
    <Container className='payment-block _flex'>
        <Row>
            <Col>
               <p>{paymantData?.message}</p>
            <Link to ='/'>Back to Home</Link>
            </Col>
        </Row>
    </Container>
   </>
  )
}

export default Success