import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import type { IBudgetSliceState } from '../features';
import { budgetStore } from '../features/budget/budgetSlice';

interface IInsightsState {
  budgets: IBudgetSliceState;
}

export type AppThunk = ThunkAction<
  void,
  IInsightsState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    budgetStore,

    // anyOtherStore: anyOtherSlice,
    // middleware: ['array of middlewares'],
  },
  devTools: import.meta.env.MODE !== 'development' ? false : true,
});
