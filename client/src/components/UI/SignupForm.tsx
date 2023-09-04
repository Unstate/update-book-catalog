import { Formik, Form, FormikHelpers, Field } from 'formik'
import { email, lock, see } from '@/assets'
import { ReactSVG } from 'react-svg'
import MyButton from './MyButton'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { login } from '@/store/actionCreators'
import { useNavigate } from 'react-router-dom'
import Popup from './Popup'
import { validateEmail, validatePassword } from '@/utils'
import ModalForgetPassword from './modal/ModalForgetPassword'

//FIXME: Посмотреть куда
interface Values {
  email: string
  password: string
}

const SignupForm = () => {
  //FIXME: Посмотреть куда убрать
  const [visable, setVisable] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const { isSuccess, error, isLoading } = useAppSelector(
    (store) => store.userReducer
  )
  const dispatch = useAppDispatch()
  const [seePassword, setSeePassword] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string | null>(error)

  useEffect(() => {
    navigate('/booksPage')
  }, [isSuccess])

  const handleOnClick = () => {
    setSeePassword((prev) => !prev)
  }

  useEffect(() => {
    if (error.length) {
      setMessage(error)
    }
  }, [error])

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-y-[50px] bg-mooduck-white">
      <h1 className="text-center text-4xl font-bold uppercase text-mooduck-black">
        Вход
      </h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          dispatch(login(values.email, values.password))
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col items-start justify-center gap-y-[28px] text-lg">
            <div className=" flex w-[463px] gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <img src={email} />
              <Field
                name="email"
                placeholder="example@mail.ru"
                type="email"
                validate={validateEmail}
                className=" w-full"
              />
            </div>
            {errors.email && touched.email && (
              <div className="text-mooduck-red">{errors.email}</div>
            )}
            <div className=" flex w-[463px] items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <img src={lock} />
              <Field
                name="password"
                placeholder="strongPsW2#"
                type={seePassword ? 'text' : 'password'}
                validate={validatePassword}
                className=" w-full"
              />
              <ReactSVG
                src={see}
                className="hover:cursor-pointer"
                onClick={handleOnClick}
              />
            </div>
            {errors.password && touched.password && (
              <div className="text-mooduck-red">{errors.password}</div>
            )}
            <p
              className="transition-all ease-in hover:cursor-pointer hover:text-mooduck-blue"
              onClick={() => setVisable(true)}
            >
              Забыли пароль?
            </p>
            <div className="flex w-full items-center justify-center">
              <MyButton
                type="submit"
                className="mt-[22px] w-[200px] py-4"
                disabled={isLoading ? true : false}
              >
                Войти
              </MyButton>
            </div>
          </Form>
        )}
      </Formik>
      {message && <Popup handleOnClose={setMessage} message={message} />}
      <ModalForgetPassword
        visable={visable}
        setVisable={setVisable}
      />
    </section>
  )
}

export default SignupForm
