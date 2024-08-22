import React from 'react'
import { useSelector } from 'react-redux'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import StudentList from '../pages/StudentList';
import ViewUser from './ViewUser';
import AsyncThunkEx from '../Components/AsyncThunkEx';
import Layout from '../pages/Layout';
import Dashboard from '../pages/Dashboard';
import Exam from '../pages/Exam';
import Feestatus from '../pages/Feestatus';
import ImportantDate from '../pages/ImportantDate'
import Login from '../pages/Login';
import SearchPage from '../pages/SearchPage';
import PublicRoute from '../pages/PublicRoute';
import Home from '../pages/Home';
import StudentInfo from '../pages/StudentInfo';
import PageNotfound from '../pages/PageNotfound';
import Success from '../pages/Success';
import ForgetPass from '../pages/ForgetPass';
import ResetPassword from '../pages/ResetPassword';

const AppRouting = () => {
    const User_Auth = useSelector((state)=> state.Auth)
    const userType = "student"
  return (
   <>
   <BrowserRouter >
      <Routes>
          {User_Auth?.UserToken ?( 
          <Route element={<Layout/>}>
          <Route path='/'  element={<Dashboard/>}/>
          <Route path="/studentlist" element={<StudentList/>}/>
          <Route path="/studentlist/:userId" element={<ViewUser/>}/>
          <Route path="/exam" element={<Exam/>}/>
          <Route path="/importantDate" element={<ImportantDate/>}/>
          <Route path="/feestatus" element={<Feestatus/>}/>
          <Route path="/feestatus/:userId" element={<Feestatus/>}/>
          <Route path="/reduxAsyncthunk" element={<AsyncThunkEx/>}/>
          </Route> ) : ( 
            <Route  element={<PublicRoute/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/paymentsuccess/:enrollno/:month/:id" element={<Success/>} />
            <Route path="/studentinfo/:id" element={<StudentInfo/>} />
            <Route path="/forgetpassword" element={<ForgetPass/>}/>
            <Route path="/resetpassword/:userid/:id" element={<ResetPassword/>}/>
            </Route>
          )}
          <Route path='*' element={<PageNotfound/>}/>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default AppRouting