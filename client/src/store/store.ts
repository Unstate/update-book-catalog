import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import { bookAPI } from '../services/BookService'

export const store = configureStore({
  reducer: {
    [bookAPI.reducerPath]: bookAPI.reducer,
    userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
