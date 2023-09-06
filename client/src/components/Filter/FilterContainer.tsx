import { IAuthorsAndGenres } from '@/data/genreList'
import { ChangeEvent, FC } from 'react'
import Filter from '../Filter'
import FilterMobile from '../FilterMobile'

interface FilterContainerProps {
  genres: IAuthorsAndGenres[]
  searchedAuthors: IAuthorsAndGenres[]
  handleOnClickAuthor: (id: string) => void
  handleOnClickGenre: (id: string) => void
  clear: () => void
  value: string
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
  createResults: () => void
  setList: (type: boolean) => void
  test: Function
  page: number
  resultAuthors: string[]
  resultGenres: string[]
}

const FilterContainer: FC<FilterContainerProps> = ({
  genres,
  handleOnClickAuthor,
  handleOnClickGenre,
  searchedAuthors,
  clear,
  value,
  handleOnChange,
  createResults,
  setList,
  test,
  page,
  resultAuthors,
  resultGenres
}) => {
  return (
    <>
      <Filter
        genres={genres}
        searchedAuthors={searchedAuthors}
        handleOnClickAuthor={handleOnClickAuthor}
        handleOnClickGenre={handleOnClickGenre}
        clear={clear}
        value={value}
        handleOnChange={handleOnChange}
        createResults={createResults}
        setList={setList}
        test={test}
        page={page}
        resultGenres={resultGenres}
        resultAuthors={resultAuthors}
      />
      <FilterMobile
        genres={genres}
        searchedAuthors={searchedAuthors}
        handleOnClickAuthor={handleOnClickAuthor}
        handleOnClickGenre={handleOnClickGenre}
        clear={clear}
        value={value}
        handleOnChange={handleOnChange}
        createResults={createResults}
        setList={setList}
        test={test}
        page={page}
        resultGenres={resultGenres}
        resultAuthors={resultAuthors}
      />
    </>
  )
}

export default FilterContainer
