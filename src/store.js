// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './redux/reducers/productReducer';
import {userReducer} from './redux/reducers/userReducer';

const confStore = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
  },
});

export default confStore;
