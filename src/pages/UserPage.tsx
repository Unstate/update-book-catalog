import { BookElementTiles, Comments, Layout } from '@/components'

import {
  useGetUserCommentsQuery,
  useGetUserFavoriteBooksQuery,
  useGetUserQuery
} from '@/services/BookService'

import { useParams } from 'react-router-dom'

import { IBook } from '@/models/IBook'

import UserSettings from '@/components/UserComponents/UserSettings'
import { useVisable } from '@/hooks/useVisable'

const UserPage = () => {
  const { id } = useParams()

  const {
    data: userData,
    isError: userIsError,
    isLoading: userIsLoading,
    error: userUploadError
  } = useGetUserQuery(id)

  const { data: userFavoriteBooks } = useGetUserFavoriteBooksQuery({
    id: id,
    limit: 10000
  })

  const { data: userComments } = useGetUserCommentsQuery(id)
  const { showMoreItems, visibleItemsCount } = useVisable(10)

  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] 2xl:w-[1400px]">
      <Layout>
        <main className="flex flex-col gap-y-[30px] px-[42px] py-[21px]">
          <div className="">
            <p className="mb-[30px] text-[25px] font-semibold text-mooduck-black">
              Личные данные
            </p>
            {userData && <UserSettings user={userData}  />}
            <div className="h-[2px] w-full bg-mooduck-gray" />
          </div>
          <div className="flex flex-col gap-y-[30px]">
            <p className="text-[25px] font-semibold text-mooduck-black">
              Закладки
            </p>
            <div className="flex flex-wrap gap-x-[106px] gap-y-[30px] md:gap-x-[106px] lg:gap-x-[153px] 2xl:gap-x-[79px]">
              {userFavoriteBooks ? (
                userFavoriteBooks.books
                  .slice(0, visibleItemsCount)
                  .map((book: IBook) => (
                    <BookElementTiles
                      key={book._id}
                      author={book.authors}
                      title={book.title}
                      img={book.img}
                      id={book._id}
                    />
                  ))
              ) : (
                <p className="text-xl">
                  Закладок ещё нет — заложите же что-нибудь!
                </p>
              )}
            </div>
            {userFavoriteBooks?.books.length && (
              <p
                className={`cursor-pointer text-center text-[20px] font-semibold
                    text-[#160F29] hover:text-[#246A73] ${
                      visibleItemsCount >= userFavoriteBooks?.books.length
                        ? 'hidden'
                        : 'block'
                    }`}
                onClick={showMoreItems}
              >
                Показать больше книг
              </p>
            )}
            <div className="h-[3px] w-full bg-mooduck-gray" />
          </div>
          <div className="flex flex-col gap-y-[30px]">
            <p className="text-[25px] font-semibold text-mooduck-black">
              Комментарии
            </p>
            <div>
              {userComments?.length ? (
                <Comments comments={userComments} />
              ) : (
                <p className="text-xl">
                  Комментариев ещё нет — вы можете оставить первый
                </p>
              )}
            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}

export default UserPage
