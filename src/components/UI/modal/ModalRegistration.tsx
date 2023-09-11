import React from 'react'
import Modal from '../Modal'
import { message } from '../../../assets'
import MyButton from '../MyButton'
import { useNavigate } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

interface ModalRegistrationProps {
  visable: boolean
  setVisable: (visable: boolean) => void
}

const ModalRegistration: React.FC<ModalRegistrationProps> = ({
  visable,
  setVisable
}) => {
  const navigate = useNavigate()

  const handleOnClick = () => {
    setVisable(false)
    navigate('/booksPage')
  }

  return (
    <Modal
      visable={visable}
      setVisable={setVisable}
      title={'Регистрация почти завершена!'}
    >
      <div className="flex flex-col items-center justify-center gap-y-[30px]">
        <p className="text-[20px] text-mooduck-gray">
          Проверьте свою почту и следуйте указаниям в инструкции
        </p>
        <ReactSVG src={message} />
      </div>
      <MyButton className="py-[15px]" onClick={handleOnClick}>
        Продолжить
      </MyButton>
    </Modal>
  )
}

export default ModalRegistration
