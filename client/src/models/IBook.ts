import { IArray } from "../utils/checkExtendOfUser"

export interface IImages {
  // картинки приходят в таком формате
  largeFingernail: string
  mediumFingernail: string
  smallFingernail: string
}

export interface IBook {
  // все поля которые есть у книги при запросе на ВСЕ книги
  _id: string
  authors: string[]
  genres: string[]
  title: string
  img: IImages
  description: string
  pageCount: number
  publisher: string
}

export interface IComment {
  // все поля которые есть у комментариев
  bookId: string
  date: number
  dislikes: IArray[]
  likes: IArray[]
  rating: number
  text: string
  title: string
  userId: string
  _id: string
}

export interface IBooks {
  books: IBook[]
  isLoading: boolean
  error: string
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  comments: IComment[]
  lines: boolean
}
