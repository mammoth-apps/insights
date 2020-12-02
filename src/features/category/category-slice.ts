import type { ICategory, ICreateCategory } from '@mammoth-apps/api-interfaces'
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
    createCategoryStart: startLoading,
    createCategorySuccess: (state, { payload }: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, payload]
    },
    createCategoryFailure: loadingFailed,
  },
})

export const {
  getCategoryListStart,
  getCategoryListSuccess,
  getCategoryListFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
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

export const createCategory = (category: ICreateCategory): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(createCategoryStart())
    const result = await categoryApi.createCategory(category)
    dispatch(createCategorySuccess(result))
  } catch (err: any) {
    dispatch(createCategoryFailure(err.toString()))
  }
}
