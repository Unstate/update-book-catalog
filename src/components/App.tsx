import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { checkAuth } from '../store/actionCreators'
import AppRoutes from './AppRoutes'

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
