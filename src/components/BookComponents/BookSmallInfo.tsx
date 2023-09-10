import  coverIsMissing  from '@/assets/coverIsMissing.svg'
import { Link } from 'react-scroll'
import { correctViewOfAuthors } from '@/utils'
import { FC } from 'react'
import { CertainBook } from '@/models/ICertainBook'
import { MyButton } from '../UI'

export interface BookSmallInfoProps {
    book: CertainBook
}

const BookSmallInfo:FC<BookSmallInfoProps> = ({book}) => {
  return (
    <section className="flex w-full gap-x-[59px] py-[30px]">
      <img
        className="w-[288px]"
        src={book.img.largeFingernail}
        alt="Картинка не прогрузилась"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = coverIsMissing
        }}
      />
      <div className="flex flex-col gap-y-[50px]">
        <div className="flex flex-col gap-y-5">
          <p className="text-[25px] font-bold text-mooduck-black">
            {book.title}
          </p>
          <p className="text-base text-mooduck-gray">
            {correctViewOfAuthors(book.authors)}
          </p>
        </div>
        <div className="flex gap-x-[50px]">
          <div className="flex flex-col gap-y-[20px]">
            <p className="h-[162px] w-[540px] overflow-hidden">
              {book.description}
            </p>
            <Link
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={-10}
              duration={400}
            >
              <div className="text-mooduck-red transition-all ease-in hover:cursor-pointer hover:text-mooduck-blue">
                Читать далее
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-5">
              <div className="flex gap-[53px]">
                <p className="w-[180px] text-mooduck-gray">Жанр</p>
                <p className="w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {book.genres[0]}
                </p>
              </div>
              <div className="flex gap-[53px]">
                <p className="w-[180px] text-mooduck-gray">Издательство</p>
                <p className="w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {book.publisher}
                </p>
              </div>
              <div className="flex gap-[53px]">
                <p className="w-[180px] text-mooduck-gray">Серия</p>
                <p className="w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {book.bookSeries}
                </p>
              </div>
              <div className="flex gap-[53px]">
                <p className="w-[180px] text-mooduck-gray">
                  Количество страниц
                </p>
                <p className="w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {book.pageCount}
                </p>
              </div>
            </div>
            <Link
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={-10}
              duration={400}
            >
              <div className="text-mooduck-red transition-all ease-in hover:cursor-pointer hover:text-mooduck-blue">
                Все характеристики
              </div>
            </Link>
          </div>
        </div>
        <MyButton className="w-[540px] py-[15px]">Хочу почитать</MyButton>
      </div>
    </section>
  )
}

export default BookSmallInfo
