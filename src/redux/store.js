import { createSlice,configureStore } from "@reduxjs/toolkit";

const Slice=createSlice({
    name:'Slice',
    initialState:{
        value:null,
        role:null,
        loggato:false,
        coordinate:{},
        geo:{}
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
        },
        geoLocation:(state,action)=>{

            state.geo=action.payload;
        }
    
        
    }
});

const store=configureStore({
    reducer:Slice.reducer,
});
export default store;
export const {getUser,islogged,getCoordinates,geoLocation}=Slice.actions;