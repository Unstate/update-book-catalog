import { Footer, Header } from '@/components'
import { MyButton, Preloader } from '@/components/UI'
import {
  useGetCertainBookCommentsQuery,
  useGetCertainBookQuery
} from '@/services/BookService'
import { correctViewOfAuthors } from '@/services/TailwindMerge'
import { coverIsMissing } from '@/assets'
import { useParams } from 'react-router-dom'
import { Link, animateScroll as scroll } from 'react-scroll'
import Comment from '@/components/UI/Comment'

const BookPage = () => {
  const { id } = useParams()
  const { isSuccess, isError, isLoading, data, error } =
    useGetCertainBookQuery(id)
  const {
    isSuccess: isSuccessComments,
    isError: isErrorComments,
    isLoading: isLoadingComments,
    data: comments,
    error: commentsError
  } = useGetCertainBookCommentsQuery(id)

  

  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      <Header />
      <main className="min-h-screen w-full flex-col gap-y-[30px] px-[42px] pt-[30px]">
        {isLoading && <Preloader></Preloader>}
        <p className="text-base text-mooduck-gray">Все книги / {data?.title}</p>
        <section className="flex w-full gap-x-[59px] py-[30px]">
          <img
            className="w-[288px]"
            src={data?.img.largeFingernail}
            alt="Картинка не прогрузилась"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = coverIsMissing
            }}
          />
          <div className="flex flex-col gap-y-[50px]">
            <div className="flex flex-col gap-y-5">
              <p className="text-[25px] font-bold text-mooduck-black">
                {data?.title}
              </p>
              <p className="text-base text-mooduck-gray">
                {correctViewOfAuthors(data?.authors)}
              </p>
            </div>
            <div className="flex gap-x-[50px]">
              <div className="flex flex-col gap-y-[20px]">
                <p className="h-[162px] w-[540px] overflow-hidden">
                  {data?.description}
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
                      {data?.genres[0]}
                    </p>
                  </div>
                  <div className="flex gap-[53px]">
                    <p className="w-[180px] text-mooduck-gray">Издательство</p>
                    <p className="w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {data?.publisher}
                    </p>
                  </div>
                  <div className="flex gap-[53px]">
                    <p className="w-[180px] text-mooduck-gray">Серия</p>
                    <p className="w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {data?.bookSeries}
                    </p>
                  </div>
                  <div className="flex gap-[53px]">
                    <p className="w-[180px] text-mooduck-gray">
                      Количество страниц
                    </p>
                    <p className="w-[146px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {data?.pageCount}
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
        <div className="h-[2px] w-full bg-mooduck-gray" />
        <section
          id="section1"
          className="flex w-full flex-col gap-y-[30px] py-[30px]"
        >
          <p className="text-[25px] font-bold text-mooduck-black">О книге</p>
          <p className="w-2/3">{data?.description}</p>
          <p className="text-[25px] font-bold text-mooduck-black">
            Характеристики
          </p>
          <div className="flex gap-x-[70px]">
            <div className="flex flex-col gap-y-5">
              <div className="flex">
                <p className="w-[134px] text-mooduck-gray">Жанр</p>
                <div>
                  {data?.genres.map((genre, index) => (
                    <div className="w-[162px]" key={index}>
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                <p className="w-[134px] text-mooduck-gray">Издательство</p>
                <p className="w-[162px]">{data?.publisher}</p>
              </div>
              <div className="flex">
                <p className="w-[134px] text-mooduck-gray">Серия</p>
                <p className="w-[162px]">{data?.bookSeries}</p>
              </div>
              <div className="flex">
                <p className="w-[134px] text-mooduck-gray">Переплет</p>
                <p className="w-[162px]">{data?.bookBinding}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="flex">
                <p className="w-[200px] text-mooduck-gray">Художник</p>
                <div>
                  {data?.painters.length ? (
                    data?.painters.map((painter, index) => (
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
                  {data?.translaters.length ? (
                    data?.translaters.map((translater, index) => (
                      <div key={index}>{translater}</div>
                    ))
                  ) : (
                    <div> — </div>
                  )}
                </div>
              </div>
              <div className="flex">
                <p className="w-[200px] text-mooduck-gray">Год издания</p>
                <p>{data?.publishedDate}</p>
              </div>
              <div className="flex">
                <p className="w-[200px] text-mooduck-gray">
                  Количество страниц
                </p>
                <p>{data?.pageCount}</p>
              </div>
            </div>
          </div>
        </section>
        <div className="h-[2px] w-full bg-mooduck-gray" />
        {/*Сделать компонент Comments*/}
        <section className="w-full py-[30px] flex flex-col gap-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[25px] font-bold text-mooduck-black">
              Комментарии
            </p>
            <MyButton className="w-[250px] py-4">Написать комментарий</MyButton>
          </div>
          <div className='flex flex-col gap-y-5'>
            {comments?.map((comment) => (
              <Comment
                key={comment._id}
                title={comment.title}
                description={comment.text}
                rating={comment.rating}
                dislikes={comment.dislikes}
                likes={comment.likes}
                date={comment.date}
                userId={comment.userId}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default BookPage
