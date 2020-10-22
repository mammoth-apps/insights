import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IBudget } from '@mammoth-apps/api-interfaces';

export interface IBudgetSliceState {
  budgets: IBudget[];
  selectedBudget: IBudget | null;
  loading: boolean;
  errors: string;
}

const initialState: IBudgetSliceState = {
  budgets: [],
  selectedBudget: null,
  loading: false,
  errors: '',
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setBudgetList: (state, { payload }: PayloadAction<IBudget[]>) => {
      state.budgets = payload;
    },
    setBudget: (state, { payload }: PayloadAction<IBudget>) => {
      state.selectedBudget = payload;
    },
  },
});

export const { setLoading, setBudget, setBudgetList } = budgetSlice.actions;

export default budgetSlice.reducer;
