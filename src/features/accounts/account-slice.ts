import type { IAccount } from '@mammoth-apps/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { accountApi } from '../../api/account.api'
import type { AppThunk } from '../../app'

interface IAccountsState {
  accounts: IAccount[]
  selectedAccount: IAccount | null
  loading: boolean
  error: string
}

const initialState: IAccountsState = {
  accounts: [],
  selectedAccount: null,
  loading: false,
  error: '',
}

function startLoading(state: IAccountsState) {
  state.loading = true
}

function loadingFailed(state: IAccountsState, action: PayloadAction<string>) {
  state.loading = false
  state.error = action.payload
}

const accountSlice = createSlice({
  name: 'accounts',
  initialState: initialState,
  reducers: {
    createAccountStart: startLoading,
    createAccountSuccess: (state, { payload }: PayloadAction<IAccount>) => {},
    createAccountFailure: loadingFailed,
    getAccountStart: startLoading,
    getAccountSuccess: (state, { payload }: PayloadAction<IAccount>) => {},
    getAccountFailure: loadingFailed,
    getAccountListStart: startLoading,
    getAccountListSuccess: (state, { payload }: PayloadAction<IAccount[]>) => {
      state.accounts = payload
      state.loading = false
    },
    getAccountListFailure: loadingFailed,
    editAccountStart: startLoading,
    editAccountSuccess: (state, { payload }: PayloadAction<IAccount>) => {},
    editAccountFailure: loadingFailed,
  },
})

export const {
  getAccountListStart,
  getAccountListSuccess,
  getAccountListFailure,
} = accountSlice.actions

export default accountSlice.reducer

export const fetchAccountList = (budgetId: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(getAccountListStart())
    const result = await accountApi.loadAccounts(budgetId)
    dispatch(getAccountListSuccess(result))
  } catch (err: any) {
    dispatch(getAccountListFailure(err.toString()))
  }
}
