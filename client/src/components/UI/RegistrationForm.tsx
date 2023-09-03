import { Formik, Form, FormikHelpers, Field } from 'formik'
import { email, lock, see, user } from '@/assets'
import { ReactSVG } from 'react-svg'
import MyButton from './MyButton'
import React from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { registration } from '@/store/actionCreators'
import { validateEmail, validatePassword, validateUsername } from '@/utils'

interface Values {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const [seePassword, setSeePassword] = React.useState<boolean>(false)
  const [seeRepeatassword, setSeeRepeatassword] = React.useState<boolean>(false)

  const handleOnClick = () => {
    setSeePassword((prev) => !prev)
  }

  const handleOnClickSecond = () => {
    setSeeRepeatassword((prev) => !prev)
  }

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-y-[50px] bg-mooduck-white">
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
        {({ errors, touched, isValidating, values }) => (
          <Form className="flex flex-col items-start justify-center gap-y-[28px] text-lg">
            <div className=" flex w-[463px] gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <img src={user} />
              <Field
                id="username"
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
              <img src={email} />
              <Field
                id="email"
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
                id="password"
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
            <div className=" flex w-[463px] items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <img src={lock} />
              <Field
                id="repeatPassword"
                name="repeatPassword"
                placeholder="strongPsW2#"
                type={seeRepeatassword ? 'text' : 'password'}
                validate={validatePassword}
                className="w-full"
              />
              <ReactSVG
                src={see}
                className="hover:cursor-pointer"
                onClick={handleOnClickSecond}
              />
            </div>
            {values.password !== values.repeatPassword ? (
              <div className="text-mooduck-red">Пароли не совпадают</div>
            ) : null}
            <div className="flex w-full items-center justify-center">
              <MyButton type="submit" className="mt-[22px] w-[292px] py-4">
                зарегестрироваться
              </MyButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default RegistrationForm
