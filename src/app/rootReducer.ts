import { combineReducers } from '@reduxjs/toolkit'
import {
  accountReducer,
  budgetReducer,
  categoryReducer,
  transactionReducer,
} from '../features'

const rootReducer = combineReducers({
  accounts: accountReducer,
  budgets: budgetReducer,
  categories: categoryReducer,
  transactions: transactionReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
