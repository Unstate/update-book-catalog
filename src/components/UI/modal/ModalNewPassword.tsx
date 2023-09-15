import { FC } from 'react'
import Modal from '../Modal'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { validatePassword } from '../../../utils'
import { useSee } from '../../../hooks/useSee'
import { see, lock } from '../../../assets'
import MyButton from '../MyButton'
import { useChangeUserPasswordMutation } from '../../../services/api/user.api'
import { useParams } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

interface ModalNewPasswordProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

interface Values {
  newPassword: string
  repeatNewPassword: string
}

const ModalNewPassword: FC<ModalNewPasswordProps> = ({
  visable,
  handleOnClick
}) => {
  const seeNewPassword = useSee(false)
  const seeRepeatNewPassword = useSee(false)
  const [changeUserPassword] = useChangeUserPasswordMutation()
  const {id} = useParams()

  return (
    <Modal visable={visable} setVisable={handleOnClick} title={'Сброс пароля'}>
      <Formik
        initialValues={{
          newPassword: '',
          repeatNewPassword: ''
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          changeUserPassword({id:id, password: values.newPassword})
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="flex flex-col gap-y-7">
            <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <ReactSVG src={lock} />
              <Field
                name="newPassword"
                placeholder="Введите ваш новый пароль"
                type={`${seeNewPassword ? 'text' : 'password'}`}
                validate={validatePassword}
                className=" w-full"
              />

              <ReactSVG
                src={see}
                className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
                onClick={seeNewPassword.handleOnClick}
              />
            </div>
            {errors.newPassword && touched.newPassword && (
              <div className="text-mooduck-red">{errors.newPassword}</div>
            )}
            <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
              <ReactSVG src={lock} />
              <Field
                name="repeatNewPassword"
                placeholder="Повторите пароль"
                type={`${seeRepeatNewPassword ? 'text' : 'password'}`}
                validate={validatePassword}
                className=" w-full"
              />
              <ReactSVG src={see}
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
            >
              Сохранить новый  пароль
            </MyButton>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ModalNewPassword
