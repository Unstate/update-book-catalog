import { BASE_URL } from '@/http'
import { IBooks, IComment } from '@/models/IBook'
import { CertainBook } from '@/models/ICertainBook'
import { IUser } from '@/models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IParamsFilterBooks {
  limit: number
  page: number
  genre: string[] | string | undefined
  author: string[] | string | undefined
}

interface IParamsFilterBooksTEST {
  limit: number
  page?: number
  id: string | undefined
}

interface ISetNewComment {
  id: string | undefined
  title: string
  text: string
  rating: number
}

interface IChangeLogo {
  id: string | undefined
  logoList: FileList
}

export interface IChangeUserData {
  id: string | undefined
  [key: string]: string | undefined
}

export interface IChangeResetPassword {
  token: string;
  password: string
}


export const bookAPI = createApi({
  reducerPath: 'booksApi', // уникальное имя api
  tagTypes: ['User', 'Book', 'FavoriteBook', 'Comment'],
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
    //BOOKS
    getBooksByText: builder.query<IBooks, string>({
      query: (text) => ({
        url: '/books',
        params: {
          text
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
      }),
      providesTags: (result, error, arg) =>
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
    getCertainBook: builder.query<CertainBook, string | undefined>({
      query: (id) => ({
        url: `/books/${id}`
      })
    }),
    //BOOKS ABOVE

    //COMMENTS
    getCertainBookComments: builder.query<IComment[], string | undefined>({
      query: (id) => ({
        url: `/books/${id}/comments`
      }),
      providesTags: ['Comment']
    }),
    setNewBookComment: builder.mutation<string, ISetNewComment>({
      query: (params) => ({
        url: `/books/${params.id}/comments`,
        method: 'POST',
        body: {
          title: params.title,
          text: params.text,
          rating: params.rating,
        },
      }),
      invalidatesTags: ['Comment']
    }),
    addLike: builder.mutation<string, string>({
      query: (id) => ({
        url: `/comments/${id}/likes`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment']
    }),
    deleteLike: builder.mutation<string, string>({
      query: (id) => ({
        url: `/comments/${id}/likes`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment']
    }),
    addDislike: builder.mutation<string, string>({
      query: (id) => ({
        url: `/comments/${id}/dislikes`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment']
    }),
    deleteDislike: builder.mutation<string, string>({
      query: (id) => ({
        url: `/comments/${id}/dislikes`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment']
    }),
    //COMMENTS ABOVE
    
    //USER
    getUser: builder.query<IUser, string | undefined>({
      query: (id) => ({
        url: `/users/${id}`
      }),
      providesTags: ['User']
    }),
    getUserFavoriteBooks: builder.query<IBooks, IParamsFilterBooksTEST>({
      query: (params) => ({
        url: `/users/${params.id}/favoritebooks`,
        params: {
          limit: params.limit,
        }
      }),
      providesTags: ['FavoriteBook']
    }),
    getUserComments: builder.query<IComment[], string | undefined>({
      query: (id) => ({
        url: `/users/${id}/comments`
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
      invalidatesTags: ['User']
    }),
    changeUserEmail: builder.mutation<string, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/email`,
        method: 'PUT',
        body: {
          email: params.email
        }
      }),
      invalidatesTags: ['User']
    }),
    checkUserPassword: builder.mutation<string, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/checkpassword`,
        method: 'POST',
        body: {
          password: params.password
        }
      })
    }),
    changeUserPassword: builder.mutation<string, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/password`,
        method: 'PUT',
        body: {
          email: params.password
        }
      }),
      invalidatesTags: ['User']
    }),
    addBookToFavorite: builder.mutation<
      { success: boolean },
      { userId: string; bookId: string }
    >({
      query: ({ userId, bookId }) => ({
        url: `/users/${userId}/favoritebooks`,
        method: 'POST',
        body: {
          bookId: bookId
        }
      }),
      invalidatesTags: ['FavoriteBook']
    }),
    deleteBookFromFavorite: builder.mutation<
      string,
      { userId: string; bookId: string }
    >({
      query: ({ userId, bookId }) => ({
        url: `/users/${userId}/favoritebooks`,
        method: 'DELETE',
        body: {
          bookId: bookId
        }
      }),
      invalidatesTags: ['FavoriteBook']
    }),
    changeUserLogo: builder.mutation<string, IChangeLogo>({
      query: (params) => ({
        url: `/users/${params.id}/logo`,
        params: {
          logo: params.logoList[0]
        },
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
      invalidatesTags: ['User']
    }),
    getUserImage: builder.query<Blob, string | undefined>({
      query: (id) => ({
        url: `users/${id}/logo`,
        responseType: 'blob',
        // headers: {
        //   'Response-Type': 'blob'
        // }
      }),
      // responseType: 'blob',
    }),
    resetPassword: builder.mutation<string, string>({
      query: (email) => ({
        url: `/auth/resetPassword`,
        method: 'POST',
        body: {
          email
        }
      }),
    }),
    changeResetPassword: builder.mutation<string, IChangeResetPassword >({
      query: (params) => ({
        url: `/auth/resetPassword`,
        method: 'PUT',
        body: {
          token: params.token,
          password: params.password,
        }
      }),
    }),
    //USER ABOVE
  })
})

export const {
  useLazyGetBooksByTextQuery,
  useLazyGetSpecifyBooksQuery,
  useGetUserFavoriteBooksQuery,
  useDeleteBookFromFavoriteMutation,
  useGetCertainBookQuery,
  useGetCertainBookCommentsQuery,
  useGetUserQuery,
  useChangeUserUsernameMutation,
  useChangeUserEmailMutation,
  useChangeUserPasswordMutation,
  useCheckUserPasswordMutation,
  useAddBookToFavoriteMutation,
  useChangeUserLogoMutation,
  useGetUserImageQuery,
  useSetNewBookCommentMutation,
  useAddDislikeMutation,
  useDeleteDislikeMutation,
  useAddLikeMutation,
  useDeleteLikeMutation,
  useResetPasswordMutation,
  useGetUserCommentsQuery,
  useChangeResetPasswordMutation,
} = bookAPI