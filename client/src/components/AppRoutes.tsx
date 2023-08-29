import {
  BookPage,
  BooksPage,
  LoginPage,
  RegistrationPage,
  UserPage
} from '@/pages'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  const token = localStorage.getItem('token');
  return (
    <>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/booksPage" element={token ? <BooksPage /> : <LoginPage />} />
          <Route path="/book/:id" element={token ? <BookPage /> : <LoginPage />} />
          <Route path="/user/:id" element={token ? <UserPage /> : <LoginPage />} />
          <Route path="/*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </>
  )
}

export default AppRoutes
