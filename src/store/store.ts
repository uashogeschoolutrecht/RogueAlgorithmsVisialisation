import { configureStore } from '@reduxjs/toolkit'
import pReducer from '../slice'

export const store =  configureStore({
  reducer: { pReducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch