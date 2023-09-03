import { IImages } from '@/models/IBook'
import React from 'react'
import { coverMiddle } from '@/assets'
import { MyButton } from './UI'
import { Link } from 'react-router-dom'
import { correctViewOfAuthors } from '@/utils'

export interface BookElementProps {
  author: string[]
  title: string
  genres: string[]
  img: IImages
  id: string
  description: string
  pageCount: number
  publisher: string
  type: string
}

const BookElement: React.FC<BookElementProps> = ({
  author,
  title,
  genres,
  img,
  id,
  description,
  pageCount,
  publisher,
  type
}) => {
  return (
    <>
      {type === 'list' ? (
        <div className="flex w-full gap-x-5">
          <Link to={`/book/${id}`}>
            <img
              className="h-[306px] w-[200px]"
              src={img.mediumFingernail}
              alt="Картинка не прогрузилась"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = coverMiddle
              }}
            />
          </Link>
          <div className="flex w-full flex-col gap-y-[20px]">
            <div className="flex flex-col gap-y-[10px]">
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
            <Link to={`/book/${id}`}>
              <p className="h-[148px] overflow-hidden xl:w-[486px] 2xl:w-[486px]">
                {description}
              </p>
            </Link>
            {/* <p className='text-base text-mooduck-gray lg:hidden'>{publisher} , {pageCount} страницы</p> */}
            <div className="hidden items-end justify-between pt-[12px] lg:flex">
              <p className="text-base text-mooduck-gray">
                {publisher} , {pageCount} страницы
              </p>
              <MyButton className="w-[180px] py-[10px]">Хочу почитать</MyButton>
            </div>
            {/* <MyButton className='w-full py-[10px] lg:hidden'>Хочу почитать</MyButton> */}
          </div>
        </div>
      ) : (
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
      )}
    </>
  )
}

export default BookElement
