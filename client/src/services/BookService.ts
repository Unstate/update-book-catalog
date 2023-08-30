import { BASE_URL } from '@/http'
import { IBooks, IComment } from '@/models/IBook'
import { CertainBook } from '@/models/ICertainBook';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IParamsNormalBooks {
  limit: number;
  page: number;
}

interface IParamsFilterBooks {
  limit: number;
  page: number;
  genre: string[];
  author: string[];
}


export const bookAPI = createApi({
  reducerPath: 'booksApi', // уникальное имя api
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), //функция запроса на url
  endpoints: (builder) => ({
    getAllBooks: builder.query<IBooks, IParamsNormalBooks>({
      query: (params) => ({
        url: '/books',
        params: {
          limit: params.limit,
          page: params.page,
          },
      })
    }),
    getSpecifyBooks: builder.query<IBooks, IParamsFilterBooks>({
      query: (params) =>  ({
        url: '/books',
        params: {
          limit: params.limit,
          page: params.page,
          genre: params.genre,
          author: params.author,
        }
      })
    }),
    getCertainBook: builder.query<CertainBook, string | undefined>({
      query: (id) => ({
        url: `/books/${id}`
      })
    }),
    getCertainBookComments: builder.query<IComment[], string | undefined>({
      query: (id) => ({
        url: `/books/${id}/comments`
      })
    })
  })
})

export const { useGetAllBooksQuery, useGetSpecifyBooksQuery, useGetCertainBookQuery, useGetCertainBookCommentsQuery } = bookAPI
