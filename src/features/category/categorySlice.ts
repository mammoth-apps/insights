import type { ICategory } from '@mammoth-apps/api-interfaces'
import { createSlice } from '@reduxjs/toolkit'

interface ICategoryState {
  categories: ICategory[]
  loading: boolean
  errors: string[]
}

const initialState: ICategoryState = {
  categories: [],
  loading: false,
  errors: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
})

export const {} = categorySlice.actions

export default categorySlice.reducer
