import { createSlice } from "@reduxjs/toolkit";

const initialState={  
    currentUser:null,
    isLoading:false,
    error:null
}

const userSlice=createSlice({
name:"user",
initialState,

reducers:{

    GET_REQUEST:(state)=>{
        state.isLoading=true
    },
    GET_REQUEST_SUCCESS:(state,action)=>{
        state.isLoading=false
        state.currentUser=action.payload
        state.error=null
    },
    GET_REQUEST_FAILED:(state,action)=>{
        state.isLoading=false
        state.currentUser=null,
        state.error=action.payload   
    },

    SIGNOUT_SUCCESS:(state)=>{
        state.isLoading=false,
        state.currentUser=null,
        state.error=null
    }

}
})

export const {GET_REQUEST,GET_REQUEST_SUCCESS,GET_REQUEST_FAILED,SIGNOUT_SUCCESS}=userSlice.actions;

export default userSlice.reducer