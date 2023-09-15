import { IAuthorsAndGenres } from '../../models/IAuthorsAndGenres'
import { ChangeEvent, FC } from 'react'
import Filter from './Filter'
import FilterMobile from './FilterMobile'

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
  updateResults: () => void
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
  resultGenres,
  updateResults
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
        updateResults={updateResults}
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
        updateResults={updateResults}
      />
    </>
  )
}

export default FilterContainer
