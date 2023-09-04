import { useState } from 'react'

interface ReturnData {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

export const useForm = (): ReturnData => {
  const [visable, setVisable] = useState<boolean>(false)

  const handleOnClick = (visable: boolean) => {
    setVisable(visable)
  }
  return { visable, handleOnClick }
}
