import { bookAPI } from '@/services/BookService'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'

// const rootReducer = combineReducers({
//   // Редюсеры, (слыйсы RTK которые меняют state в зависимости от action)
//   [bookAPI.reducerPath]: bookAPI.reducer,
// })

// export const setupStore = () => {
//   // функция которая сетапит store вставляя в него reducer и middleware
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookAPI.middleware)
//   })
// }

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
