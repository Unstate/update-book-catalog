import { bookAPI } from '@/services/BookService'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'

export const store = configureStore({
    reducer: {
        [bookAPI.reducerPath]: bookAPI.reducer,
        userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
// export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
