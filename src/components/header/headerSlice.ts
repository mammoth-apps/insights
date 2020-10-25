import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type HeaderState = {
  isDropdownOpen: boolean
}

const initialState: HeaderState = {
  isDropdownOpen: false,
}

const headerSlice = createSlice({
  name: 'header',
  initialState: initialState,
  reducers: {
    setDropdownOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isDropdownOpen = payload
    },
  },
})

export const { setDropdownOpen } = headerSlice.actions

export default headerSlice.reducer
