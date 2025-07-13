import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: {
    username: string
  } | null,
  showLogin: boolean,
  token: string | null,
  uc: boolean,
}

const initialState: UserState = {
  user: null,
  showLogin: false,
  token: localStorage.getItem('token'),
  uc: false
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
    },
    setToken() {

    },
    setCredit() {

    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setShowLogin, setToken, setCredit } = userSlice.actions;

export default userSlice.reducer;