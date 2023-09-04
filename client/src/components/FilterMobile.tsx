import { ChangeEvent, FC, useState } from 'react'
import Modal from './UI/Modal'
import { search } from '@/assets'
import { IAuthorsAndGenres } from '@/data/genreList'
import { MyButton } from './UI'
import { scrollToTop } from './ScrollButton'
import CheckBox from './UI/CheckBox'
import { ReactComponent as ToggleButtonToList } from '@/assets/toggleButtonToList.svg'
import { ReactComponent as ToggleButtonToTiles } from '@/assets/toggleButtonToTiles.svg'

interface FilterMobileProps {
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

const FilterMobile: FC<FilterMobileProps> = ({
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
  const [visable, setVisable] = useState<boolean>(false)

  return (
    <>
      <section className="flex h-[52px] w-[full] gap-x-5 xl:hidden 2xl:hidden">
        <MyButton className="w-full py-[15px]" onClick={() => setVisable(true)}>
          Фильтры
        </MyButton>
        <div className="flex gap-x-5">
          <ToggleButtonToList
            className="hover:cursor-pointer"
            onClick={() => setList(true)}
          />
          <ToggleButtonToTiles
            className="hover:cursor-pointer"
            onClick={() => setList(false)}
          />
        </div>
      </section>
      <Modal visable={visable} setVisable={setVisable} title={''}>
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
              setVisable(false)
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
              setVisable(false)
            }}
          >
            очистить фильтры
          </MyButton>
        </div>
      </Modal>
    </>
  )
}

export default FilterMobile
