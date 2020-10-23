import { combineReducers } from '@reduxjs/toolkit'
import { accountReducer, budgetReducer, transactionReducer } from '../features'

const rootReducer = combineReducers({
  budgets: budgetReducer,
  accounts: accountReducer,
  transactions: transactionReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
