import { FC } from 'react'
import { BookSmallInfoProps } from './BookSmallInfo'

const BookBigInfo:FC<BookSmallInfoProps> = ({book}) => {
  return (
    <section
      id="section1"
      className="flex w-full flex-col gap-y-[30px] py-[30px]"
    >
      <p className="text-[25px] font-bold text-mooduck-black">О книге</p>
      <p className="w-2/3">{book.description}</p>
      <p className="text-[25px] font-bold text-mooduck-black">Характеристики</p>
      <div className="flex gap-x-[70px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex">
            <p className="w-[134px] text-mooduck-gray">Жанр</p>
            <div>
              {book.genres.map((genre, index) => (
                <div className="w-[162px]" key={index}>
                  {genre}
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <p className="w-[134px] text-mooduck-gray">Издательство</p>
            <p className="w-[162px]">{book.publisher}</p>
          </div>
          <div className="flex">
            <p className="w-[134px] text-mooduck-gray">Серия</p>
            <p className="w-[162px]">{book.bookSeries}</p>
          </div>
          <div className="flex">
            <p className="w-[134px] text-mooduck-gray">Переплет</p>
            <p className="w-[162px]">{book.bookBinding}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="flex">
            <p className="w-[200px] text-mooduck-gray">Художник</p>
            <div>
              {book.painters.length ? (
                book.painters.map((painter, index) => (
                  <div key={index}>{painter}</div>
                ))
              ) : (
                <div> — </div>
              )}
            </div>
          </div>
          <div className="flex">
            <p className="w-[200px] text-mooduck-gray">Переводчик</p>
            <div>
              {book.translaters.length ? (
                book.translaters.map((translater, index) => (
                  <div key={index}>{translater}</div>
                ))
              ) : (
                <div> — </div>
              )}
            </div>
          </div>
          <div className="flex">
            <p className="w-[200px] text-mooduck-gray">Год издания</p>
            <p>{book.publishedDate}</p>
          </div>
          <div className="flex">
            <p className="w-[200px] text-mooduck-gray">Количество страниц</p>
            <p>{book.pageCount}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookBigInfo
