/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


 const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading:false,
    isAuthenticated: false,
    setUser: () => {},
    setAuthenticated: () => {},
    checkAuthUser: async () => false
} 

export const storeSlice = createSlice({
    name:"store",
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state,action) => {
            console.log("The action payload we got is: ",action.payload);
            state.user = action.payload;
        },
        setIsLoading: (state,action)=>{

        },
        setIsAuthenticated: (state,action)=>{
            console.log("The action.payload is: ",action.payload);
            state.isAuthenticated = true;
        }
    }
})

export const { setUser,setIsAuthenticated} = storeSlice.actions;
export default storeSlice.reducer;
export const selectIsAuthenticated = (state) => state.storeReducer.isAuthenticated;

