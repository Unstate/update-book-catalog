import Modal from '../Modal'
import { DuckFootprints } from '@/assets'
import MyButton from '../MyButton'
import { logout } from '@/store/actionCreators'
import { FC } from 'react'
import { useAppDispatch } from '@/hooks/redux'

interface ModalLogoutProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

const ModalLogout: FC<ModalLogoutProps> = ({ visable, handleOnClick }) => {
  const dispatch = useAppDispatch()

  return (
    <Modal
      visable={visable}
      setVisable={handleOnClick}
      title={'Вы уверены, что хотите выйти?'}
    >
      <div className="mb-[20px] mt-[10px] flex items-center justify-center">
        <DuckFootprints />
      </div>
      <div className="flex gap-x-10">
        <MyButton
          className="w-full py-[15px]"
          onClick={() => dispatch(logout())}
        >
          ДА, выйти
        </MyButton>
        <MyButton
          className="w-full py-[15px]"
          onClick={() => handleOnClick(false)}
        >
          Нет, остаться
        </MyButton>
      </div>
    </Modal>
  )
}

export default ModalLogout
