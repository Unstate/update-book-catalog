import { Formik, Form, FormikHelpers, Field } from 'formik'
import ModalRegistration from './modal/ModalRegistration'
import MyButton from './MyButton'

import { registration } from '../../store/actionCreators'
import { validateEmail, validatePassword, validateUsername } from '../../utils'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useSee } from '../../hooks/useSee'
import { useForm } from '../../hooks/useForm'
import { email, lock, see, user } from '../../assets'
import { ReactSVG } from 'react-svg'

interface Values {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const { isSuccess, isAuth } = useAppSelector((store) => store.userReducer)

  const seePassword = useSee(false)
  const seeRepeatPassword = useSee(false)
  const modal = useForm()

  useEffect(() => {
    if (isSuccess && isAuth) {
      modal.handleOnClick(true)
    }
  }, [isSuccess, isAuth])

  return (
    <section
      className={`flex h-full w-full flex-col items-center justify-center gap-y-[50px] bg-mooduck-white`}
    >
      <h1 className="text-center text-4xl font-bold uppercase text-mooduck-black">
        Регистрация
      </h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          repeatPassword: ''
        }}
        onSubmit={(values: Values, { resetForm }: FormikHelpers<Values>) => {
          dispatch(registration(values.email, values.username, values.password))
          resetForm()
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="flex flex-col items-start justify-center gap-y-[28px] text-lg">
            <div className=" flex w-[463px] gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <ReactSVG src={user} />
              <Field
                name="username"
                placeholder="nickname123"
                type="text"
                validate={validateUsername}
                className="w-full"
              />
            </div>
            {errors.password && touched.password && (
              <div className="text-mooduck-red">{errors.username}</div>
            )}
            <div className=" flex w-[463px] gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <ReactSVG src={email} />
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
              <ReactSVG src={lock}/>
              <Field
                name="password"
                placeholder="strongPsW2#"
                type={seePassword.visable ? 'text' : 'password'}
                validate={validatePassword}
                className=" w-full"
              />
              <ReactSVG src={see}
                className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
                onClick={seePassword.handleOnClick}
              />
            </div>
            {errors.password && touched.password && (
              <div className="text-mooduck-red">{errors.password}</div>
            )}
            <div className=" flex w-[463px] items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <ReactSVG src={lock}/>
              <Field
                name="repeatPassword"
                placeholder="strongPsW2#"
                type={seeRepeatPassword.visable ? 'text' : 'password'}
                validate={validatePassword}
                className="w-full"
              />
              <ReactSVG
                src={see}
                className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
                onClick={seeRepeatPassword.handleOnClick}
              />
            </div>
            {values.password !== values.repeatPassword ? (
              <div className="text-mooduck-red">Пароли не совпадают</div>
            ) : null}
            <div className="flex w-full items-center justify-center">
              <MyButton type="submit" className="mt-[22px] w-[292px] py-4">
                зарегестрироваться
              </MyButton>
              <ModalRegistration
                visable={modal.visable}
                setVisable={modal.handleOnClick}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default RegistrationForm
