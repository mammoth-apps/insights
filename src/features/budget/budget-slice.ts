import type { IBudget } from '@mammoth-apps/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { budgetApi } from '../../api'
import type { AppThunk } from '../../app'

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
    createBudgetStart: startLoading,
    createBudgetSuccess: (state, { payload }: PayloadAction<IBudget>) => {
      state.budgetList.push(payload)
    },
    createBudgetFailure: loadingFailed,
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
  createBudgetFailure,
  createBudgetStart,
  createBudgetSuccess,
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

export const createBudget = (budgetName: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(createBudgetStart())
    const result = await budgetApi.createBudget(budgetName)
    dispatch(createBudgetSuccess(result))
  } catch (err: any) {
    dispatch(createBudgetFailure(err.toString))
  }
}

export default budgetSlice.reducer
