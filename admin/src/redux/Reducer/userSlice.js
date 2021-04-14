import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUser from '../../api/fetchUser';


export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async () => {
    const response = await getUser.getAllUser()
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
      console.log(action);
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
