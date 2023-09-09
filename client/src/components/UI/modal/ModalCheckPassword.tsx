import { FC, useEffect } from 'react'

import { Modal, MyButton } from '..'

import { useInput } from '@/hooks/useInput'
import { useParams } from 'react-router-dom'
import { useCheckUserPasswordMutation } from '@/services/BookService'

interface ModalCheckPasswordProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

const ModalCheckPassword: FC<ModalCheckPasswordProps> = ({
  visable,
  handleOnClick
}) => {
  const { bind, reset, value } = useInput('')
  const { id } = useParams()

  const [checkUserPassword, { error, isError, isSuccess, isLoading }] =
    useCheckUserPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      handleOnClick(false)
    } else {
    }
  }, [isSuccess, isError])

  return (
    <>
      <Modal
        visable={visable}
        setVisable={handleOnClick}
        title={'Изменение пароля'}
      >
        <input
          className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
          placeholder="Введите текущий пароль"
          name="checkPassword"
          type="text"
          {...bind}
        />
        <MyButton
          className="w-full py-[15px]"
          disabled={isLoading}
          onClick={() => {
            checkUserPassword({ id: id, password: value })
            reset()
          }}
        >
          Подтвердить
        </MyButton>
      </Modal>
    </>
  )
}

export default ModalCheckPassword
