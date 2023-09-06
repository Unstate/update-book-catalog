import LogoAndNameOfCompany from './LogoAndNameOfCompany'
import { unknownAvatar, search } from '@/assets'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'
import {
  useAddBookToFavoriteMutation,
  useDeleteBookFromFavoriteMutation,
  useGetUserFavoriteBooksQuery,
  useLazyGetBooksByTextQuery
} from '@/services/BookService'
import { ReactComponent as SaveToRead } from '@/assets/bookMark.svg'
import { coverMiddle } from '@/assets'
import { checkExtendOfBook } from '@/utils/checkExtendOfBook'
import { IBook } from '@/models/IBook'
import { useInput } from '@/hooks/useInput'

const Header = () => {
  const { user } = useAppSelector((store) => store.userReducer)
  const {bind, value} = useInput('')
  const [getBooksByText, { data: books }] = useLazyGetBooksByTextQuery()
  //Обновить сервачок
  const { data: userData } = useGetUserFavoriteBooksQuery({
    id: user?.id,
    limit: 1000
  })
  const [addBookToFavorite] = useAddBookToFavoriteMutation()
  const [deleteBookFromFavorite] = useDeleteBookFromFavoriteMutation()
  const isMobile = window.innerWidth <= 590

  return (
    <>
      {isMobile ? (
        <header
          id="header1"
          className="flex w-full flex-col gap-y-[30px] px-[42px] pt-[21px] "
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
      ) : (
        <header
          id="header1"
          className="relative w-full flex-col gap-y-[30px] px-[42px] pt-[21px]"
        >
          <div className="flex items-center justify-between mb-[30px]">
            <Link to={'/booksPage'}>
              <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
            </Link>
            <div className="flex items-center gap-x-[23px]">
              <div className="flex items-center rounded-[2px] border-[1px] border-mooduck-gray p-3 lg:w-[325px] xl:w-[561px] 2xl:w-[561px]">
                <input
                  {...bind}
                  type="text"
                  placeholder="Название книги"
                  value={value}
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
              className={`absolute right-[102px] top-[90px] flex h-[318px] w-[563px] flex-col gap-y-5 overflow-auto bg-mooduck-white px-[18px] py-[10px] shadow-lg shadow-mooduck-black ${
                books && value ? 'block' : 'hidden'
              }`}
            >
              <p className="font-semibold uppercase">Результаты поиска</p>
              <div className="flex flex-col gap-y-3">
                {books?.books.map((book: IBook) => (
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
                        <Link to={`/book/${book._id}`}>
                          <p>{book.title}</p>
                        </Link>
                        <Link to={`/book/${book._id}`}>
                          <p className="text-mooduck-gray">{book.authors}</p>
                        </Link>
                      </div>
                    </div>
                    <SaveToRead
                      onClick={() => {
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
                      className={`hover:cursor-pointer ${
                        checkExtendOfBook(userData?.books, book._id)
                          ? 'fill-mooduck-blue hover:fill-mooduck-black'
                          : 'fill-mooduck-black hover:fill-mooduck-blue'
                      } `}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full bg-mooduck-gray" />
        </header>
      )}    
    </>
  )
}

export default Header
