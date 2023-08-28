import React from 'react'
import { useGetAllBooksQuery } from '@/services/BookService'

const BooksPage = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetAllBooksQuery(20)

  console.log(data)
  return (
    <>
      {isLoading && <h1>Загрузка</h1>}
      {isFetching && <h1>Получение</h1>}
      {error && <h1>Ошибка</h1>}
      {isSuccess && (
        <section>
          {data.books.map((book) => (
            <div key={book._id}>{book.title}</div>
          ))}
        </section>
      )}
    </>
  )
}

export default BooksPage
