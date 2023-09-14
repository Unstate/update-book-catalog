import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../http'
import { IBooks } from '../../models/IBook'
import { IParamsFilterBooksBooks } from '../../models/queriesAndMutations'
import { CertainBook } from '../../models/ICertainBook'

export const api = createApi({
  reducerPath: 'mooduckApi', // уникальное имя api
  tagTypes: ['User', 'Book', 'FavoriteBook', 'Comment','Image'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    }
  }), //функция запроса на url
  endpoints: (builder) => ({
    // Query that get filtered books by the text that the user entered. The text filters the titles of books
    getBooksByText: builder.query<IBooks, string>({
      query: (text) => ({
        url: '/books',
        params: {
          text
        }
      })
    }),
    // Query that get books by Filter component
    getSpecifyBooks: builder.query<IBooks, IParamsFilterBooksBooks>({
      query: (params) => ({
        url: '/books',
        params: {
          limit: params.limit,
          page: params.page,
          genre: params.genre,
          author: params.author
        }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.books.map(({ _id }) => ({
                type: 'Book' as const,
                _id
              })),
              'Book'
            ]
          : ['Book']
    }),
    // Query that get certain book
    getCertainBook: builder.query<CertainBook, string | undefined>({
      query: (id) => ({
        url: `/books/${id}`
      })
    }),
  })
})

export const {
    useLazyGetBooksByTextQuery,
    useLazyGetSpecifyBooksQuery,
    useGetCertainBookQuery,
} = api
