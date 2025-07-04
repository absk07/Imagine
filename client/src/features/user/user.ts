import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: {
    name: string
  } | null,
  showLogin: boolean,
}

const initialState: UserState = {
  user: null,
  showLogin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
    },
    setShowLogin(state, action: PayloadAction<boolean>) {
      state.showLogin = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setShowLogin } = userSlice.actions;

export default userSlice.reducer;