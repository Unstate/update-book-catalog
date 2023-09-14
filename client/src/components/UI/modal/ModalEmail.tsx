import { FC } from 'react'

import { useChangeUserEmailMutation } from '../../../services/api/user.api'

import { useParams } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'

import { Modal, MyButton } from '..'

interface ModalEmailProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

const ModalEmail: FC<ModalEmailProps> = ({ visable, handleOnClick }) => {
  const { id } = useParams()
  const { bind, reset, value } = useInput('')
  const [changeEmail, { isLoading }] =
    useChangeUserEmailMutation()

  return (
    <Modal
      visable={visable}
      setVisable={handleOnClick}
      title={'Изменение E-mail'}
    >
      <input
        className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
        placeholder="Введите новый адрес E-mail"
        name="changeUsername"
        type="text"
        {...bind}
      />
      {value && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? <p>ОШИБКА</p> : '' }
      <MyButton
        disabled={isLoading}
        className="w-full py-[15px]"
        onClick={() => {
          changeEmail({ id: id, email: value })
          reset()
        }}
      >
        Сохранить изменения
      </MyButton>
    </Modal>
  )
}

export default ModalEmail
