import React, { useEffect, useState } from 'react'
import MyButton from './MyButton'
import { useAppDispatch } from '@/hooks/redux'
import { userSlice } from '@/store/features/userSlice'

interface PopupInterface {
  handleOnClose: Function
  message: string
}

const Popup: React.FC<PopupInterface> = ({ message, handleOnClose }) => {
  const dispatch = useAppDispatch()

  const HIDE_TIMEOUT = 5000
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  useEffect(() => {
    const hide = () => {
        handleOnClose(undefined)
    }

    const intervalId = setInterval(() => {
      if (elapsedTime < HIDE_TIMEOUT) {
        setElapsedTime((time) => time + 1000)
      } else {
        hide()
        dispatch(userSlice.actions.setError(''))
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [elapsedTime])

  const progress = (elapsedTime / HIDE_TIMEOUT) * 100

  return (
    <div
        className="bg-white fixed bottom-[100px] right-0 z-10 w-[700px]
     rounded-[10px] border-[2px] border-[#160F29]"
      >
        <p className="p-[42px]">{message}</p>
        <div
          className="absolute bottom-0"
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#ddd',
            borderRadius: '10px'
          }}
        >
          <div
            className="absolute bottom-0"
            style={{
              width: `${progress}%`,
              height: '10px',
              backgroundColor: '#160F29',
              borderRadius: '10px',
              transition: 'width 0.5s ease-in-out'
            }}
          />
        </div>
      </div>
  )
}

export default Popup
