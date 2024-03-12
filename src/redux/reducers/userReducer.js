// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const INITIALSTATE = {
    userData:[],
    isLoggedIn:false
}
const userSlice = createSlice({
    name: 'user',
    initialState: INITIALSTATE,
    reducers: {
        setUser:(state, action)=>{
            state.userData.push(action.payload);
        },
        checkLogin:(state, action)=>{
            state.isLoggedIn=action.payload;
        }

    }
});
export const userReducer =  userSlice.reducer;
export const {setUser, checkLogin}= userSlice.actions;
