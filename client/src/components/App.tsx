import React from 'react'
import AppRoutes from './AppRoutes'
import { checkAuth } from '@/store/actionCreators'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

const App = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

  return (
    <div className="bg-white flex min-h-screen w-full justify-center">
      <AppRoutes />
    </div>
  )
}

export default App
