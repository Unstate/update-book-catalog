import { Navigate, Route, Routes } from "react-router"
import { useAppSelector } from "../hooks/redux"
import { ScrollButton } from "."
import { BookPage, BooksPage, LoginPage, RegistrationPage, UserPage } from "../pages"

const AppRoutes = () => {
  const { isAuth } = useAppSelector((store) => store.userReducer)
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/booksPage"
          element={isAuth ? <BooksPage /> : <LoginPage />}
        />
        <Route
          path="/book/:id"
          element={isAuth ? <BookPage /> : <LoginPage />}
        />
        <Route
          path="/user/:id"
          element={isAuth ? <UserPage /> : <LoginPage />}
        />
        <Route path="/*" element={<Navigate to="/" replace />}></Route>
      </Routes>
      <ScrollButton />
    </>
  )
}

export default AppRoutes
