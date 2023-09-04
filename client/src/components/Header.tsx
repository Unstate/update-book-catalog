import LogoAndNameOfCompany from './LogoAndNameOfCompany'
import { unknownAvatar, search } from '@/assets'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'
import { ChangeEvent, useState } from 'react'
import {
  useAddBookToFavoriteMutation,
  useDeleteBookFromFavoriteMutation,
  useGetUserFavoriteBooksQuery,
  useLazyGetBooksByTextQuery
} from '@/services/BookService'
import { ReactComponent as SaveToRead } from '@/assets/saveToRead.svg'
import { coverMiddle } from '@/assets'
import { checkExtendOfBook } from '@/utils/checkExtendOfBook'
import { IBook } from '@/models/IBook'

const Header = () => {
  const { user } = useAppSelector((store) => store.userReducer)
  const [value, setValue] = useState<string>('')
  const [getBooksByText, { data: books }] = useLazyGetBooksByTextQuery()
  const { data: userData } = useGetUserFavoriteBooksQuery({ id: user?.id, limit: 1000 })
  const [addBookToFavorite] = useAddBookToFavoriteMutation()
  const [deleteBookFromFavorite] = useDeleteBookFromFavoriteMutation()

  return (
    <>
      <header
        id="header1"
        className="hidden w-full flex-col gap-y-[30px] px-[42px] pt-[21px] lg:flex xl:flex 2xl:flex "
      >
        <div className="flex items-center justify-between">
          <Link to={'/booksPage'}>
            <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
          </Link>
          <div className="flex items-center gap-x-[23px]">
            <div className="flex items-center rounded-[2px] border-[1px] border-mooduck-gray p-3 lg:w-[325px] xl:w-[561px] 2xl:w-[561px]">
              <input
                type="text"
                placeholder="Название книги"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                className="w-full placeholder-mooduck-gray"
              />
              <ReactSVG
                src={search}
                className="h-[16px] w-[16px] hover:cursor-pointer"
                onClick={() => getBooksByText(value)}
              />
            </div>
            <Link to={`/user/${user.id}`}>
              <img
                src={unknownAvatar}
                className="h-[40px] w-[40px] hover:cursor-pointer"
              />
            </Link>
          </div>
          <div
            className={` absolute right-[361px] top-[110px] h-[318px] w-[563px] overflow-auto bg-mooduck-white px-[18px] py-[10px] ${
              books && value ? 'block' : 'hidden'
            }`}
          >
            <p>Результаты поиска</p>
            <div>
              {books?.books.map((book:IBook) => (
                <div
                  key={book._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-center gap-x-[13px]">
                    <Link to={`/book/${book._id}`}>
                      <img
                        className="h-[48px] w-[32px]"
                        src={book.img.smallFingernail}
                        alt="Картинка не прогрузилась"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null
                          currentTarget.src = coverMiddle
                        }}
                      />
                    </Link>
                    <div className="flex flex-col gap-y-[10px]">
                      <p>{book.title}</p>
                      <p className="text-mooduck-gray">{book.authors}</p>
                    </div>
                  </div>
                  <SaveToRead
                    onClick={() => {
                      console.log(checkExtendOfBook(userData?.books, user?.id))
                      checkExtendOfBook(userData?.books, book._id)
                        ? deleteBookFromFavorite({
                            userId: user?.id,
                            bookId: book._id
                          })
                        : addBookToFavorite({
                            userId: user?.id,
                            bookId: book._id
                          })
                    }}
                    className={`hover:cursor-pointer hover:fill-mooduck-red ${
                      checkExtendOfBook(userData?.books, book._id)
                        ? 'fill-mooduck-blue hover:fill-mooduck-black'
                        : 'fill-mooduck-black hover:fill-mooduck-blue'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-mooduck-gray" />
      </header>
      {/* HEADER FOR LG AND SMALL */}
      <header
        id="header1"
        className="flex w-full flex-col gap-y-[30px] px-[42px] pt-[21px] lg:hidden xl:hidden 2xl:hidden "
      >
        <div className=" flex items-center justify-between">
          <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
          <Link to={'/'}>
            <img
              src={unknownAvatar}
              className="h-[40px] w-[40px] hover:cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex items-center rounded-[2px] border-[1px] border-mooduck-gray p-3 lg:w-[325px] xl:w-[561px] 2xl:w-[561px]">
          <input
            type="text"
            name="searchBooks"
            autoComplete="on"
            placeholder="Название книги"
            className="w-full placeholder-mooduck-gray"
          />
          <ReactSVG
            src={search}
            className="h-[16px] w-[16px] hover:cursor-pointer"
          />
        </div>
        <div className="h-[2px] w-full bg-mooduck-gray" />
      </header>
    </>
  )
}

export default Header
