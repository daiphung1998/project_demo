import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiUser from '../../api/apiUser';


export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async () => {
    const response = await ApiUser.getAllUser()
    return response
  }
)



const userReducer = createSlice({
  name: 'user',
  initialState: {
    listUser: []
  },
  reducers: {
    addNumber: (state, action) => {
      state.push(action.payload)
    }
  },

  extraReducers: {
    [fetchUser.pending]: (state, action) =>{
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.listUser = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
      console.log(action);
    }
  }
})

const {reducer, actions} = userReducer;
export const { addNumber } = actions;
export default reducer;
