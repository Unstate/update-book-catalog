import { IImages } from '@/models/IBook'
import React from 'react'
import coverMiddle from '@/assets/coverMiddle.svg'
import { Link } from 'react-router-dom'
import { checkExtendOfUser, correctViewOfAuthors } from '@/utils'
import {
  useAddBookToFavoriteMutation,
  useDeleteBookFromFavoriteMutation,
  useGetUserFavoriteBooksQuery
} from '@/services/BookService'
import { useAppSelector } from '@/hooks/redux'
import { checkExtendOfBook } from '@/utils/checkExtendOfBook'
import { MyButton } from '../UI'

export interface BookElementProps {
  author: string[]
  title: string
  img: IImages
  id: string
  description: string
  pageCount: number
  publisher: string
}

const BookElementList: React.FC<BookElementProps> = ({
  author,
  title,
  img,
  id,
  description,
  pageCount,
  publisher
}) => {
  const [addBookToFavorite, { isError, isLoading, isSuccess }] =
    useAddBookToFavoriteMutation()
  const [deleteBookFromFavorite] = useDeleteBookFromFavoriteMutation()
  const { user } = useAppSelector((store) => store.userReducer)
  const { data } = useGetUserFavoriteBooksQuery({
    id: user?.id,
    limit: 1000,
    page: 1
  })

  return (
    <div className="flex flex-col">
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
          <p className="py-10 text-base text-mooduck-gray lg:hidden lg:py-0">
            {publisher} , {pageCount} страницы
          </p>
          <div className="hidden items-end justify-between pt-[12px] lg:flex">
            <p className="text-base text-mooduck-gray">
              {publisher} , {pageCount} страницы
            </p>
            <MyButton
              className="w-[180px] py-[10px]"
              onClick={() =>
                checkExtendOfBook(data?.books, id)
                  ? deleteBookFromFavorite({
                      userId: user?.id,
                      bookId: id
                    })
                  : addBookToFavorite({
                      userId: user?.id,
                      bookId: id
                    })
              }
            >
              {checkExtendOfBook(data?.books, id)
                ? 'не хочу читать'
                : 'хочу почитать'}
            </MyButton>
          </div>
        </div>
      </div>
      <MyButton
        className="py-[10px] lg:hidden"
        onClick={() =>
          checkExtendOfBook(data?.books, id)
            ? deleteBookFromFavorite({
                userId: user?.id,
                bookId: id
              })
            : addBookToFavorite({
                userId: user?.id,
                bookId: id
              })
        }
      >
        {checkExtendOfBook(data?.books, id)
          ? 'не хочу читать'
          : 'хочу почитать'}
      </MyButton>
    </div>
  )
}

export default BookElementList
