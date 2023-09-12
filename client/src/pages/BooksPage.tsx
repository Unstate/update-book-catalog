import {
  BookElementList,
  BookElementTiles,
  FilterContainer,
  Layout
} from '../components'
import { Pagination, Preloader } from '../components/UI'

import { IBook } from '../models/IBook'

import { useBooks } from '../hooks/useBooks'
import { useLazyGetSpecifyBooksQuery } from '../services/BookService'
import { useEffect } from 'react'

const BooksPage = () => {

  const [getSpecifyBooks, results] = useLazyGetSpecifyBooksQuery()
  
  const {
    page,
    list,
    value,
    clear,
    createResults,
    handleOnClickAuthor,
    handleOnClickGenre,
    handleOnClickView,
    searchedAuthors,
    resultAuthors,
    resultGenres,
    genres,
    setPage
  } = useBooks(1, false, '')

  useEffect(() => {
    getSpecifyBooks({
      limit: 20,
      page: page,
      genre: resultGenres.length ? resultGenres?.join('-') : undefined,
      author: resultAuthors.length ? resultAuthors?.join('-') : undefined
    })
  }, [page])

  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      {results.error && <h1>Ошибка</h1>}
      <Layout>
        <div className="flex flex-col gap-x-[34px] gap-y-[30px] px-[42px] pt-[30px] xl:flex-row xl:gap-y-0 2xl:flex-row 2xl:gap-y-0">
          <FilterContainer
            genres={genres}
            searchedAuthors={searchedAuthors}
            handleOnClickAuthor={handleOnClickAuthor}
            handleOnClickGenre={handleOnClickGenre}
            clear={clear}
            value={value.value}
            handleOnChange={value.bind.onChange}
            createResults={createResults}
            setList={handleOnClickView}
            test={getSpecifyBooks}
            page={page}
            resultGenres={resultGenres}
            resultAuthors={resultAuthors}
          />
          {results.isLoading && <Preloader></Preloader>}
          {results.isSuccess && (
            <div className="flex w-full flex-col items-center">
              {list ? (
                <main className="flex min-h-screen w-full flex-col flex-wrap gap-x-[105px] gap-y-[30px] lg:gap-x-[34px] xl:gap-x-[25px] 2xl:gap-x-[34px]">
                  {results.data.books.map((book: IBook) => (
                    <BookElementList
                      key={book._id}
                      author={book.authors}
                      title={book.title}
                      img={book.img}
                      id={book._id}
                      description={book.description}
                      pageCount={book.pageCount}
                      publisher={book.publisher}
                    />
                  ))}
                </main>
              ) : (
                <main className="flex min-h-screen w-full flex-wrap gap-x-[105px] gap-y-[30px] lg:gap-x-[34px] xl:gap-x-[25px] 2xl:gap-x-[33px]">
                  {results.data.books.map((book: IBook) => (
                    <BookElementTiles
                      key={book._id}
                      author={book.authors}
                      title={book.title}
                      img={book.img}
                      id={book._id}
                    />
                  ))}
                </main>
              )}
              <Pagination
                currentPage={results.data.page}
                lastPage={results.data.totalPages}
                maxLength={7}
                setCurrentPage={setPage}
              ></Pagination>
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default BooksPage