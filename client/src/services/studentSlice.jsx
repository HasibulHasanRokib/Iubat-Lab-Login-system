import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentStudent:null,
    isLoading:false,
    error:null,
}

export const studentSlice=createSlice({
   name:"student",
   initialState,


   reducers:{

    GET_REQUEST:(state)=>{
        state.isLoading=true
    },

    GET_REQUEST_SUCCESS:(state,action)=>{
        state.isLoading=false,
        state.currentStudent=action.payload

    },

    GET_REQUEST_FAILED:(state,action)=>{
        state.isLoading=false,
        state.currentStudent=null,
        state.error=action.payload
    }

   }

})

export const{GET_REQUEST,GET_REQUEST_SUCCESS,GET_REQUEST_FAILED}=studentSlice.actions;

export default studentSlice.reducer;