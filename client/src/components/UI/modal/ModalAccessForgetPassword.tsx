import { FC } from 'react'
import Modal from '../Modal'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { validatePassword } from '@/utils'
import { useSee } from '@/hooks/useSee'
import { See, Lock, Code } from '@/assets'
import MyButton from '../MyButton'
import { useChangeUserPasswordMutation } from '@/services/BookService'

interface ModalAccessForgetPasswordProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

interface Values {
  confirmationСode: string
  newPassword: string
  repeatNewPassword: string
}

const ModalAccessForgetPassword: FC<ModalAccessForgetPasswordProps> = ({
  visable,
  handleOnClick
}) => {
  const seeNewPassword = useSee(false)
  const seeRepeatNewPassword = useSee(false)
  const [] = useChangeUserPasswordMutation({})

  return (
    <Modal visable={visable} setVisable={handleOnClick} title={'Сброс пароля'}>
      <Formik
        initialValues={{
          confirmationСode: '',
          newPassword: '',
          repeatNewPassword: ''
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          // dispatch(login(values.email, values.password))
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="flex flex-col gap-y-7">
            <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <Code />
              <Field
                name="confirmationСode"
                placeholder="Введите код с e-mail"
                type="text"
                className="w-full"
              />
            </div>

            <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <Lock />
              <Field
                name="newPassword"
                placeholder="Введите ваш новый пароль"
                type={`${seeNewPassword ? 'text' : 'password'}`}
                validate={validatePassword}
                className=" w-full"
              />

              <See
                className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
                onClick={seeNewPassword.handleOnClick}
              />
            </div>
            {errors.newPassword && touched.newPassword && (
              <div className="text-mooduck-red">{errors.newPassword}</div>
            )}
            <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <Lock />
              <Field
                name="repeatNewPassword"
                placeholder="Повторите пароль"
                type={`${seeRepeatNewPassword ? 'text' : 'password'}`}
                validate={validatePassword}
                className=" w-full"
              />
              <See
                className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
                onClick={seeRepeatNewPassword.handleOnClick}
              />
            </div>
            {errors.repeatNewPassword && touched.repeatNewPassword && (
              <div className="text-mooduck-red">{errors.repeatNewPassword}</div>
            )}
            {values.newPassword !== values.repeatNewPassword && (
              <div className="text-mooduck-red">Пароли не совпадают</div>
            )}
            <MyButton
              type="submit"
              className="w-full py-4"
              //   disabled={isLoading ? true : false}
            >
              Сбросить пароль
            </MyButton>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ModalAccessForgetPassword
