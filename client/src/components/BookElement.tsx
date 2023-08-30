import { IImages } from '@/models/IBook'
import React from 'react'
import { coverMiddle } from '@/assets'
import { correctViewOfAuthors } from '@/services/TailwindMerge'
import { MyButton } from './UI'
import { Link } from 'react-router-dom'

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
    <div className="flex w-[200px] flex-col gap-y-5">
      <Link to={`/book/${id}`}>
        <img
          className="h-[306px] w-full"
          src={img.mediumFingernail}
          alt="Картинка не прогрузилась"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = coverMiddle
          }}
        />
      </Link>
      <div className="flex w-full flex-col gap-x-[10px]">
        <Link to={`/book/${id}`}>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base text-mooduck-black">
            {title}
          </p>
        </Link>
        <Link to={`/book/${id}`}>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base text-mooduck-gray">
            {correctViewOfAuthors(author)}
          </p>
        </Link>
      </div>
      <MyButton className="w-full py-[10px]">хочу почитать</MyButton>
    </div>
  )
}

export default BookElement
