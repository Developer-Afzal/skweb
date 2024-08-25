import axios from 'axios';
// import { GetLogout } from '../features/LoginSlice';
// import {store} from '../app/store'
// import { useSnackbar } from '../Context/SnackbarContext';
// import { GetLogout } from '../features/LoginSlice';
// import { useDispatch } from 'react-redux';
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.REACT_APP_BASEURL


// const LogoutUser =()=>{
// const showSnackbar = useSnackbar();

    // const dispatch = useDispatch()
    // navigate user to login page
    // store.dispatch(GetLogout())
    // window.location.href = '/'  ;
//     return showSnackbar('You have been logged out', 'warning');

// }

// window.location.href = '/';

  // axios.interceptors.response.use(
  //   response => {
  //     return response;
  //   },
  //   error => {
  //     if (error.response && error.response.status === 401) {
  //       // Redirect to login page
  //       LogoutUser()
  //     }
  //     return Promise.reject(error);
  //   }
  // );

export const POST = async (url, data)=>{
    try {
       const Response =  await axios.post(url, data);
        return Response
    } catch (error) {
       return error?.response?.data
    }
  
   
}
export const GET = async (url, data)=>{
    try {
        const Response =  await axios.get(url, data);
         return Response
     } catch (error) {
        return error?.response?.data
        
     }
}
export const PUT = async (url, data)=>{
    try {
        const Response = await axios.put(url, data);
        return Response?.data?.message;
    } catch (error) {
        return error?.response?.data
    }
}
export const DELETE = async (url, user_id)=>{
    // console.log(user_id);
    try {
        const Response =  await axios.delete(url, {data:{id:user_id}});
         return Response
     } catch (error) {
        return error?.response?.data
     }
}

