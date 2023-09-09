import { FC, MouseEvent } from 'react'

import { ImageBeforeHover } from '@/assets'

import { useUploadImage } from '@/hooks/useUploadImage'

import { Modal, MyButton } from '..'

interface ModalUploaderProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
}

const ModalUploader: FC<ModalUploaderProps> = ({ visable, handleOnClick }) => {
  const {
    files,
    handleClearClick,
    handleClick,
    handleDragOver,
    handleDrop,
    handleOnChange,
    inputRef
  } = useUploadImage(null)

  return (
    <Modal
      visable={visable}
      setVisable={handleOnClick}
      title={'Изменение фотографии'}
    >
      <div
        className="flex w-[346px] cursor-pointer flex-col items-center justify-center border-[2px] border-dotted border-[#160F29] p-[21px] lg:w-[692px] 2xl:w-[692px]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {files ? (
          <div>
            <ul>
              {Array.from(files).map((file: any, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
            <div>
              <MyButton className="py-[15px]">Сохранить изменения</MyButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-[30px]">
            <ImageBeforeHover className="mb-[30px] md:h-[80px] md:w-[80px] lg:h-[137px] lg:w-[137px] 2xl:h-[137px] 2xl:w-[137px]" />
            <p className="text-center font-semibold text-[#160F29] md:text-[22px] lg:text-[25px] 2xl:text-[25px]">
              Выберите изображение на устройстве
            </p>
            <input
              type="file"
              onChange={handleOnChange}
              hidden
              accept="image/*"
              ref={inputRef}
            />
            <div className="flex gap-x-[30px]">
              <MyButton
                className="px-[30px] py-[10px]"
                onClick={(
                  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
                ) => handleClick(e)}
              >
                Выбрать файл
              </MyButton>
              <MyButton
                className="px-[30px] py-[15px]"
                onClick={(
                  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
                ) => handleClick(e)}
              >
                Вставить из буфера
              </MyButton>
            </div>
          </div>
        )}
      </div>
      <MyButton className="py-[15px]" onClick={handleClearClick}>
        удалить фотографию
      </MyButton>
    </Modal>
  )
}

export default ModalUploader
