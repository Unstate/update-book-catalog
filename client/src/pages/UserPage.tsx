import { BookElement, Footer, Header } from '@/components'
import { MyButton } from '@/components/UI'
import { ReactComponent as Barcode } from '../assets/barcode.svg'
import { ReactComponent as UnknownAvatar } from '../assets/goose.svg'
import {
  useChangeUserEmailMutation,
  useChangeUserUsernameMutation,
  useGetUserQuery,
  useLazyGetUserFavoriteBooksQuery
} from '@/services/BookService'
import { useParams } from 'react-router-dom'
import { useRef, useState } from 'react'
import Modal from '@/components/UI/Modal'
import { ReactComponent as ImageUploader } from '@/assets/imageBeforeHover.svg'
import { useAppDispatch } from '@/hooks/redux'
import { logout } from '@/store/actionCreators'
import { IBook } from '@/models/IBook'

const UserPage = () => {

  const dispatch = useAppDispatch()
  const { id } = useParams()

  const [visableUsername, setVisableUsername] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [visableEmail, setVisableEmail] = useState<boolean>(false)
  const [visablePhoto, setVisablePhoto] = useState<boolean>(false)
  
  

  const {
    data: userData,
    isError: userIsError,
    isLoading: userIsLoading,
    error: userUploadError
  } = useGetUserQuery(id)
  const [getUserFavoriteBooks, results] = useLazyGetUserFavoriteBooksQuery()
  const [
    changeUsername,
    {
      isError: changeUsernameError,
      isLoading: changeUsernameIsLoading,
      isSuccess: changeUsernameIsSuccess
    }
  ] = useChangeUserUsernameMutation()
  const [
    changeEmail,
    {
      isError: changeEmailIsError,
      isLoading: changeEmailIsLoading,
      isSuccess: changeEmailIsSuccess,
    }
  ] = useChangeUserEmailMutation()

  const handleChangeUsername = async(id:string | undefined, username:string) => {
    await changeUsername({id, username})
    handleCloseModal(setVisableUsername,setUsername)
  }

  //FIXME: Переделать типы
  const handleCloseModal = (closeModal:any, clearModal:any) => {
    closeModal(false)
    clearModal('')
  }


  // ВЫНЕСТИ КУДА-ТО
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileList | null>(null)

  const handleDragOver = (event: any) => {
    event.preventDefault()
  }

  const handleDrop = (event: any) => {
    event.preventDefault()
    setFiles(event.dataTransfer.files)
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleClearClick = (e: any) => {
    e.preventDefault()
    setFiles(null)
  }
  // ВЫНЕСТИ КУДА-ТО

  // console.log(userData)

  return (
    <div className="flex min-h-screen w-[590px] flex-col bg-mooduck-white py-[21px] lg:w-[990px] xl:w-[1400px] 2xl:w-[1400px]">
      <Header />
      <main className="flex flex-col gap-y-[30px] px-[42px] py-[21px]">
        <div>
          <p className="text-[25px] font-semibold text-mooduck-black">
            Личные данные
          </p>
          <section className="flex items-center justify-between xl:h-[464px] 2xl:h-[464px]">
            <div className="flex w-full items-center justify-center gap-x-[50px]  rounded-[15px] bg-mooduck-red p-[30px] xl:w-[729px] 2xl:w-[729px]">
              <UnknownAvatar />
              <div className="flex-col gap-y-[29px] ">
                <Barcode className="mb-[29px]" />
                <div className="flex flex-col gap-y-[29px]">
                  <div className="flex gap-x-[53px]">
                    <p className="w-[182px] text-xl font-normal text-[#FFFFFF80]">
                      Имя пользователя
                    </p>
                    <p className="text-xl text-mooduck-white">
                      {userData?.username}
                    </p>
                  </div>
                  <div className="flex gap-x-[53px]">
                    <p className="w-[182px] text-xl font-normal text-[#FFFFFF80]">
                      E-mail
                    </p>
                    <p className="w-[164px] text-xl text-mooduck-white">
                      {userData?.email}
                    </p>
                  </div>
                  <div className="flex gap-x-[53px]">
                    <p className="w-[182px] text-xl font-normal text-[#FFFFFF80]">
                      Пароль
                    </p>
                    <p className="text-xl text-mooduck-white">***********</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <MyButton
                className="w-[286px] py-[15px] text-base"
                onClick={() => setVisablePhoto(true)}
              >
                Изменить фотографию
              </MyButton>
              <MyButton
                className="w-[286px] py-[15px] text-base"
                onClick={() => setVisableUsername(true)}
              >
                Изменить имя пользователя
              </MyButton>
              <MyButton
                className="w-[286px] py-[15px] text-base"
                onClick={() => setVisableEmail(true)}
              >
                Изменить E-mail
              </MyButton>
              <MyButton className="w-[286px] py-[15px] text-base">
                Изменить пароль
              </MyButton>
              <MyButton
                className="w-[286px] py-[15px] text-base"
                onClick={() => dispatch(logout())}
              >
                Выйти из аккаунта
              </MyButton>
            </div>
          </section>
          <div className="h-[2px] w-full bg-mooduck-gray" />
        </div>
        <div>
          <p className="text-[25px] font-semibold text-mooduck-black">
            Закладки
          </p>
          <div>
            {results.data ? (
              results.data.books.map((book: IBook) => (
                <BookElement
                  author={book.authors}
                  title={book.title}
                  genres={book.genres}
                  img={book.img}
                  id={book._id}
                  description={book.description}
                  pageCount={book.pageCount}
                  publisher={book.publisher}
                  type={'tiles'}
                />
              ))
            ) : (
              <div>Нема</div>
            )}
          </div>
          {/* <div className='h-[2000px] w-full bg-mooduck-blue'/> */}
          <div className="h-[3px] w-full bg-mooduck-gray" />
        </div>
        <div>
          <p className="text-[25px] font-semibold text-mooduck-black">
            Комментарии
          </p>
        </div>
      </main>
      <Footer />
      {/* Вынести в отдельный компонент Modals */}
      {/* СДелать refetch(), также сделать закрытие попапа после нажатия на кнопку */}
      <Modal
        visable={visableUsername}
        setVisable={setVisableUsername}
        title={'Изменение имени пользователя'}
      >
        <input
          className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
          placeholder="Введите новое имя пользователя"
          name="changeUsername"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <MyButton
          className="py-[15px]"
          onClick={() => {
            handleChangeUsername(userData?.id, username)
            // changeUsername({ id: userData?.id, username: username })
            // setUsername('')
            // setVisableUsername(false)
            // refetch()
          }}
        >
          Сохранить изменения
        </MyButton>
      </Modal>
      <Modal
        visable={visableEmail}
        setVisable={setVisableEmail}
        title={'Изменение E-mail'}
      >
        <input
          className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
          placeholder="Введите новый адрес E-mail"
          name="changeUsername"
          type="text"
        />
      </Modal>

      {/* FIXME: Добавить пропс OnClick к Modal */}
      <Modal
        visable={visablePhoto}
        setVisable={setVisablePhoto}
        title={'Изменение фотографии'}
      >
        <div
          className="flex w-[346px] cursor-pointer flex-col items-center justify-center border-[2px] border-dotted border-[#160F29] p-[21px] lg:w-[692px] 2xl:w-[692px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {files ? (
            <div>
              <ul>
                {Array.from(files).map((file: any, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
              <div>
                <MyButton className="py-[15px]">Сохранить изменения</MyButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-y-[30px]">
              <ImageUploader className="mb-[30px] md:h-[80px] md:w-[80px] lg:h-[137px] lg:w-[137px] 2xl:h-[137px] 2xl:w-[137px]" />
              <p className="text-center font-semibold text-[#160F29] md:text-[22px] lg:text-[25px] 2xl:text-[25px]">
                Выберите изображение на устройстве
              </p>
              <input
                type="file"
                onChange={(event) => setFiles(event.target.files)}
                hidden
                accept="image/*"
                ref={inputRef}
              />
              <div className="flex gap-x-[30px]">
                <MyButton
                  className="px-[30px] py-[10px]"
                  onClick={(e) => handleClick(e)}
                >
                  Выбрать файл
                </MyButton>
                <MyButton
                  className="px-[30px] py-[15px]"
                  onClick={(e) => handleClick(e)}
                >
                  Вставить из буфера
                </MyButton>
              </div>
            </div>
          )}
        </div>
      </Modal>
      {/* Вынести в отдельный компонент Modals */}
    </div>
  )
}

export default UserPage
