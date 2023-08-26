import { BASE_URL } from '@/http'
import { IBooks } from '@/models/IBook'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bookAPI = createApi({
  reducerPath: 'booksApi', // уникальное имя api
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), //функция запроса на url
  endpoints: (builder) => ({
    getAllBooks: builder.query<IBooks, number>({
      query: (limit) => ({ url: `/books?limit=${limit}` })
    })
  })
})

export const { useGetAllBooksQuery } = bookAPI
