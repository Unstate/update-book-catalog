import { IComment } from "../../models/IBook";
import { ISetNewComment } from "../../models/queriesAndMutations";
import { api } from "./api";

const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Query that gets all the comments on the book
    getCertainBookComments: builder.query<IComment[], string>({
      query: (id) => ({
        url: `/books/${id}/comments`,
      }),
      providesTags: ["Comment"],
    }),
    // Mutation that sets new comment to the book
    setNewBookComment: builder.mutation<any, ISetNewComment>({
      query: (params) => ({
        url: `/books/${params.id}/comments`,
        method: "POST",
        body: {
          title: params.title,
          text: params.text,
          rating: params.rating,
        },
      }),
      invalidatesTags: ["Comment"],
    }),
    // Mutation that add like to the comment
    addLike: builder.mutation<any, string>({
      query: (id) => ({
        url: `/comments/${id}/likes`,
        method: "POST",
      }),
      invalidatesTags: ["Comment"],
    }),
    // Mutation that delete like to the comment
    deleteLike: builder.mutation<any, string>({
      query: (id) => ({
        url: `/comments/${id}/likes`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    // Mutation that add dislike to the comment
    addDislike: builder.mutation<any, string>({
      query: (id) => ({
        url: `/comments/${id}/dislikes`,
        method: "POST",
      }),
      invalidatesTags: ["Comment"],
    }),
    // Mutation that delete dislike to the comment
    deleteDislike: builder.mutation<any, string>({
      query: (id) => ({
        url: `/comments/${id}/dislikes`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCertainBookCommentsQuery,
  useSetNewBookCommentMutation,
  useAddLikeMutation,
  useDeleteLikeMutation,
  useAddDislikeMutation,
  useDeleteDislikeMutation,
} = commentsApi;
