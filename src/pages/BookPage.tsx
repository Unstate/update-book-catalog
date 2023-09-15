import { Line, MyButton, Preloader } from '../components/UI'
import { BookBigInfo, BookSmallInfo, Comments, Layout } from '../components'
import ModalComment from '../components/UI/modal/ModalComment'

import { useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

import { useGetCertainBookQuery } from '../services/api/api'
import { useGetCertainBookCommentsQuery } from '../services/api/comments.api'

const BookPage = () => {

  const { id } = useParams()
  const modal = useForm()

  const { isLoading, data, } =
    useGetCertainBookQuery(id)

  //FIXME: If it does not work change id ? id : '' to id and add string | undefing in query
  const {
    data: comments,
  } = useGetCertainBookCommentsQuery(id ? id : '')
  

  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      <Layout>
        <main className="min-h-screen w-full flex-col gap-y-[30px] px-[42px] pt-[30px]">
          {isLoading && <Preloader />}
          <p className="text-base text-mooduck-gray">
            Все книги / {data?.title}
          </p>
          {data && <BookSmallInfo book={data} />}
          <Line />
          {data && <BookBigInfo book={data} />}
          <Line />
          <section className="flex w-full flex-col gap-y-5 py-[30px]">
            <div className="flex items-center justify-between">
              <p className="text-[25px] font-bold text-mooduck-black">
                Комментарии
              </p>
              <MyButton
                className="w-[250px] py-4"
                onClick={() => modal.handleOnClick(true)}
              >
                Написать комментарий
              </MyButton>
              <ModalComment id={id} visable={modal.visable} setVisable={modal.handleOnClick} />
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
      </Layout>
    </div>
  )
}

export default BookPage
