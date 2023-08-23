import {
  BookPage,
  BooksPage,
  LoginPage,
  RegistrationPage,
  UserPage
} from '@/pages'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/booksPage" element={<BooksPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </>
  )
}

export default AppRoutes
