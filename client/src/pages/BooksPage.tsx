import { BookElement, Footer, Header } from '@/components'
import { Pagination, Preloader } from '@/components/UI'
import { IBook } from '@/models/IBook'
import { useGetAllBooksQuery } from '@/services/BookService'
import React from 'react'

const BooksPage = () => {
  const [page, setPage] = React.useState<number>(1)
  const { data, error, isLoading, isSuccess } = useGetAllBooksQuery({
    limit: 20,
    page: page
  })
  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      {error && <h1>Ошибка</h1>}
      <Header />
      <div className="flex flex-col gap-x-[34px] gap-y-[30px] px-[42px] pt-[30px] xl:flex-row xl:gap-y-0 2xl:flex-row 2xl:gap-y-0">
        <div className="h-[52px] w-[full] bg-mooduck-blue xl:min-h-screen xl:w-[554px] 2xl:min-h-screen 2xl:w-[554px]" />
        {isLoading && <Preloader></Preloader>}
        {isSuccess && (
          <div className="flex w-full flex-col items-center">
            <main className="flex w-full flex-wrap gap-x-[74px] gap-y-[30px] lg:gap-x-[34px] xl:gap-x-[34px] 2xl:gap-x-[34px]">
              {data.books.map((book: IBook) => (
                <BookElement
                  key={book._id}
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
            <Pagination
              currentPage={data.page}
              lastPage={data.totalPages}
              maxLength={7}
              setCurrentPage={setPage}
            ></Pagination>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default BooksPage
