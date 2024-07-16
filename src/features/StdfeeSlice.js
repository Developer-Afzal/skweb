import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Jan: [], Feb: [], Mar: [], Apr: [], May: [], Jun: [], Jul: [], Aug: [], Sep: [], Oct: [], Nov: [], Dec: []
}

export const StdFeeSlice = createSlice ({
    name:'fees',
    initialState,
    reducers:{
        AcceptFee:(state, action)=>{
            switch(action.payload.month){
                case 'Jan':
                    state.Jan.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Feb':
                    state.Feb.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Mar':
                    state.Mar.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Apr':
                    state.Apr.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'May':
                    state.May.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Jun':
                    state.Jun.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Jul':
                    state.Jul.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Aug':
                    state.Aug.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Sep':
                    state.Sep.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Oct':
                    state.Oct.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Nov':
                    state.Nov.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Dec':
                    state.Dec.push({id:action.payload.Enroll, fee:'paid'})
                    break;
            }
            // state.action.payload = action.payload
        },
        RemovefeeStatus:(state, action)=>{
            for(let month in state){
            let INDEX = state[`${month}`].findIndex(itm=> itm.id == action.payload)
                state[`${month}`].splice(INDEX, 1);
            }
        }
    }
}) 

export const {AcceptFee, RemovefeeStatus} = StdFeeSlice.actions
export default StdFeeSlice.reducer;