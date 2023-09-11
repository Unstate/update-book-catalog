import { FC } from 'react'
import Modal from '../Modal'
import { ReactSVG } from 'react-svg'
import { bookMark, search } from '../../../assets'
import { IBind } from '../../../hooks/useInput'
import { IBook } from '../../../models/IBook'
import { Link } from 'react-router-dom'
import coverMiddle from '../../../assets/coverMiddle.svg'
import { checkExtendOfBook } from '../../../utils/checkExtendOfBook'

interface ModalHeaderSearchProps {
  visable: boolean
  handleOnClick: (visable: boolean) => void
  value: string
  bind: IBind
  getBooksByText: Function
  books?: IBook[] 
  reset:() => void
  deleteBookFromFavorite: Function
  addBookToFavorite: Function
  userFavoriteBooks?: IBook[]
  id: string
}

const ModalHeaderSearch: FC<ModalHeaderSearchProps> = ({
  visable,
  handleOnClick,
  value,
  bind,
  getBooksByText,
  books,
  reset,
  deleteBookFromFavorite,
  addBookToFavorite,
  userFavoriteBooks,
  id,
}) => {
    // console.log(books)
    // console.log(value)
  return (
    <Modal
      visable={visable}
      setVisable={handleOnClick}
      title={'Результаты поиска'}
    >
      <div className="flex items-center rounded-[2px] border-[1px] border-mooduck-gray p-3 lg:w-[325px] 2xl:w-[561px]">
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
          onClick={() => {
            getBooksByText(value)
          }}
        />
      </div>
      <div className="flex flex-col gap-y-3">
        {books?.map((book: IBook) => (
          <div key={book._id} className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-x-[13px]">
              <Link to={`/book/${book._id}`} onClick={() => reset()}>
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
                <Link to={`/book/${book._id}`} onClick={() => reset()}>
                  <p className='text-ellipsis whitespace-wrap text-base text-mooduck-black w-[197px]'>{book.title}</p>
                </Link>
                <Link to={`/book/${book._id}`} onClick={() => reset()}>
                  <p className="text-mooduck-gray">{book.authors}</p>
                </Link>
              </div>
            </div>
            <ReactSVG
              src={bookMark}
              onClick={() => {
                checkExtendOfBook(userFavoriteBooks, book._id)
                  ? deleteBookFromFavorite({
                      userId: id,
                      bookId: book._id
                    })
                  : addBookToFavorite({
                      userId: id,
                      bookId: book._id
                    })
              }}
              className={`hover:cursor-pointer ${
                checkExtendOfBook(userFavoriteBooks, book._id)
                  ? 'fill-mooduck-blue '
                  : 'fill-mooduck-black'
              } `}
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default ModalHeaderSearch
