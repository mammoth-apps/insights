import type {
  ICreateTransaction,
  IDateRangeSearchQuery,
  IDeleteResponse,
  ITransaction,
  ITransactionDetail,
} from '@mammoth-apps/api-interfaces'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { transactionSearchApi } from '../../api/transaction-search.api'
import { transactionApi } from '../../api/transaction.api'
import type { AppThunk, RootState } from '../../app'

type TransactionRecords = Record<string, ITransactionDetail>

export interface ITransactionState {
  transactions: TransactionRecords
  loading: boolean
  error: string
}

const initialState: ITransactionState = {
  transactions: {},
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
      state.loading = false
      const newTransactions = payload.reduce((acc, transaction) => {
        acc[transaction.id] = transaction
        return acc
      }, {} as TransactionRecords)
      state.transactions = { ...state.transactions, ...newTransactions }
    },
    createTransactionStart: startLoading,
    createTransactionFailure: loadingFailed,
    createTransactionSuccess: (state, { payload }: PayloadAction<ITransactionDetail>) => {
      state.loading = false
      state.transactions = { ...state.transactions, [payload.id]: payload }
    },
    updateTransactionStart: startLoading,
    updateTransactionFailure: loadingFailed,
    updateTransactionSuccess: (state, { payload }: PayloadAction<ITransactionDetail>) => {
      state.loading = false
      state.transactions = { ...state.transactions, [payload.id]: payload }
    },
    deleteTransactionStart: startLoading,
    deleteTransactionFailure: loadingFailed,
    deleteTransactionSuccess: (state, { payload }: PayloadAction<IDeleteResponse>) => {
      const filteredTransactions: TransactionRecords = {}
      for (const transactionId in state.transactions) {
        if (transactionId !== payload.id) {
          filteredTransactions[transactionId] = state.transactions[transactionId]
        }
      }
      state.transactions = filteredTransactions
    },
    getTransactionsByLinkIdStart: startLoading,
    getTransactionsByLinkIdFailure: loadingFailed,
    getTransactionsByLinkIdSuccess: (state, { payload }: PayloadAction<ITransactionDetail[]>) => {
      state.loading = false
      const newTransactions = payload.reduce((acc, transaction) => {
        acc[transaction.id] = transaction
        return acc
      }, {} as TransactionRecords)
      state.transactions = { ...state.transactions, ...newTransactions }
    },
  },
})

export const {
  createTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
  getTransactionsByLinkIdFailure,
  getTransactionsByLinkIdStart,
  getTransactionsByLinkIdSuccess,
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

type TransactionLinkIds = {
  [keyId in keyof Partial<ITransaction>]: string
}
export const getTransactionsByLinkId = (
  budgetId: string,
  transactionLinkIds: TransactionLinkIds,
): AppThunk => async (dispatch) => {
  try {
    dispatch(getTransactionsByLinkIdStart())
    let response: ITransactionDetail[] = []
    if (transactionLinkIds.accountId) {
      response = await transactionApi.loadTransactionsByAccount(
        budgetId,
        transactionLinkIds.accountId,
      )
    }
    dispatch(getTransactionsByLinkIdSuccess(response))
  } catch (err) {
    dispatch(getTransactionsByLinkIdFailure(err.toString()))
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

export const updateTransaction = (transaction: ITransaction): AppThunk => async (dispatch) => {
  try {
    dispatch(updateTransactionStart())
    const response = await transactionApi.updateTransaction(transaction.budgetId, transaction)
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
  return Object.values(transactions)
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

const stateSelector = (state: RootState) => state
export const getTransactionsForCurrentAccount = createSelector(stateSelector, (state) =>
  Object.values(state.transactions.transactions).filter(
    (transaction) => transaction.accountId == state.accounts.selectedAccount?.id,
  ),
)

//#endregion Selectors
