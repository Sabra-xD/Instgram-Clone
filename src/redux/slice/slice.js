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
            state.user = action.payload;
        },
        setIsLoading: (state,action)=>{
            state.isLoading = action.payload;

        },
        setIsAuthenticated: (state,action)=>{
            state.isAuthenticated = action.payload;
        },
        resetStates: (state,action)=>{
            //In this function, I want to reset ALL of my states on the log out.
            //Include that within a function that is called from mutation.
        }
    }
})

export const { setUser,setIsAuthenticated,setIsLoading} = storeSlice.actions;
export default storeSlice.reducer;
export const selectIsAuthenticated = (state) => state.storeReducer.isAuthenticated;
export const selectUser = (state) => state.storeReducer.user;
export const selectIsLoading = (state) => state.storeReducer.isLoading;

