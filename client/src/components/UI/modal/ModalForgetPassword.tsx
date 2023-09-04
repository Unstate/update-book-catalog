import { ChangeEvent, FC, useState } from 'react'
import Modal from '../Modal'
import MyButton from '../MyButton'
import { useResetPasswordMutation } from '@/services/BookService'

interface ModalForgetPassword {
  visable: boolean
  setVisable: (visable: boolean) => void
}

const ModalForgetPassword: FC<ModalForgetPassword> = ({
  visable,
  setVisable
}) => {

  const [value, setValue] = useState<string>('')
  const [resetPassword] = useResetPasswordMutation()  

  return (
    <Modal visable={visable} setVisable={setVisable} title={'Забыли пароль?'}>
      <p className='text-mooduck-gray '>Введите ваш E-mail, мы отправим письмо с кодом восстановления пароля</p>
      <input
        type="text"
        className="w-full rounded-[2px] border-[1px] border-mooduck-gray px-3 py-[15px]"
        value={value}
        onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Введите ваш E-mail"
      />
      <MyButton className='py-[15px]' onClick={() => resetPassword(value)}>Отправить</MyButton>
    </Modal>
  )
}

export default ModalForgetPassword
