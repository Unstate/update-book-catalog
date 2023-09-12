import { FC, useEffect } from 'react'
import Modal from '../Modal'
import MyButton from '../MyButton'
import { useResetPasswordMutation } from '../../../services/BookService'
import ModalAccessForgetPassword from './ModalAccessForgetPassword'
import { useInput } from '../../../hooks/useInput'
import { useForm } from '../../../hooks/useForm'

interface ModalForgetPassword {
  visable: boolean
  setVisable: (visable: boolean) => void
}

const ModalForgetPassword: FC<ModalForgetPassword> = ({
  visable,
  setVisable
}) => {
  const modal = useForm()
  const { bind, value } = useInput('')
  const [resetPassword, { isSuccess }] = useResetPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      modal.handleOnClick(true)
    }
  }, [isSuccess])

  return (
    <Modal visable={visable} setVisable={setVisable} title={'Забыли пароль?'}>
      <p className="text-mooduck-gray ">
        Введите ваш E-mail, мы отправим письмо с кодом восстановления пароля
      </p>
      <input
        {...bind}
        type="text"
        className="w-full rounded-[2px] border-[1px] border-mooduck-gray px-3 py-[15px]"
        placeholder="Введите ваш E-mail"
      />
      <MyButton className="py-[15px]" onClick={() => resetPassword(value)}>
        Отправить
      </MyButton>
      <ModalAccessForgetPassword
        visable={modal.visable}
        handleOnClick={modal.handleOnClick}
      />
    </Modal>
  )
}

export default ModalForgetPassword
