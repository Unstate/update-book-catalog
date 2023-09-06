import AppRoutes from './AppRoutes'
import { checkAuth } from '@/store/actionCreators'
import { useAppDispatch } from '@/hooks/redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
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

