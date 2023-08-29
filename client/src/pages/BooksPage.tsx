import React from 'react'
import { useGetAllBooksQuery } from '@/services/BookService'
import BookElement from '@/components/BookElement'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BooksPage = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetAllBooksQuery(20)
  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      {isLoading && <h1>Загрузка</h1>}
      {isFetching && <h1>Получение</h1>}
      {error && <h1>Ошибка</h1>}
      <Header />
      <div className='flex gap-x-[34px] px-[42px] pt-[30px]'>
        <div className="min-h-screen w-[554px] bg-mooduck-blue" />
        {isSuccess && (
          <main className="flex w-full flex-wrap gap-x-[34px] gap-y-[30px]">
            {data.books.map((book) => (
              <BookElement
                author={book.authors}
                title={book.title}
                genres={book.genres}
                img={book.img}
                id={book._id}
                description={book.description}
                pageCount={book.pageCount}
                publisher={book.publisher}
              />
            ))}
          </main>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default BooksPage
