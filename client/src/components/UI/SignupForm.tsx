import { Formik, Form, FormikHelpers, Field } from 'formik'
import { email, lock, see } from '@/assets'
import { ReactSVG } from 'react-svg'
import MyButton from './MyButton'
import React from 'react'

interface Values {
  email: string
  password: string
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

const SignupForm = () => {
  const [seePassword, setSeePassword] = React.useState<boolean>(false)

  const handleOnClick = () => {
    setSeePassword((prev) => !prev)
  }

  return (
    <section className="bg-white flex h-full w-full flex-col items-center justify-center gap-y-[50px]">
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
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="flex flex-col items-start justify-center gap-y-[28px] text-lg">
            <div className=" flex w-[463px] gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <img src={email} />
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
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
                placeholder="1231235"
                type={seePassword ? 'text' : 'password'}
                validate={validatePassword}
                className=" w-full"
              />
              {/* <img src={see} className=' hover:cursor-pointer fill-current hover:text-red-500'/> */}
              <ReactSVG
                src={see}
                className="hover:cursor-pointer"
                onClick={handleOnClick}
              />
            </div>
            {errors.password && touched.password && (
              <div className="text-mooduck-red">{errors.password}</div>
            )}
            <p className="hover:cursor-pointer hover:text-mooduck-blue">
              Забыли пароль?
            </p>
            <div className="flex w-full items-center justify-center">
              {/* <button type="submit">Submit</button> */}
              <MyButton type="submit" className="w-[200px] py-4">
                Войти
              </MyButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default SignupForm