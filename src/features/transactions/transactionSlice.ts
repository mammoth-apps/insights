import type { ITransaction } from '@mammoth-apps/api-interfaces'
import { createSlice } from '@reduxjs/toolkit'

export interface ITransactionState {
  transactions: ITransaction[]
  loading: boolean
  errors: string[]
}

const initialState: ITransactionState = {
  transactions: [],
  loading: false,
  errors: [],
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {},
})

export const {} = transactionSlice.actions
export default transactionSlice.reducer
