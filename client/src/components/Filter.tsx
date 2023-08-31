import { MyButton } from './UI'
import { ReactComponent as ToggleButtonToList } from '../assets/toggleButtonToList.svg'
import { ReactComponent as ToggleButtonToTiles } from '../assets/toggleButtonToTiles.svg'
import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { AUTHORS, GENRES, IAuthorsAndGenres } from '@/data/genreList'
// import { getUniqueObjects } from '@/services/TailwindMerge'
import CheckBox from './UI/CheckBox'
import { search } from '@/assets'
// import { bookAPI } from '@/services/BookService'

interface FilterProps {
  genres: IAuthorsAndGenres[]
  authors: IAuthorsAndGenres[]
  searchedAuthors: IAuthorsAndGenres[]
  handleOnClickAuthor: (id: string) => void
  handleOnClickGenre: (id: string) => void
  clear: () => void
  pushToGenres: (genre: string) => void
  pushToAuthors: (author: string) => void
  value: string
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
  createResults: () => void
  setList: (type:boolean) => void
}

const Filter: FC<FilterProps> = ({
  genres,
  authors,
  handleOnClickAuthor,
  handleOnClickGenre,
  searchedAuthors,
  clear,
  pushToGenres,
  pushToAuthors,
  value,
  handleOnChange,
  createResults,
  setList
}) => {
  // const [fetchBooks, { data, isLoading, error }] =
  //   bookAPI.endpoints.getSpecifyBooks.useLazyQuery()
  // const [value, setValue] = useState('')
  // const [authors, setAuthors] = useState<IAuthorsAndGenres[]>(
  //   getUniqueObjects(AUTHORS)
  // )
  // const [genres, setGenres] = useState<IAuthorsAndGenres[]>(
  //   getUniqueObjects(GENRES)
  // )
  // let resultAuthors: string[] = []
  // let resultGenres: string[] = []
  // const filteredAuthors = (authors: IAuthorsAndGenres[]) => {
  // console.log('Я сработала')

  //   const searchedAuthors = () => {
  //     if (value) {
  //       return authors.filter((author) =>
  //         author.author.toLowerCase().includes(value.toLowerCase())
  //       )
  //     } else {
  //       return authors
  //     }
  //   }
  //   return searchedAuthors()
  // }

  // const handleOnClickAuthor: (id: string) => void = (id) => {
  //   setAuthors(
  //     searchedAuthors.map((author) =>
  //       author.id === id ? { ...author, checked: !author.checked } : author
  //     )
  //   )
  // }

  // const handleOnClickGenre: (id: string) => void = (id) => {
  //   setGenres(
  //     genres.map((genre) =>
  //       genre.id === id ? { ...genre, checked: !genre.checked } : genre
  //     )
  //   )
  // }

  // const clear: () => void = () => {
  //   setGenres(
  //     genres.map((genre) =>
  //       genre.checked ? { ...genre, checked: !genre.checked } : genre
  //     )
  //   )
  //   setAuthors(
  //     searchedAuthors.map((author) =>
  //       author.checked ? { ...author, checked: !author.checked } : author
  //     )
  //   )
  // }

  // useEffect(() => {
  //   searchedAuthors.map((author) =>
  //     author.checked && pushToAuthors(author.author)
  //   )
  //   genres.map((genre) =>
  //     genre.checked && pushToGenres(genre.author)
  //   )
  // }, [searchedAuthors, genres])

  // console.log(data)

  return (
    <>
      {/* FILTER FOR DESKTOP */}

      <section className="hidden border-[2px] border-mooduck-black p-[30px] xl:flex xl:w-[380px] xl:flex-col xl:gap-y-5 2xl:flex 2xl:w-[525px] 2xl:flex-col 2xl:gap-y-5">
        <p className="text-base font-semibold uppercase">категории</p>
        <div className="h-[1px] w-full bg-mooduck-black" />
        <div className="flex flex-col gap-y-[10px]">
          <p className="text-base font-semibold uppercase">все книги</p>
          <div className="flex h-[245px] flex-col gap-y-[10px] overflow-auto ">
            {genres.map((genre) => (
              <CheckBox
                key={genre.author}
                checked={genre.checked}
                info={genre.author}
                onClick={handleOnClickGenre}
              ></CheckBox>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <p className="text-base font-semibold uppercase">автор</p>
          <div className="flex items-center border-[2px] border-mooduck-gray px-3 py-1">
            <input
              className="w-full"
              placeholder="Имя автора"
              value={value}
              onChange={handleOnChange}
            />
            <img src={search} />
          </div>
          <div className="flex h-[182px] flex-col gap-y-[10px] overflow-auto">
            {searchedAuthors.map((author) => (
              <CheckBox
                key={author.author}
                checked={author.checked}
                info={author.author}
                onClick={handleOnClickAuthor}
              ></CheckBox>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <MyButton
            className="w-full py-[10px]"
            onClick={createResults}
            // onClick={() =>
            //   fetchBooks({
            //     limit: 20,
            //     page: 1,
            //     genre: resultGenres?.join('-'),
            //     author: resultAuthors?.join('-')
            //   })
            // }
            // onClick={() => {
            //   if (resultGenres.length !== 0 && resultAuthors.length !== 0) {
            //     dispatch(fetchBooksFilter(30, 1, resultGenres, resultAuthors))
            //   } else if (
            //     resultAuthors.length === 0 &&
            //     resultGenres.length !== 0
            //   ) {
            //     dispatch(fetchBooksFilter(30, 1, resultGenres))
            //   } else if (
            //     resultGenres.length === 0 &&
            //     resultAuthors.length !== 0
            //   ) {
            //     dispatch(fetchBooksFilter(30, 1, undefined, resultAuthors))
            //   } else if (
            //     resultGenres.length === 0 &&
            //     resultAuthors.length === 0
            //   ) {
            //     dispatch(fetchBooksFilter(30, 1))
            //   }
            // }}
          >
            применить фильтры
          </MyButton>
          <MyButton
            className="w-full py-[10px]"
            onClick={() => {
              clear()
              //   dispatch(fetchBooks(16, 1))
              // setValue('')
              // searchedAuthors = authors
            }}
          >
            очистить фильтры
          </MyButton>
        </div>
      </section>

      {/* FILTER FOR LG AND SMALL */}

      <section className="flex h-[52px] w-[full] gap-x-5 xl:hidden 2xl:hidden">
        <MyButton className="w-full py-[15px]">Фильтры</MyButton>
        <div className="flex gap-x-5">
          <ToggleButtonToList className="hover:cursor-pointer" onClick={() => setList(true)} />
          <ToggleButtonToTiles className="hover:cursor-pointer" onClick={() => setList(false)} />
        </div>
      </section>
    </>
  )
}

export default Filter
function useLazyQuery<T, U>(
  getSpecifyBooks: any
): [any, { data: any; isLoading: any; error: any }] {
  throw new Error('Function not implemented.')
}
