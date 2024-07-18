import { useState,  } from 'react'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {GetLogin} from '../features/LoginSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import Snackbarcompo from '../Components/Snackbarcompo';
import {POST}  from '../utils/Api'
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
  const [snackBar, setsnackBar] = React.useState({Click:false, message:'', msgType:''});
  const navigate = useNavigate()
  const Dispath = useDispatch()
  const [showspinner, setshowspinner] = useState(false)

const openSnackBar = (value)=>{
  setsnackBar((prevState)=>({
    ...prevState,
    Click:value.Click,
    message:value.msg,
    msgType:'error'
  }))
 }
  const [userData, setuserData]= useState({
    username:'',
    password:''
  })
  const [hashedValue, setHashedValue] = useState('');

  const handlechange = (e)=>{
    setuserData({...userData, [e.target.name]:e.target.value});
    const hashed = SHA256(userData).toString();
    setHashedValue(hashed);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setshowspinner(true)
     const dataResponse = await POST('login', userData)
      Dispath(GetLogin(dataResponse?.data?.isAuth))
      setshowspinner(false)
      if(dataResponse?.data?.isAuth){
        setuserData({ username:'', password:''})
        openSnackBar({Click:true, msg:"Success"})
        navigate('/')
      }else{
      navigate('/login')
      openSnackBar({Click:true, msg:dataResponse?.message})
      }
      
  
 
  }



  return (
   <Container fluid>
    <Row className='login-block' gap={4}>
      <Col sm={{span:5, offset:7}} className='_flex'>
        <form onSubmit={handleSubmit}>
        <p className='text-center fw-bolder fs-1'>Login Page</p>
        <input placeholder='Enter user name' name='username' value={userData?.username} onChange={handlechange}/>
        <input placeholder='Enter password' name="password" type='password' value={userData?.password} onChange={handlechange}/>
        <button type="submit" className="default-btn">
          Submit &nbsp;
          {showspinner ? <Spinner animation="border" size='sm' /> : null}
          </button>
        </form>
      </Col>
    </Row>
    <Snackbarcompo data={snackBar} openSnackBar={openSnackBar}/>
   </Container>
  )
}

export default Login