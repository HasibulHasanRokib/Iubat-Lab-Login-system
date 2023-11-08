import { createSlice } from "@reduxjs/toolkit";

const initialState={  
    admin:null,
    isLoading:false,
    error:null
}

const adminSlice=createSlice({
name:"admin",
initialState,

reducers:{

    ADMIN_REQUEST:(state)=>{
        state.isLoading=true
    },
    ADMIN_REQUEST_SUCCESS:(state,action)=>{
        state.isLoading=false
        state.admin=action.payload
        state.error=null
    },
    ADMIN_REQUEST_FAILED:(state,action)=>{
        state.isLoading=false
        state.admin=null,
        state.error=action.payload   
    },

    ADMIN_SIGNOUT:(state)=>{
        state.isLoading=false,
        state.admin=null,
        state.error=null
    }

}
})

export const {ADMIN_REQUEST,ADMIN_REQUEST_SUCCESS,ADMIN_REQUEST_FAILED,ADMIN_SIGNOUT}=adminSlice.actions;

export default adminSlice.reducer