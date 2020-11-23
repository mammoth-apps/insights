import type { IAccount } from '@mammoth-apps/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAccountsState {
  accounts: IAccount[]
  selectedAccount: IAccount | null
  loading: boolean
  errors: string[]
}

const initialState: IAccountsState = {
  accounts: [],
  selectedAccount: null,
  loading: false,
  errors: [],
}

const accountSlice = createSlice({
  name: 'accounts',
  initialState: initialState,
  reducers: {
    loadAccountsStart: (state) => {},
    loadAccountsSuccess: (state, action: PayloadAction<IAccount[]>) => {},
    loadAccountsFailure: (state, action: PayloadAction<string>) => {},
    createAccountStart: (state) => {},
    createAccountSuccess: (state, action: PayloadAction<IAccount>) => {},
    createAccountFailure: (state, action: PayloadAction<string>) => {},
    getAccountStart: (state) => {},
    getAccountSuccess: (state, action: PayloadAction<IAccount>) => {},
    getAccountFailure: (state, action: PayloadAction<string>) => {},
    editAccountStart: (state) => {},
    editAccountSuccess: (state, action: PayloadAction<IAccount>) => {},
    editAccountFailure: (state, action: PayloadAction<string>) => {},
  },
})

export const {} = accountSlice.actions

export default accountSlice.reducer
