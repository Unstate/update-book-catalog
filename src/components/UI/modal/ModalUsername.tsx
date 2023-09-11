import { FC } from 'react'
import { useChangeUserUsernameMutation } from '../../../services/BookService'
import { useInput } from '../../../hooks/useInput'
import { useParams } from 'react-router-dom'
import { Modal, MyButton } from '..'

interface ModalUsernameProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

const ModalUsername: FC<ModalUsernameProps> = ({ visable, handleOnClick }) => {
  const { bind, reset, value } = useInput('')
  const { id } = useParams()
  const [changeUsername] = useChangeUserUsernameMutation()

  return (
    <Modal
      visable={visable}
      setVisable={handleOnClick}
      title={'Изменение имени пользователя'}
    >
      <input
        className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
        placeholder="Введите новое имя пользователя"
        name="changeUsername"
        type="text"
        {...bind}
      />
      <MyButton
        className="py-[15px]"
        onClick={() => {
          changeUsername({ id: id, username: value })
          reset()
          handleOnClick(false)
        }}
      >
        Сохранить изменения
      </MyButton>
    </Modal>
  )
}

export default ModalUsername
