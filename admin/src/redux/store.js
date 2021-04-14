import { configureStore } from "@reduxjs/toolkit";
import RootReducer from './Reducer/RootReaducer';

const store = configureStore({
  reducer: RootReducer,
})

export default store;
