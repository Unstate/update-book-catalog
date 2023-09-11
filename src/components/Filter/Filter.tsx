import { ChangeEvent, FC } from 'react'
import { scrollToTop } from '../ScrollButton'
import { CheckBox, MyButton } from '../UI'
import { IAuthorsAndGenres } from '../../models/IAuthorsAndGenres'
import { search } from '../../assets'
import { ReactSVG } from 'react-svg'

interface FilterProps {
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

const Filter: FC<FilterProps> = ({
  genres,
  handleOnClickAuthor,
  handleOnClickGenre,
  searchedAuthors,
  clear,
  value,
  handleOnChange,
  createResults,
  test,
  page,
  resultAuthors,
  resultGenres
}) => {
  return (
    <>
      <section className="hidden h-[800px]  border-[2px] border-mooduck-black p-[30px] xl:flex xl:w-[380px] xl:flex-col xl:gap-y-5 2xl:flex 2xl:w-[525px] 2xl:flex-col 2xl:gap-y-5">
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
            <ReactSVG src={search} />
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
            onClick={() => {
              createResults()
              test({
                limit: 20,
                page: page,
                genre: resultGenres.length
                  ? resultGenres?.join('-')
                  : undefined,
                author: resultAuthors.length
                  ? resultAuthors?.join('-')
                  : undefined
              })
            }}
          >
            применить фильтры
          </MyButton>
          <MyButton
            className="w-full py-[10px]"
            onClick={() => {
              clear()
              scrollToTop()
              test({ limit: 20, page: 1, genre: undefined, author: undefined })
            }}
          >
            очистить фильтры
          </MyButton>
        </div>
      </section>
    </>
  )
}

export default Filter
