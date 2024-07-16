import { createSlice, nanoid } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    users:[],
    ViewUser:[]
  }

export const FetchPost = createAsyncThunk('fetch/post', async () =>{
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  } catch (error) {
    return error.message;
  }
})

  export const crudSlice = createSlice ({
    name:'crud',
    initialState,
    reducers:{
        Insert:(state, action)=>{
            console.log(action.payload);
            let user = {
              id:action.payload.id,
              S_Name:action.payload.S_Name,
              S_Fname:action.payload.S_Fname,
              S_Mname:action.payload.S_Mname,
              Address:action.payload.Address,
              Pincode:action.payload.Pincode,
              Coaching_Time:action.payload.Coaching_Time,
              P_Contact:action.payload.P_Contact,
              Date_of_Birth:action.payload.Date_of_Birth,
              S_Board:action.payload.S_Board,
              S_Class:action.payload.S_Class,
              Fee:action.payload.Fee,
              Joining_Date:action.payload.joining_date,
            }
            // state.users = [user, ...state.users]
            state.users.unshift(user)
        },

        Updation:(state, action)=>{
          const {id} = action.payload
          // console.log('slice call', id);

          let INDEX = state.users.findIndex(itm=> {
           return itm.id === id
           })
          //  console.log(INDEX);
           state.users[INDEX] = action.payload
           
        },

        Deletion:(state, action)=>{
          let INDEX = state.users.findIndex(itm => {
            return itm.id === action.payload
          })
          state.users.splice(INDEX, 1)
       
        },

        Read:(state, action) => {
          state.ViewUser = action.payload
        }, 



    },
    extraReducers:(builder)=>{
      builder.addCase(FetchPost.fulfilled, (state, action) =>{
      })
    }
  })
  export const {Insert, Updation, Deletion, Read } = crudSlice.actions;
  export default crudSlice.reducer