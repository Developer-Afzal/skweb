import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import Drawer from './Drawer'

const Header = ({srch}) => {
  const User_Auth = useSelector((state)=> state.Auth)
  const [a, seta] = useState(false);
  const navigate = useNavigate()
  const changeHandle = (e)=>{
    navigate('/studentlist')
    if(!a){
      seta(true);
      setTimeout(() => {
        srch(e.target.value)
        seta(false)
      }, 1000);
     
    }
    // srch(e.target.value)
  }

  return (
    <Container fluid className='position-sticky top-0 z-3 '>
          <Row className='header-block'>
            <Col sm={1} xs={2}>
             {User_Auth?.UserToken ? <Drawer/> : null }
            </Col>
            <Col xs={10} sm={4}  className='_flex logo-heading'>
               <Link to="/" className='link'>S K Coaching Center</Link> 
            </Col>
            <Col sm={5} className='_flex d-none d-sm-flex'>
              {User_Auth?.UserToken ?  <input placeholder='Search Student by Roll No' className='header-input' onChange={changeHandle} /> : null}
            </Col>
            <Col xs={2} className='_flex d-none d-sm-flex'>
            <Link to="/login" className='link'> Admin </Link>
            </Col>
          </Row>
    </Container>
    
 
  )
}

export default Header