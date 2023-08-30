import { Formik, Form, FormikHelpers, Field } from 'formik'
import { email, lock, see, user } from '@/assets'
import { ReactSVG } from 'react-svg'
import MyButton from './MyButton'
import React from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { registration } from '@/store/actionCreators'

interface Values {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const validateUsername = (value: string) => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

const validateEmail = (value: string) => {
  let error
  if (!value) {
    error = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

const validatePassword = (value: string) => {
  let error
  if (!value) {
    error = 'Required'
  } else if (value.length < 6) {
    error = 'Password too short! Password must be more than 6 symbols'
  } else if (value.length > 20) {
    error = 'Password too big! Password must be less than 20 symbols'
  }
  return error
}

const validateRepeatPassword = (value: string) => {
  let error
  if (!value) {
    error = 'Required'
  } else if (value.length < 6) {
    error = 'Password too short! Password must be more than 6 symbols'
  } else if (value.length > 20) {
    error = 'Password too big! Password must be less than 20 symbols'
  }
  return error
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
    <section className="bg-mooduck-white flex h-full w-full flex-col items-center justify-center gap-y-[50px]">
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
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          dispatch(registration(values.email, values.username, values.password))
          resetForm()
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2))
          //   setSubmitting(false)
          // }, 500)
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
              {/* <button type="submit">Submit</button> */}
              <MyButton type="submit" className="w-[292px] py-4 mt-[22px]">
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
