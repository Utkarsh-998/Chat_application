import { createSlice } from "@reduxjs/toolkit";
const socketslice=createSlice({
    name:"socket",
    initialState:{
        socket:null
    },
    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload
        }
    }
})
export const {setSocket}=socketslice.actions
export default socketslice.reducer