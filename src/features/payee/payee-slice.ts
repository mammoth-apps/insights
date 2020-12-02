import type { IPayee } from '@mammoth-apps/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { payeeApi } from '../../api/payee.api'
import type { AppThunk } from '../../app'

interface IPayeesState {
  payees: IPayee[]
  selectedPayee: IPayee | null
  loading: boolean
  error: string
}

const initialState: IPayeesState = {
  payees: [],
  selectedPayee: null,
  loading: false,
  error: '',
}

function startLoading(state: IPayeesState) {
  state.loading = true
}

function loadingFailed(state: IPayeesState, action: PayloadAction<string>) {
  state.loading = false
  state.error = action.payload
}

const payeeSlice = createSlice({
  name: 'payees',
  initialState: initialState,
  reducers: {
    createPayeeStart: startLoading,
    createPayeeSuccess: (state, { payload }: PayloadAction<IPayee>) => {
      state.payees = [...state.payees, payload]
    },
    createPayeeFailure: loadingFailed,
    getPayeeStart: startLoading,
    getPayeeSuccess: (state, { payload }: PayloadAction<IPayee>) => {},
    getPayeeFailure: loadingFailed,
    getPayeeListStart: startLoading,
    getPayeeListSuccess: (state, { payload }: PayloadAction<IPayee[]>) => {
      state.payees = payload
      state.loading = false
    },
    getPayeeListFailure: loadingFailed,
    editPayeeStart: startLoading,
    editPayeeSuccess: (state, { payload }: PayloadAction<IPayee>) => {},
    editPayeeFailure: loadingFailed,
  },
})

export const {
  getPayeeListStart,
  getPayeeListSuccess,
  getPayeeListFailure,
  createPayeeStart,
  createPayeeSuccess,
  createPayeeFailure,
} = payeeSlice.actions

export default payeeSlice.reducer

export const fetchPayeeList = (budgetId: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(getPayeeListStart())
    const result = await payeeApi.loadPayees(budgetId)
    dispatch(getPayeeListSuccess(result))
  } catch (err: any) {
    dispatch(getPayeeListFailure(err.toString()))
  }
}
