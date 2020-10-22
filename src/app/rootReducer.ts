import { combineReducers } from '@reduxjs/toolkit';
import { budgetReducer } from '../features';

const rootReducer = combineReducers({
  budgets: budgetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
