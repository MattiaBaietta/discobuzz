import { createSlice,configureStore } from "@reduxjs/toolkit";

const Slice=createSlice({
    name:'Slice',
    initialState:{
        value:null,
        role:null,
        loggato:false,
        coordinate:{},
    },
    reducers:{
        getUser:(state,action)=>{
            state.value=action.payload;
            state.role=action.payload.role;
        },
        islogged:(state,action)=>{
            state.loggato=action.payload;
        },
        getCoordinates:(state,action)=>{
            state.coordinate=action.payload;
            
        }
    
        
    }
});

const store=configureStore({
    reducer:Slice.reducer,
});
export default store;
export const {getUser,islogged,getCoordinates}=Slice.actions;