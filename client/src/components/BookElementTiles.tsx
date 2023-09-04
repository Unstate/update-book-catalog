import { IImages } from '@/models/IBook'
import React from 'react'
import { coverMiddle } from '@/assets'
import { MyButton } from './UI'
import { Link } from 'react-router-dom'
import { correctViewOfAuthors } from '@/utils'
import {
  useAddBookToFavoriteMutation,
  useDeleteBookFromFavoriteMutation,
  useGetUserFavoriteBooksQuery
} from '@/services/BookService'
import { useAppSelector } from '@/hooks/redux'
import { checkExtendOfBook } from '@/utils/checkExtendOfBook'

export interface BookElementProps {
  author: string[]
  title: string
  img: IImages
  id: string
}

const BookElementTiles: React.FC<BookElementProps> = ({
  author,
  title,
  img,
  id
}) => {
  const [addBookToFavorite, { isError, isLoading, isSuccess }] =
    useAddBookToFavoriteMutation()
  const [deleteBookFromFavorite] = useDeleteBookFromFavoriteMutation()
  const { user } = useAppSelector((store) => store.userReducer)
  const { data } = useGetUserFavoriteBooksQuery({ id: user?.id, limit: 10000 })
  
  console.log(data)
  
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
      <MyButton
        className="w-full py-[10px]"
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

export default BookElementTiles
