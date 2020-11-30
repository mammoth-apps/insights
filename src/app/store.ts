import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

if (import.meta.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot.accept(() => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
