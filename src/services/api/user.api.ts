import { IBooks, IComment } from "../../models/IBook";
import { IUser } from "../../models/IUser";
import { IChangeResetPassword, IChangeUserData, IParamsFilterBooksUser } from "../../models/queriesAndMutations";
import { api } from "./api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get user`s data
    getUser: builder.query<IUser, string | undefined>({
        query: (id) => ({
          url: `/users/${id}`
        }),
        providesTags: ['User']
      }),
    // Get all favorites user`s books
    getUserFavoriteBooks: builder.query<IBooks, IParamsFilterBooksUser>({
      query: (params) => ({
        url: `/users/${params.id}/favoritebooks`,
        params: {
          limit: params.limit,
          page: params.page
        },
      }),
      providesTags: ["FavoriteBook"],
    }),
    // Get all user`s comments
    //FIXME: Check what providesTags can i add to this query
    getUserComments: builder.query<IComment[], string | undefined>({
      query: (id) => ({
        url: `/users/${id}/comments`,
      }),
    }),
    // Mutation that change user`s username 
    changeUserUsername: builder.mutation<any, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/username`,
        method: "PUT",
        body: {
          username: params.username,
        },
      }),
      invalidatesTags: ["User"],
    }),
    // Mutation that change user`s e-mail
    changeUserEmail: builder.mutation<any, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/email`,
        method: "PUT",
        body: {
          email: params.email,
        },
      }),
      invalidatesTags: ["User"],
    }),
    // Mutation that check correct of the password entered by the user
    checkUserPassword: builder.mutation<any, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/checkpassword`,
        method: "POST",
        body: {
          password: params.password,
        },
      }),
    }),
    // Mutation that change user`s password
    changeUserPassword: builder.mutation<any, IChangeUserData>({
      query: (params) => ({
        url: `/users/${params.id}/password`,
        method: "PUT",
        body: {
          password: params.password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    // Mutation that add certain book to user favorites books
    addBookToFavorite: builder.mutation<
      { success: boolean },
      { userId: string; bookId: string }
    >({
      query: ({ userId, bookId }) => ({
        url: `/users/${userId}/favoritebooks`,
        method: "POST",
        body: {
          bookId: bookId,
        },
      }),
      invalidatesTags: ["FavoriteBook"],
    }),
    // Mutation that delete certain book from user favorites books
    deleteBookFromFavorite: builder.mutation<
      any,
      { userId: string; bookId: string }
    >({
      query: ({ userId, bookId }) => ({
        url: `/users/${userId}/favoritebooks`,
        method: "DELETE",
        body: {
          bookId: bookId,
        },
      }),
      invalidatesTags: ["FavoriteBook"],
    }),
    // Mutation that send message to the user`s e-mail
    resetPassword: builder.mutation<any, string>({
      query: (email) => ({
        url: `/auth/resetPassword`,
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    // Mutation that changes a user's password using an early token sent
    changeResetPassword: builder.mutation<string, IChangeResetPassword>({
      query: (params) => ({
        url: `/auth/resetPassword`,
        method: "PUT",
        body: {
          token: params.token,
          password: params.password,
        },
      }),
    }),
  }),
});

export const {
    useGetUserQuery,
    useGetUserFavoriteBooksQuery,
    useGetUserCommentsQuery,
    useChangeUserUsernameMutation,
    useChangeUserEmailMutation,
    useCheckUserPasswordMutation,
    useChangeUserPasswordMutation,
    useAddBookToFavoriteMutation,
    useDeleteBookFromFavoriteMutation,
    useResetPasswordMutation,
    useChangeResetPasswordMutation,
} = userApi