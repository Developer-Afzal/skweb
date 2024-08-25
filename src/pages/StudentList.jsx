import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Col, Row} from 'react-bootstrap'
import {Read} from '../features/crudSlice'
import { useNavigate, useOutletContext } from 'react-router-dom'
import DeleteIcon from '../Images/delete.png'
// import Pagination from '@mui/material/Pagination';
import PaginationCompo from '../Components/Pagination'
import Stack from '@mui/material/Stack';
import ViewIcon from '../Images/view.png'
import EditIcon from '../Images/edit.png'
import moreIcon from '../Images/moreIcon.png'
import {useForm} from 'react-hook-form'
import Modal from '../Components/Modal'
import Snackbarcompo from '../Components/Snackbarcompo';
import { GET, POST, DELETE, PUT } from '../utils/Api'
import { GetLogout } from '../features/LoginSlice'
import { useSearchParams } from "react-router-dom";
const StudentList = () => {
    const form = useForm();
    const {register, handleSubmit, reset, setValue, formState:{errors}} = form;
    const [isEdit, SetEdit] = useState(false);
    const [UserId, setUserID] = useState('');
    const [ShowForm, setShowForm] = useState(false);
    const [popOver, setpopOver] = useState(false);
    const [openModal, setopenModal] = useState(false)
    const [skeleton, setskeleton] = useState(false)
    const [userData, setuserData ] = useState([]) 
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page') || 1 )
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const [snackBar, setsnackBar] = React.useState({Click:false, message:'', msgType:''});
    const context = useOutletContext();
    const CurrentDate = new Date() 
  const MM = CurrentDate.getMonth() + 1;

  //======== Fetching student Data
    useEffect(()=>{
      const fetchData = async()=>{
        setskeleton(true)
        const Response = await GET('studentlist', {params : {limit: '5', page_no:context ? 1 : searchParams.get('page'), searchKey:context}}) || ''
          if(!Response?.data){
            setskeleton(false)
          }
        setuserData(Response?.data)
        setskeleton(false)
      }
      fetchData()
      // let setTimeOutId =  setTimeout(() => {
      //   setskeleton(false)
      // }, 1000);
      // return()=>{
      //   clearTimeout(setTimeOutId)
      // }
    },[page +1 , context])
  
   //======== Checking fee Status 
    const checkfeesStatus = (value)=>{
      if(Object.keys(value).length >= MM - 3) return 'paid'
      return "unpaid"
    }
    
  //======== 
    const Added = async (values)=>{
      let std_Data = values;
      if(isEdit){
        std_Data['_id'] = UserId;
        const Response = await PUT('studentlist', std_Data)
        if(Response === "update successfully")  openSnackBar({click:true,message:'Edited Successfully', mgss:'success' })
      }else{
        std_Data['enroll_no'] = generateRandomNineDigitNumber();
        std_Data['fee_status'] = 'UnPaid'
        const Response =  await POST('addstudent', std_Data)
        if(Response?.data){
          const Response =  await GET('studentlist', {params : {limit: '5', page_no: searchParams.get('page')}})
          setuserData(Response?.data)
        }
        openSnackBar({click:true,message:'Added Successfully', mgss:'success' })
      }
        setShowForm(false)
        reset() 
    } 

//======= Editing form 
    const EditForm = (user)=>{
      // console.log(user?._id);
      setUserID(user?._id)
      setValue('s_name', user?.s_name);
      setValue('s_email', user?.s_email);
      setValue('f_name', user?.f_name);
      setValue('s_address', user?.s_address);
      setValue('s_dob', user?.s_dob);
      setValue('pincode', user?.pincode);
      setValue('coaching_time', user?.coaching_time);
      setValue('s_contact', user?.s_contact);
      setValue('s_class', user?.s_class);
      setValue('board', user?.board);
      setValue('coaching_fee', user?.coaching_fee);
      setValue('joining_date', user?.joining_date);
      SetEdit(true); 
      setShowForm(true);
    }

    const Deletionvalue = (User) =>{
      setopenModal(true)
      setUserID(User)
    }

    const Hidemodal = async (value)=>{
      setopenModal(value?.close)
      if(value?.Click){
      const Response = await DELETE('deletestudent', UserId);
      if(Response){
        const res = await GET('studentlist', {params : {limit: '5', page_no: searchParams.get('page')}})
        setuserData(res?.data)
      }
        openSnackBar({click:true,message:'Deleted Successfully', mgss:'success' })
      }
    }
    const ViewUser = (itm)=>{
      Dispatch(Read(itm))
      navigate(`${itm}`)
    }

  const handleForm =(data)=>{
    Added(data)
  }


// Generate a random digit (0-9)
  function generateRandomNineDigitNumber() {
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += Math.floor(Math.random() * 10); 
    }
    return result;
  }


    const handlePageChange = (value)=>{ 
      console.log(value);
      setPage(value)
      setSearchParams({page:value})
  }


  const openSnackBar = (e)=>{
    setsnackBar((prevState)=>({
      ...prevState,
      Click:e.click,
      message:e.message,
      msgType:e.mgss
    }))
   }

  const handlechanges =(e)=>{
    if (!/^\d$/.test (e.key) && e.key !== 'Backspace'){
      e.preventDefault();
    }
  }

  const Expandmenu = (e, value)=>{
    e.stopPropagation();
    setUserID(value)
    setpopOver(true); 
  }


  return (
    <Container fluid className='m-0 p-0' onClick={()=> setpopOver(false)}>
          <Stack className='_flex pt-2 px-2 justify-content-between' direction='row'   >
          <h4 className='heading'>{ShowForm ? 'ADD NEW STUDENT' : 'Student List'}</h4>
          <button className='default-btn  px-2 me-2' onClick={()=> {setShowForm(!ShowForm); SetEdit(false); reset() }}>{!ShowForm ? 'ADD Student' : 'Back'}</button>
          </Stack>
          {!ShowForm ? <>
            <Container fluid className='table-block p-0'>
            <table>
            <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student</th>
                  <th className='text-center'>Class</th>
                  <th className='text-center'>Board</th>
                  <th className='text-center'>Fee</th>
                  <th className='text-center'>Fee Status</th>
                  <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
            {userData && !skeleton ? userData?.map((itm)=>
                <tr key={itm?._id} >
                  <td>{itm?.enroll_no}</td>
                  <td>{itm?.s_name}</td>
                  <td className='text-center'>{itm?.s_class}</td>
                  <td className='text-center'>{itm?.board}</td>
                  <td className='text-center'>{itm?.coaching_fee}</td>
                  <td className='text-center'><button className="default-btn" onClick={()=> navigate(`/feestatus/${itm._id}`)}>{itm.month ? checkfeesStatus(itm.month) : 'unpaid'}</button></td>
                  <td className='text-center'>
                  <div className='popover d-sm-none _flex'>
                    <div className={popOver && UserId === itm?._id  ? 'popoverOpen' : 'icons-block'}>
                    <img className='icons' src={EditIcon} onClick={()=> EditForm(itm?._id) } alt="edit"/>
                    <img className='icons' src={ViewIcon} onClick={()=>ViewUser(itm?._id)} alt="View"/>
                    <img className='icons' src={DeleteIcon} onClick={()=> Deletionvalue(itm?._id)} alt="delete"/>
                    </div>
                    <span className={popOver && UserId === itm?._id ? 'd-none' :  "info" }>
                      <img className='icons' src={moreIcon} onClick={(e)=> Expandmenu(e,itm?._id)} alt="Action"/>
                    </span>
                  </div>
                      <img className='icons d-none d-sm-inline' src={EditIcon} onClick={()=> EditForm(itm) } alt="edit"/>
                      <img className='icons d-none d-sm-inline' src={ViewIcon} onClick={()=>ViewUser(itm?._id)} alt="View"/> 
                      <img className='icons d-none d-sm-inline' src={DeleteIcon} onClick={()=> Deletionvalue(itm?._id)} alt="delete"/>
                  </td>  
                </tr>
                ):skeleton  ?  <>
                <tr className='skeleton'><td colSpan={7}></td></tr>
                <tr className='skeleton'><td colSpan={7}></td></tr>
                <tr className='skeleton'><td colSpan={7}></td></tr>
                <tr className='skeleton'><td colSpan={7}></td></tr>
                <tr className='skeleton'><td colSpan={7}></td></tr>
                </> : <>
                  <tr><td colSpan={7} className='text-center'>data not found</td></tr>
                </>}
            </tbody>
          </table> 
          <Modal data={openModal} HideModal={Hidemodal}/>
            </Container>
            { /* <button className='default-btn' onClick={GoAsynchPage}>Go To AsyncThunk Example</button> */}

              {/* <Pagination page={currentPage} siblingCount={2} count={Math.ceil(userData?.length/5)} onChange={handlePageChange} className='pagination'/> */}
              {/* <Pagination page={page ? page : 1} count={userData?.length === 5 ? page+1 : page}  className='pagination' onChange={handlePageChange} siblingCount={0} boundaryCount={2} /> */}
              <PaginationCompo currentPage={page} PageChange={handlePageChange} count={userData?.length} />
           </>
          :  <form>
           <Container className='py-2'>
           <Row className='text-start'>
              <Col sm={4} className="p-1"><label>Student Name</label><input placeholder='Enter Student Name' name="s_name" {...register('s_name' ,{required:{value:true, message:'Please enter Name'}} ) }  autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.s_name?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Student Email</label><input placeholder='Enter Student email' name="s_email" {...register('s_email' ,{required:{value:true, message:'Please enter Email'}} ) }  autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.s_email?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Student's Father Name</label><input placeholder="Enter Student's Father Name"  {...register('f_name' ,{required:{value:true, message:"Please enter Father's Name"}} )} name="f_name" autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.f_name?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Address</label><input placeholder='Enter Student Address'  {...register('s_address',{required:{value:true, message:'Please enter Address'}} )} name="s_address" autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.s_address?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Pincode</label><input placeholder='Enter Pincode' maxLength={6} {...register('pincode',{required:{value:true, message:'Please enter Pincode'}} )}  name="pincode" onKeyDown={handlechanges} autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.pincode?.message}</p></Col>
              {/* <Col sm={4} className="p-1"><label>Coaching Time</label><input placeholder='Coaching Time'  {...register('coaching_time',{required:{value:true, message:'Please enter Coaching Time'}} )}  name="coaching_time"/><p className='p-0 m-0 errorStyle'>{errors.coaching_time?.message}</p></Col> */}
              <Col sm={4} className="p-1"><label>Coaching Time</label><select {...register('coaching_time',{required:{value:true, message:'Please Select Coaching Time'}} )} name="coaching_time"><option value="">Select Coaching Time</option>Select Time<option value="10:00 To 12:00">10:00 AM To 02:00 PM</option><option value="02:00 PM To 06:00 PM">02:00 PM To 06:00 PM</option></select><p className='p-0 m-0 errorStyle'>{errors.coaching_time?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Parent's Contact Number</label><input placeholder="Parent's Contact Number" maxLength={10} {...register('s_contact',{required:{value:true, message:'Please enter Contact'}} )}  name="s_contact" onKeyDown={handlechanges} autoCapitalize='off'/><p className='p-0 m-0 errorStyle'>{errors.s_contact?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Date of Birth</label><input type='text'  placeholder="dd/mm/yyyy"  onFocus={(e)=> { e.currentTarget.type = "date"; e.currentTarget.focus();}}  {...register('s_dob',{required:{value:true, message:'Please enter DOB'}} )} name="s_dob"/><p className='p-0 m-0 errorStyle'>{errors.s_dob?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Student Class</label><select {...register('s_class',{required:{value:true, message:'Please enter Student Class'}} )} name="s_class"><option value="">Select Class</option>Select Class<option value="IX">IX</option><option value="X">X</option><option value="XI">XI</option><option value="XII">XII</option></select><p className='p-0 m-0 errorStyle'>{errors.s_class?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Medium</label><select  {...register('board',{required:{value:true, message:'Please enter Board'}})} name="board"><option  value="">Select Board</option><option value="UP BOARD">UP BOARD</option><option value="ICSE">ICSE</option><option value="CBSE">CBSE</option></select><p className='p-0 m-0 errorStyle'>{errors.board?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Coaching Fees</label><input placeholder='Fees' maxLength={4} {...register('coaching_fee',{required:{value:true, message:'Please enter Fees Amt'}} )} name="coaching_fee" onKeyDown={handlechanges} autoCapitalize='off'/><p className='p-0 m-0 errorStyle'>{errors.coaching_fee?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Date of Joining</label><input type='text'  placeholder="dd/mm/yyyy"  onFocus={(e)=> { e.currentTarget.type = "date"; e.currentTarget.focus();}}  {...register('joining_date',{required:{value:true, message:'Please enter DOB'}} )} name="joining_date"/><p className='p-0 m-0 errorStyle'>{errors.joining_date?.message}</p></Col>
              {/* <Col sm={4} className="p-1"><label>Subjects</label><select><option selected>Select Sujects </option><option>Hindi</option><option>English</option><option>Math</option><option>Physics</option><option>Chemistry</option><option>Biology</option><option>Science</option><option>Commerce</option><option>Arts Stream</option></select></Col> */}
              <Col sm={12} className='px-1 py-0'><button type='submit' onClick={handleSubmit(handleForm) } className='default-btn'>ADD</button>
              <button className='default-btn' type='reset' onClick={()=> {  setShowForm(false); reset()  } }>Cancel</button></Col>
            </Row>
           </Container>
            </form>
          }
          <Snackbarcompo data={snackBar} openSnackBar={openSnackBar}/>
    </Container>
  )
}

export default StudentList