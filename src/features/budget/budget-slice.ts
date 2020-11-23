import type { IBudget, IDeleteResponse } from '@mammoth-apps/api-interfaces'
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
    getBudgetListFailure: loadingFailed,
    getBudgetListStart: startLoading,
    getBudgetListSuccess: (state, { payload }: PayloadAction<IBudget[]>) => {
      state.loading = false
      state.error = ''
      state.budgetList = payload
    },
    setBudget: (state, { payload }: PayloadAction<string>) => {
      state.selectedBudget = state.budgetList.find(
        (budget) => budget.id === payload,
      )!
    },
    deleteBudgetStart: startLoading,
    deleteBudgetSuccess: (
      state,
      { payload }: PayloadAction<IDeleteResponse>,
    ) => {
      state.budgetList = state.budgetList.filter(
        (budget) => budget.id !== payload.id,
      )
    },
    deleteBudgetFailure: loadingFailed,
  },
})

export const {
  createBudgetFailure,
  createBudgetStart,
  createBudgetSuccess,
  deleteBudgetStart,
  deleteBudgetFailure,
  deleteBudgetSuccess,
  getBudgetListStart,
  setBudget,
  getBudgetListSuccess,
  getBudgetListFailure,
} = budgetSlice.actions

export const fetchBudgets = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getBudgetListStart())
    const result = await budgetApi.loadBudgets()
    dispatch(getBudgetListSuccess(result))
  } catch (err: any) {
    dispatch(getBudgetListFailure(err.toString()))
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
    dispatch(createBudgetFailure(err.toString()))
  }
}

export const deleteBudget = (budgetId: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(deleteBudgetStart())
    const result = await budgetApi.deleteBudget(budgetId)
    dispatch(deleteBudgetSuccess(result))
  } catch (err: any) {
    dispatch(deleteBudgetFailure(err.toString()))
  }
}

export default budgetSlice.reducer
