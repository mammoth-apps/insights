import type { ICategory } from '@mammoth-apps/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { categoryApi } from '../../api/category.api'
import type { AppThunk } from '../../app'

interface ICategoryState {
  categories: ICategory[]
  loading: boolean
  error: string
}

const initialState: ICategoryState = {
  categories: [],
  loading: false,
  error: '',
}

function startLoading(state: ICategoryState) {
  state.loading = true
}

function loadingFailed(state: ICategoryState, action: PayloadAction<string>) {
  state.loading = false
  state.error = action.payload
}

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    getCategoryListStart: startLoading,
    getCategoryListSuccess: (
      state,
      { payload }: PayloadAction<ICategory[]>,
    ) => {
      state.categories = payload
      state.loading = false
    },
    getCategoryListFailure: loadingFailed,
  },
})

export const {
  getCategoryListStart,
  getCategoryListSuccess,
  getCategoryListFailure,
} = categorySlice.actions

export default categorySlice.reducer

export const fetchCategoryList = (budgetId: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(getCategoryListStart())
    const result = await categoryApi.loadCategories(budgetId)
    dispatch(getCategoryListSuccess(result))
  } catch (err: any) {
    dispatch(getCategoryListFailure(err.toString()))
  }
}
