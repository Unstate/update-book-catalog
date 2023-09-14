import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useInput } from "../../hooks/useInput";
import { checkExtendOfBook } from "../../utils/checkExtendOfBook";

import LogoAndNameOfCompany from "./LogoAndNameOfCompany";
import { Link } from "react-router-dom";

import { bookMark, search, unknownAvatar } from "../../assets";
import coverMiddle from "../../assets/coverMiddle.svg";

import { IBook } from "../../models/IBook";
import { useForm } from "../../hooks/useForm";
import ModalHeaderSearch from "../UI/modal/ModalHeaderSearch";
import { ReactSVG } from "react-svg";
import { useLazyGetBooksByTextQuery } from "../../services/api/api";
import {
  useAddBookToFavoriteMutation,
  useDeleteBookFromFavoriteMutation,
  useGetUserFavoriteBooksQuery,
} from "../../services/api/user.api";
import { useEffect } from "react";
import { getUserImage } from "../../store/actionCreators";

const Header = () => {
  const { user } = useAppSelector((store) => store.userReducer);
  const { logo } = useAppSelector((store) => store.userReducer);
  const { bind, reset, value } = useInput("");
  const modal = useForm();
  const dispatch = useAppDispatch()

  const [getBooksByText, { data: books, isSuccess: booksIsSuccess }] =
    useLazyGetBooksByTextQuery();
  const { data: userData } = useGetUserFavoriteBooksQuery({
    id: user?.id,
    limit: 1000,
    page: 1,
  });
  const [addBookToFavorite] = useAddBookToFavoriteMutation();
  const [deleteBookFromFavorite] = useDeleteBookFromFavoriteMutation();
  const isMobile = window.innerWidth <= 1023;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getBooksByText(value);
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserImage(user?.id))
    }
  }, [])

  return (
    <>
      {isMobile ? (
        <header
          id="header1"
          className="flex w-full flex-col gap-y-[30px] px-[42px] pt-[21px] "
        >
          <div className=" flex items-center justify-between">
            <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
            <Link to={`/user/${user.id}`}>
              <img
                className="h-[40px] w-[40px] rounded-full"
                src={logo}
                alt="Картинка не прогрузилась"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = unknownAvatar;
                }}
              />
            </Link>
          </div>
          <div className="flex w-full items-center rounded-[2px] border-[1px] border-mooduck-gray p-3">
            <input
              {...bind}
              type="text"
              name="searchBooks"
              autoComplete="on"
              placeholder="Название книги"
              className="w-full placeholder-mooduck-gray"
            />
            <ReactSVG
              src={search}
              className="h-[16px] w-[16px] hover:cursor-pointer"
              onClick={() => {
                getBooksByText(value);
                {
                  booksIsSuccess && modal.handleOnClick(true);
                }
              }}
            />
            <ModalHeaderSearch
              visable={modal.visable}
              handleOnClick={modal.handleOnClick}
              value={value}
              bind={bind}
              getBooksByText={getBooksByText}
              books={books?.books}
              reset={reset}
              deleteBookFromFavorite={deleteBookFromFavorite}
              addBookToFavorite={addBookToFavorite}
              userFavoriteBooks={userData?.books}
              id={user?.id}
            />
          </div>
          <div className="h-[2px] w-full bg-mooduck-gray" />
        </header>
      ) : (
        <header
          id="header1"
          className="relative w-full flex-col gap-y-[30px] px-[42px] pt-[21px]"
        >
          <div className="mb-[30px] flex items-center justify-between">
            <Link to={"/booksPage"}>
              <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
            </Link>
            <div className="flex items-center gap-x-[23px]">
              <div className="flex items-center rounded-[2px] border-[1px] border-mooduck-gray p-3 lg:w-[325px] 2xl:w-[561px]">
                <input
                  {...bind}
                  onKeyDown={handleKeyPress}
                  type="text"
                  placeholder="Название книги"
                  className="w-full placeholder-mooduck-gray"
                />
                <ReactSVG
                  src={search}
                  className="h-[16px] w-[16px] hover:cursor-pointer"
                  onClick={() => {
                    getBooksByText(value);
                  }}
                />
              </div>
              <Link to={`/user/${user.id}`}>
                {/* <ReactSVG src={unknownAvatar} className="h-[40px] w-[40px] hover:cursor-pointer" /> */}
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={logo}
                  alt="Картинка не прогрузилась"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = unknownAvatar;
                  }}
                />
              </Link>
            </div>
            <div
              className={`absolute right-[102px] top-[90px] flex h-[318px] w-[563px] flex-col gap-y-5 overflow-auto bg-mooduck-white px-[18px] py-[10px] shadow-lg shadow-mooduck-black ${
                books && value ? "block" : "hidden"
              }`}
            >
              <p className="font-semibold uppercase">Результаты поиска</p>
              <div className="flex flex-col gap-y-3">
                {books?.books.map((book: IBook) => (
                  <div
                    key={book._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center justify-center gap-x-[13px]">
                      <Link to={`/book/${book._id}`} onClick={() => reset()}>
                        <img
                          className="h-[48px] w-[32px]"
                          src={book.img.smallFingernail}
                          alt="Картинка не прогрузилась"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = coverMiddle;
                          }}
                        />
                      </Link>
                      <div className="flex flex-col gap-y-[10px]">
                        <Link to={`/book/${book._id}`} onClick={() => reset()}>
                          <p className="text-ellipsis whitespace-wrap text-base text-mooduck-black">
                            {book.title}
                          </p>
                        </Link>
                        <Link to={`/book/${book._id}`} onClick={() => reset()}>
                          <p className="text-mooduck-gray">{book.authors}</p>
                        </Link>
                      </div>
                    </div>
                    <ReactSVG
                      src={bookMark}
                      onClick={() => {
                        checkExtendOfBook(userData?.books, book._id)
                          ? deleteBookFromFavorite({
                              userId: user?.id,
                              bookId: book._id,
                            })
                          : addBookToFavorite({
                              userId: user?.id,
                              bookId: book._id,
                            });
                      }}
                      className={`hover:cursor-pointer ${
                        checkExtendOfBook(userData?.books, book._id)
                          ? "fill-mooduck-blue hover:fill-mooduck-black"
                          : "fill-mooduck-black hover:fill-mooduck-blue"
                      } `}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full bg-mooduck-gray" />
        </header>
      )}
    </>
  );
};

export default Header;
