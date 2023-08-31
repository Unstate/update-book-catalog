import { BookElement, Footer, Header } from '@/components'
import Filter from '@/components/Filter'
import { Pagination, Preloader } from '@/components/UI'
import { AUTHORS, GENRES, IAuthorsAndGenres } from '@/data/genreList'
import { IBook } from '@/models/IBook'
import {
  useGetAllBooksQuery,
  useGetSpecifyBooksQuery
} from '@/services/BookService'
import { getUniqueObjects } from '@/services/TailwindMerge'
import React, { ChangeEvent, useEffect, useState } from 'react'

const BooksPage = () => {
  //сделать запрос с помощью useLazyQuery
  const [page, setPage] = React.useState<number>(1)
  const [list, setList] = React.useState<boolean>(true)
  const [value, setValue] = useState<string>('')
  const [authors, setAuthors] = useState<IAuthorsAndGenres[]>(
    getUniqueObjects(AUTHORS)
  )
  const [genres, setGenres] = useState<IAuthorsAndGenres[]>(
    getUniqueObjects(GENRES)
  )
  let resultAuthors: string[] = []
  let resultGenres: string[] = []

  const handleOnClickView = (type: boolean) => {
    setList(type)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  const handleOnClickAuthor: (id: string) => void = (id) => {
    setAuthors(
      searchedAuthors.map((author) =>
        author.id === id ? { ...author, checked: !author.checked } : author
      )
    )
  }

  const handleOnClickGenre: (id: string) => void = (id) => {
    setGenres(
      genres.map((genre) =>
        genre.id === id ? { ...genre, checked: !genre.checked } : genre
      )
    )
  }

  const clear: () => void = () => {
    setGenres(
      genres.map((genre) =>
        genre.checked ? { ...genre, checked: !genre.checked } : genre
      )
    )
    setAuthors(
      searchedAuthors.map((author) =>
        author.checked ? { ...author, checked: !author.checked } : author
      )
    )
  }

  const filteredAuthors = (authors: IAuthorsAndGenres[]) => {
    const searchedAuthors = () => {
      if (value) {
        return authors.filter((author) =>
          author.author.toLowerCase().includes(value.toLowerCase())
        )
      } else {
        return authors
      }
    }
    return searchedAuthors()
  }
  var searchedAuthors = filteredAuthors(authors)
  // searchedAuthors.map((author) =>
  //     author.checked ? resultAuthors.push(author.author) : resultAuthors
  //   )
  //   genres.map((genre) =>
  //     genre.checked ? resultGenres.push(genre.author) : resultGenres
  //   )
  const pushToAuthors = (author: string) => {
    resultAuthors.push(author)
  }

  const pushToGenres = (genre: string) => {
    resultGenres.push(genre)
  }

  const createResults = () => {
    authors
      .filter((author) => author.checked)
      .map((el) => pushToAuthors(el.author))
    genres
      .filter((author) => author.checked)
      .map((el) => pushToGenres(el.author))
    console.log(resultAuthors?.join('-'))
    console.log(resultGenres?.join('-'))
    // console.log(res)
    // genres.map(genre => genre.checked && pushToGenres)
  }
  // useEffect(() => {
  //     searchedAuthors.map((author) =>
  //       author.checked && pushToAuthors(author.author)
  //     )
  //     genres.map((genre) =>
  //       genre.checked && pushToGenres(genre.author)
  //     )
  //   }, [searchedAuthors, genres])
  const { data, error, isLoading, isSuccess } = useGetSpecifyBooksQuery({
    limit: 20,
    page: page,
    genre: undefined,
    author: undefined
    // genre: resultGenres?.join('-'),
    // author: resultAuthors?.join('-'),
  })

  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      {error && <h1>Ошибка</h1>}
      <Header />
      <div className="flex flex-col gap-x-[34px] gap-y-[30px] px-[42px] pt-[30px] xl:flex-row xl:gap-y-0 2xl:flex-row 2xl:gap-y-0">
        <Filter
          genres={genres}
          authors={searchedAuthors}
          searchedAuthors={searchedAuthors}
          handleOnClickAuthor={handleOnClickAuthor}
          handleOnClickGenre={handleOnClickGenre}
          clear={clear}
          pushToGenres={pushToGenres}
          pushToAuthors={pushToAuthors}
          value={value}
          handleOnChange={handleOnChange}
          createResults={createResults}
          setList={handleOnClickView}
        />
        {/* <div className="h-[52px] w-[full] bg-mooduck-blue xl:min-h-screen xl:w-[554px] 2xl:min-h-screen 2xl:w-[554px]" /> */}
        {isLoading && <Preloader></Preloader>}
        {isSuccess && (
          <div className="flex w-full flex-col items-center">
            {list ? (
              <main className="flex flex-col w-full flex-wrap gap-x-[105px] gap-y-[30px] lg:gap-x-[34px] xl:gap-x-[25px] 2xl:gap-x-[34px]">
                {data.books.map((book: IBook) => (
                  <BookElement
                    type='list'
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
            ) : (
              <main className="flex w-full flex-wrap gap-x-[105px] gap-y-[30px] lg:gap-x-[34px] xl:gap-x-[25px] 2xl:gap-x-[33px]">
                {data.books.map((book: IBook) => (
                  <BookElement
                    type='tiles'
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
            )}
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
