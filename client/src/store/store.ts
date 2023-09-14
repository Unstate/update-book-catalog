import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import { api } from '../services/api/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
