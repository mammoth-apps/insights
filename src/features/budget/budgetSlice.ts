import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { IBudget } from '@mammoth-apps/api-interfaces'
import type { AppThunk } from '../../app'
import { budgetApi } from '../../api'

export interface IBudgetsState {
  budgetList: IBudget[]
  selectedBudget: IBudget | null
  loading: boolean
  error: string
}

const initialState: IBudgetsState = {
  budgetList: [],
  selectedBudget: null,
  loading: false,
  error: '',
}

function startLoading(state: IBudgetsState) {
  state.loading = true
}

function loadingFailed(state: IBudgetsState, action: PayloadAction<string>) {
  state.loading = false
  state.error = action.payload
}

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    getBudgetListStart: startLoading,
    getBudgetFailure: loadingFailed,
    getBudgetListSuccess: (state, { payload }: PayloadAction<IBudget[]>) => {
      state.loading = false
      state.error = ''
      state.budgetList = payload
    },
    setBudget: (state, { payload }: PayloadAction<IBudget>) => {
      state.selectedBudget = payload
    },
  },
})

export const {
  getBudgetListStart,
  setBudget,
  getBudgetListSuccess,
  getBudgetFailure,
} = budgetSlice.actions

export const fetchBudgets = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getBudgetListStart())
    const result = await budgetApi.loadBudgets()
    dispatch(getBudgetListSuccess(result))
  } catch (err: any) {
    dispatch(getBudgetFailure(err.toString()))
  }
}

export default budgetSlice.reducer
