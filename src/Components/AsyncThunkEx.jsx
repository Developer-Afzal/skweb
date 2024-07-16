import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {FetchPost} from '../features/crudSlice'

const AsyncThunkEx = () => {
    const Dispatch = useDispatch();
    useEffect(()=>{
        Dispatch(FetchPost())
    },[])
  return (
    <div>AsyncThunkEx</div>
  )
}

export default AsyncThunkEx