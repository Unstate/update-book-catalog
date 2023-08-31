import React from 'react'
import LogoAndNameOfCompany from './LogoAndNameOfCompany'
import { unknownAvatar, search } from '@/assets'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header
        id="header1"
        className="hidden w-full flex-col gap-y-[30px] px-[42px] pt-[21px] lg:flex xl:flex 2xl:flex "
      >
        <div className="flex items-center justify-between">
          <Link to={'/booksPage'}>
            <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
          </Link>
          <div className="flex items-center gap-x-[23px]">
            <div className="flex items-center rounded-[2px] border-[1px] border-mooduck-gray p-3 lg:w-[325px] xl:w-[561px] 2xl:w-[561px]">
              <input
                type="text"
                placeholder="Название книги"
                className="w-full placeholder-mooduck-gray"
              />
              <ReactSVG
                src={search}
                className="h-[16px] w-[16px] hover:cursor-pointer"
              />
            </div>
            <Link to={'/'}>
              <img
                src={unknownAvatar}
                className="h-[40px] w-[40px] hover:cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="h-[2px] w-full bg-mooduck-gray" />
      </header>
      {/* HEADER FOR LG AND SMALL */}
      <header
        id="header1"
        className="flex w-full flex-col gap-y-[30px] px-[42px] pt-[21px] lg:hidden xl:hidden 2xl:hidden "
      >
        <div className=" flex items-center justify-between">
          <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
          <Link to={'/'}>
            <img
              src={unknownAvatar}
              className="h-[40px] w-[40px] hover:cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex items-center rounded-[2px] border-[1px] border-mooduck-gray p-3 lg:w-[325px] xl:w-[561px] 2xl:w-[561px]">
          <input
            type="text"
            name="searchBooks"
            autoComplete="on"
            placeholder="Название книги"
            className="w-full placeholder-mooduck-gray"
          />
          <ReactSVG
            src={search}
            className="h-[16px] w-[16px] hover:cursor-pointer"
          />
        </div>
        <div className="h-[2px] w-full bg-mooduck-gray" />
      </header>
    </>
  )
}

export default Header
