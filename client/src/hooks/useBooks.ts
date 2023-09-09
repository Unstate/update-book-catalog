import { useState } from 'react'
import { useInput } from './useInput'
import { getUniqueObjects } from '@/utils'

import { IAuthorsAndGenres } from '@/models/IAuthorsAndGenres'
import { AUTHORS, GENRES } from '@/constants/constants'

export const useBooks = (
  initialPage: number,
  initialList: boolean,
  initialValue: string
) => {
  const [page, setPage] = useState<number>(initialPage)
  const [list, setList] = useState<boolean>(initialList)
  const value = useInput(initialValue)
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
      if (value.value) {
        return authors.filter((author) =>
          author.author.toLowerCase().includes(value.value.toLowerCase())
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

  return {
    page,
    list,
    value,
    handleOnClickView,
    handleOnClickAuthor,
    handleOnClickGenre,
    clear,
    searchedAuthors,
    createResults,
    resultAuthors,
    resultGenres,
    genres,
    setPage
  }
}
