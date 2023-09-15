import { IImages } from '../../models/IBook'
import React from 'react'
import coverMiddle from '../../assets/coverMiddle.svg'
import { Link } from 'react-router-dom'
import { correctViewOfAuthors } from '../../utils'

import { useAppSelector } from '../../hooks/redux'
import { checkExtendOfBook } from '../../utils/checkExtendOfBook'
import { MyButton } from '../UI'
import { useAddBookToFavoriteMutation, useDeleteBookFromFavoriteMutation, useGetUserFavoriteBooksQuery } from '../../services/api/user.api'

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
  const [addBookToFavorite] =
    useAddBookToFavoriteMutation()
  const [deleteBookFromFavorite] = useDeleteBookFromFavoriteMutation()
  const { user } = useAppSelector((store) => store.userReducer)
  const { data } = useGetUserFavoriteBooksQuery({ id: user?.id, limit: 10000, page: 1 })

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
        className={`w-full py-[10px] ${
          checkExtendOfBook(data?.books, id) &&
          'bg-mooduck-black text-mooduck-white hover:bg-mooduck-white hover:text-mooduck-black'
        }`}
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
