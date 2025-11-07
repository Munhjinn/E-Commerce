import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  address?: string;
  role?: 'customer' | 'delivery' | 'company' | 'admin';
}

interface AuthState {
  isLoggedIn: boolean;
  user?: User | null;
  users: User[];
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  users: [
    {
      name: 'Admin User',
      email: 'admin@gmail.com',
      role: 'admin'
    },
    {
      name: 'Delivery Partner',
      email: 'delivery@gmail.com',
      role: 'delivery'
    },
    {
      name: 'Company Owner',
      email: 'company@example.com',
      role: 'company'
    },
    {
      name: 'Customer 1',
      email: 'customer1@example.com',
      role: 'customer',
      address: 'Ulaanbaatar, Mongolia'
    }
  ]
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
