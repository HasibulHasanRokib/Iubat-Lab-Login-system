import { createSlice } from "@reduxjs/toolkit";

const initialState={  
    instructor:null,
    isLoading:false,
    error:null
}

const instructorSlice=createSlice({
name:"instructor",
initialState,

reducers:{

    GET_REQUEST:(state)=>{
        state.isLoading=true
    },
    GET_REQUEST_SUCCESS:(state,action)=>{
        state.isLoading=false
        state.instructor=action.payload
        state.error=null
    },
    GET_REQUEST_FAILED:(state,action)=>{
        state.isLoading=false
        state.instructor=null,
        state.error=action.payload   
    },

    SIGNOUT_SUCCESS:(state)=>{
        state.isLoading=false,
        state.instructor=null,
        state.error=null
    }

}
})

export const {GET_REQUEST,GET_REQUEST_SUCCESS,GET_REQUEST_FAILED,SIGNOUT_SUCCESS}=instructorSlice.actions;

export default instructorSlice.reducer