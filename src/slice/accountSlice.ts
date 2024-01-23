import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
  email: string
}

const initialState: AccountState = {
  email: '',
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    clearUser: (state) => {
      localStorage.removeItem('email');
      state.email = ''
    }
  }
})

export const { saveUser, clearUser } = accountSlice.actions

export default accountSlice.reducer