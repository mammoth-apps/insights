import type { IPayee } from '@mammoth-apps/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IPayeesState {
  payees: IPayee[]
  selectedPayee: IPayee | null
  loading: boolean
  errors: string[]
}

const initialState: IPayeesState = {
  payees: [],
  selectedPayee: null,
  loading: false,
  errors: [],
}

const payeeSlice = createSlice({
  name: 'payees',
  initialState: initialState,
  reducers: {
    loadPayeesStart: (state) => {},
    loadPayeesSuccess: (state, action: PayloadAction<IPayee[]>) => {},
    loadPayeesFailure: (state, action: PayloadAction<string>) => {},
    createPayeeStart: (state) => {},
    createPayeeSuccess: (state, action: PayloadAction<IPayee>) => {},
    createPayeeFailure: (state, action: PayloadAction<string>) => {},
    getPayeeStart: (state) => {},
    getPayeeSuccess: (state, action: PayloadAction<IPayee>) => {},
    getPayeeFailure: (state, action: PayloadAction<string>) => {},
    editPayeeStart: (state) => {},
    editPayeeSuccess: (state, action: PayloadAction<IPayee>) => {},
    editPayeeFailure: (state, action: PayloadAction<string>) => {},
  },
})

export const {} = payeeSlice.actions

export default payeeSlice.reducer
