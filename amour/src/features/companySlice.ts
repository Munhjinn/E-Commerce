import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyState {
  isCompanyLoggedIn: boolean;
  companyInfo: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const initialState: CompanyState = {
  isCompanyLoggedIn: false,
  companyInfo: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    loginCompany: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
      state.isCompanyLoggedIn = true;
      state.companyInfo = action.payload;
    },
    logoutCompany: (state) => {
      state.isCompanyLoggedIn = false;
      state.companyInfo = null;
    },
  },
});

export const { loginCompany, logoutCompany } = companySlice.actions;
export default companySlice.reducer;