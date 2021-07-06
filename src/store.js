import {configureStore} from '@reduxjs/toolkit';
import postReducer from './features/post';
import userReducer from './features/user';

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer
  }
});

export default store;