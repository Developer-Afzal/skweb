import { createSlice,  } from "@reduxjs/toolkit";

const initialState = 
    {   UserType:null,
        UserToken:null
    }

export const Login = createSlice ({
    name:'Auth',
    initialState,
    reducers:{
        GetLogin:(state, action)=>{
            state.UserToken = action.payload
        },

        GetLogout:(state, acion)=>{
            // console.log('running');
            state.UserToken = null
        }
    }
})

export const {GetLogin, GetLogout} = Login.actions;
export default Login.reducer