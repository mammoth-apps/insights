import { combineReducers } from '@reduxjs/toolkit';
import { accountReducer, budgetReducer } from '../features';

const rootReducer = combineReducers({
  budgets: budgetReducer,
  accounts: accountReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
