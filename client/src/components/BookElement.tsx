import { IImages } from '@/models/IBook'
import React from 'react'
import { coverMiddle } from '@/assets'
import { correctViewOfAuthors } from '@/services/TailwindMerge'
import { MyButton } from './UI'

export interface BookElementProps {
  author: string[]
  title: string
  genres: string[]
  img: IImages
  id: string
  description: string
  pageCount: number
  publisher: string
}

const BookElement: React.FC<BookElementProps> = ({
  author,
  title,
  genres,
  img,
  id,
  description,
  pageCount,
  publisher
}) => {
  return (
    <div className="w-[200px] flex flex-col gap-y-5">
      <img
        className='w-full h-[306px]'
        src={img.mediumFingernail}
        alt="Картинка не прогрузилась"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = coverMiddle
        }}
      />
      <div className='w-full flex flex-col gap-x-[10px]'>
        <p className='text-mooduck-black text-base whitespace-nowrap overflow-hidden text-ellipsis'>{title}</p>
        <p className='text-mooduck-gray text-base whitespace-nowrap overflow-hidden text-ellipsis'>{correctViewOfAuthors(author)}</p>
      </div>
      <MyButton className='w-full py-[10px]'>хочу почитать</MyButton>
    </div>
  )
}

export default BookElement
