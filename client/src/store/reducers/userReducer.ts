import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../@types/userTypes';

type IntialState = {
   currentUser: IUser | null;
   error: string | null;
};

const initialState: IntialState = {
   currentUser: null,
   error: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      signInSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.error = null;
      },
      signInFailure: (state, action) => {
         state.error = action.payload;
      },
   },
});

export const { signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
