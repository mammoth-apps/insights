import type {
  ICreateTransaction,
  IDateRangeSearchQuery,
  IDeleteResponse,
  ITransaction,
  ITransactionDetail,
} from '@mammoth-apps/api-interfaces'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { transactionApi } from 'src/api/transaction.api'
import { toTransactionDetail, transactionFormatter } from 'src/utils'
import { transactionSearchApi } from '../../api/transaction-search.api'
import type { AppThunk } from '../../app'

export interface ITransactionState {
  transactions: ITransactionDetail[]
  loading: boolean
  error: string
}

const initialState: ITransactionState = {
  transactions: [],
  loading: false,
  error: '',
}

function startLoading(state: ITransactionState) {
  state.loading = true
}

function loadingFailed(state: ITransactionState, action: PayloadAction<string>) {
  state.loading = false
  state.error = action.payload
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {
    searchTransactionDateRangeStart: startLoading,
    searchTransactionDateRangeFailed: loadingFailed,
    searchTransactionDateRangeSuccess: (
      state,
      { payload }: PayloadAction<ITransactionDetail[]>,
    ) => {
      // TODO Concat in the new transactions, maybe a map would be useful?
      state.transactions = payload
    },
    createTransactionStart: startLoading,
    createTransactionFailure: loadingFailed,
    createTransactionSuccess: (state, { payload }: PayloadAction<ITransaction>) => {
      state.transactions = [...state.transactions, toTransactionDetail(payload)]
    },
    updateTransactionStart: startLoading,
    updateTransactionFailure: loadingFailed,
    updateTransactionSuccess: (state, { payload }: PayloadAction<ITransaction>) => {
      state.transactions = state.transactions.map((transaction) => {
        if (transaction.id === payload.id) {
          return toTransactionDetail(payload)
        }
        return transaction
      })
    },
    deleteTransactionStart: startLoading,
    deleteTransactionFailure: loadingFailed,
    deleteTransactionSuccess: (state, { payload }: PayloadAction<IDeleteResponse>) => {},
  },
})

export const {
  createTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
  updateTransactionFailure,
  updateTransactionStart,
  updateTransactionSuccess,
  deleteTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  searchTransactionDateRangeFailed,
  searchTransactionDateRangeStart,
  searchTransactionDateRangeSuccess,
} = transactionSlice.actions
export default transactionSlice.reducer

//#region  Thunks
export const searchTransactionDateRange = (
  budgetId: string,
  dateRangeSearchQuery: IDateRangeSearchQuery,
): AppThunk => async (dispatch) => {
  try {
    dispatch(searchTransactionDateRangeStart())
    const response = await transactionSearchApi.searchTransactions(budgetId, dateRangeSearchQuery)
    dispatch(searchTransactionDateRangeSuccess(response))
  } catch (err) {
    dispatch(searchTransactionDateRangeFailed(err.toString()))
  }
}

export const createTransaction = (transaction: ICreateTransaction): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(createTransactionStart())
    const response = await transactionApi.createTransaction(transaction.budgetId, transaction)
    dispatch(createTransactionSuccess(response))
  } catch (err: any) {
    dispatch(createTransactionFailure(err.toString()))
  }
}

export const updateTransaction = (transaction: ITransactionDetail): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(updateTransactionStart())
    const response = await transactionApi.updateTransaction(
      transaction.budgetId,
      transactionFormatter.toTransaction(transaction),
    )
    dispatch(updateTransactionSuccess(response))
  } catch (err: any) {
    dispatch(updateTransactionFailure(err.toString()))
  }
}

export const deleteTransaction = (budgetId: string, transactionId: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(deleteTransactionStart())
    const response = await transactionApi.deleteTransaction(budgetId, transactionId)
    dispatch(deleteTransactionSuccess(response))
  } catch (err: any) {
    dispatch(deleteTransactionFailure(err.toString()))
  }
}

//#endregion Thunks

//#region Selectors

const transactionSelector = (state: ITransactionState) => state.transactions
export const getPastMonthTransactions = createSelector(transactionSelector, (transactions) => {
  const date = new Date()
  return transactions
    .filter((transaction) => {
      const isInMonthRange = transaction.date.month === date.getMonth() + 1
      const isPastTransaction = transaction.date.day <= date.getDate()
      const isInCurrentYear = transaction.date.year === date.getFullYear()
      if (isInMonthRange && isPastTransaction && isInCurrentYear) {
        return transaction
      }
      return undefined
    })
    .filter((transaction) => transaction)
})

//#endregion Selectors
