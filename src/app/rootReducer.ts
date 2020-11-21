import { combineReducers } from '@reduxjs/toolkit'
import { headerReducer } from '../components/header'
import {
  accountReducer,
  budgetReducer,
  categoryReducer,
  payeeReducer,
  transactionReducer,
} from '../features'

const rootReducer = combineReducers({
  accounts: accountReducer,
  budgets: budgetReducer,
  categories: categoryReducer,
  transactions: transactionReducer,
  payees: payeeReducer,
  headerUI: headerReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
