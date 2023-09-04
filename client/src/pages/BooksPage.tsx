import { Footer, Header } from '@/components'
import BookElementList from '@/components/BookElementList'
import BookElementTiles from '@/components/BookElementTiles'
import FilterContainer from '@/components/Filter/FilterContainer'
import { Pagination, Preloader } from '@/components/UI'
import { AUTHORS, GENRES, IAuthorsAndGenres } from '@/data/genreList'
import { IBook } from '@/models/IBook'
import { useLazyGetSpecifyBooksQuery } from '@/services/BookService'
import { getUniqueObjects } from '@/utils'
import React, { ChangeEvent, useEffect, useState } from 'react'

const BooksPage = () => {
  const [getSpecifyBooks, results] = useLazyGetSpecifyBooksQuery()
  const [page, setPage] = React.useState<number>(1)
  const [list, setList] = React.useState<boolean>(false)
  const [visable, setVisable] = React.useState<boolean>(false)
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
  }

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
      <Header />
      <div className="flex flex-col gap-x-[34px] gap-y-[30px] px-[42px] pt-[30px] xl:flex-row xl:gap-y-0 2xl:flex-row 2xl:gap-y-0">
        <FilterContainer
          genres={genres}
          searchedAuthors={searchedAuthors}
          handleOnClickAuthor={handleOnClickAuthor}
          handleOnClickGenre={handleOnClickGenre}
          clear={clear}
          value={value}
          handleOnChange={handleOnChange}
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
      <Footer />
    </div>
  )
}

export default BooksPage
