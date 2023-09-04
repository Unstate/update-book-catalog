import { Footer, Header } from '@/components'
import { MyButton, Preloader } from '@/components/UI'
import {
  useGetCertainBookCommentsQuery,
  useGetCertainBookQuery
} from '@/services/BookService'
import { useParams } from 'react-router-dom'
import Comments from '@/components/Comments'
import { useState } from 'react'
import ModalComment from '@/components/UI/modal/ModalComment'
import BookSmallInfo from '@/components/BookSmallInfo'
import BookBigInfo from '@/components/BookBIgInfo'
import Line from '@/components/UI/Line'

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
  const [visable, setVisable] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      <Header />
      <main className="min-h-screen w-full flex-col gap-y-[30px] px-[42px] pt-[30px]">
        {isLoading && <Preloader/>}
        <p className="text-base text-mooduck-gray">Все книги / {data?.title}</p>
        {data && <BookSmallInfo book={data} />}
        <Line />
        {data && <BookBigInfo book={data} />}
        <Line /> 
        {/* Добавил Line, было так как снизу */}
        {/* <div className="h-[2px] w-full bg-mooduck-gray" /> */}
        <section className="flex w-full flex-col gap-y-5 py-[30px]">
          <div className="flex items-center justify-between">
            <p className="text-[25px] font-bold text-mooduck-black">
              Комментарии
            </p>
            <MyButton
              className="w-[250px] py-4"
              onClick={() => setVisable(true)}
            >
              Написать комментарий
            </MyButton>
          </div>
          {comments?.length ? (
            <Comments comments={comments} />
          ) : (
            <p className="text-xl">
              Комментариев ещё нет — вы можете быть первым
            </p>
          )}
        </section>
      </main>
      <Footer />
      <ModalComment id={id} visable={visable} setVisable={setVisable} />
    </div>
  )
}

export default BookPage
