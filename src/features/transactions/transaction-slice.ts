import type {
  IDateRangeSearchQuery,
  ITransactionDetail,
} from '@mammoth-apps/api-interfaces'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
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

function loadingFailed(
  state: ITransactionState,
  action: PayloadAction<string>,
) {
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
  },
})

export const {
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
    const response = await transactionSearchApi.searchTransactions(
      budgetId,
      dateRangeSearchQuery,
    )
    dispatch(searchTransactionDateRangeSuccess(response))
  } catch (err) {
    dispatch(searchTransactionDateRangeFailed(err.toString()))
  }
}

//#endregion Thunks

//#region Selectors

const transactionSelector = (state: ITransactionState) => state.transactions
export const getPastMonthTransactions = createSelector(
  transactionSelector,
  (transactions) => {
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
  },
)

//#endregion Selectors
