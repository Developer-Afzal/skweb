import { combineReducers } from '@reduxjs/toolkit';
import CRUDSlice from './crudSlice';
import  Login  from './LoginSlice';
import  StdFeeSlice  from './StdfeeSlice';



const rootReducer = combineReducers({
    crud: CRUDSlice,
    Auth: Login,
    fees:  StdFeeSlice
  // Add other slice reducers here if needed
});

export default rootReducer;