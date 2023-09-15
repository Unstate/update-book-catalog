import { ChangeEvent, useRef, useState } from 'react'

export const useUploadImage = (initial:any) => {
  const inputRef = useRef<HTMLInputElement>(initial)
  const [files, setFiles] = useState<FileList | null>(initial)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFiles(e.target.files)

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    setFiles(e.dataTransfer.files)
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleClearClick = (e: any) => {
    e.preventDefault()
    setFiles(null)
  }

  return {inputRef, files, handleOnChange, handleDragOver, handleDrop, handleClick, handleClearClick}
}
