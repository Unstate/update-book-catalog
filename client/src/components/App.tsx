import React from "react"
import AppRoutes from "./AppRoutes"
import { checkAuth } from "@/store/actionCreators"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"

const App = () => {

  const {isAuth, user} = useAppSelector(store => store.userReducer)
  const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

  console.log(user)

  return (
    <div className="bg-white flex min-h-screen w-full justify-center">
      <h1>{isAuth ? `Пользователь авторизован >> ${user.username}` : `Пользователь не авторизован`}</h1>
      <AppRoutes />
    </div>
  )
}

export default App
