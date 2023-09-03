import { BASE_URL } from '@/http'
import { IBooks, IComment } from '@/models/IBook'
import { CertainBook } from '@/models/ICertainBook'
import { IUser } from '@/models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IParamsNormalBooks {
  limit: number
  page: number
}

interface IParamsFilterBooks {
  limit: number
  page: number
  genre: string[] | string | undefined
  author: string[] | string | undefined
}

interface IChangeUsername {
  id: string | undefined
  username: string
}

interface IChangeEmail {
  id: string | undefined
  email: string
}

export interface IChangeUserData {
  id: string | undefined;
  [key: string]: string | undefined;
}

export const bookAPI = createApi({
  reducerPath: 'booksApi', // уникальное имя api
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }  }), //функция запроса на url
  endpoints: (builder) => ({
    getAllBooks: builder.query<IBooks, IParamsNormalBooks>({
      query: (params) => ({
        url: '/books',
        params: {
          limit: params.limit,
          page: params.page
        }
      })
    }),
    getSpecifyBooks: builder.query<IBooks, IParamsFilterBooks>({
      query: (params) => ({
        url: '/books',
        params: {
          limit: params.limit,
          page: params.page,
          genre: params.genre,
          author: params.author
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
    }),
    getUser: builder.query<IUser, string | undefined>({
      query: (id) => ({
        url: `/users/${id}`
      }),
      providesTags: () => [
        {
          type: 'User'
        }
      ],
    }),
    getUserFavoriteBooks: builder.query<IBooks, string | undefined>({
      query: (id) => ({
        url: `/users/${id}/favoritebooks`
      }),
    }),
    changeUserUsername: builder.mutation<string, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/username`,
        method: 'PUT',
        body: {
          username: params.username
        }
      }),
      invalidatesTags: () => [{
        type: 'User'
      }]
    }),
    changeUserEmail: builder.mutation<string, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/email`,
        method: 'PUT',
        body: {
          email: params.email
        }
      }),
      invalidatesTags: () => [{
        type: 'User'
      }]
    }),
  })
})

export const {
  useGetAllBooksQuery,
  useLazyGetSpecifyBooksQuery,
  useLazyGetUserFavoriteBooksQuery,
  useGetCertainBookQuery,
  useGetCertainBookCommentsQuery,
  useGetUserQuery,
  useChangeUserUsernameMutation,
  useChangeUserEmailMutation,
} = bookAPI
