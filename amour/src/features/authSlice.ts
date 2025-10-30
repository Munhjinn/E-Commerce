import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  address?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user?: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    register: (state, action: PayloadAction<User>) => {
      // For this demo we simply register and log in the user.
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      if (state.user) state.user.address = action.payload;
    },
  },
});

export const { login, logout, register, updateAddress } = authSlice.actions;
export default authSlice.reducer;
