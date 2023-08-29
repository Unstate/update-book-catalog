import React from 'react'
import LogoAndNameOfCompany from './LogoAndNameOfCompany'
import { unknownAvatar, search } from '@/assets'
import { ReactSVG } from 'react-svg'

const Header = () => {
  return (
    <header className=" flex w-full flex-col gap-y-[30px] px-[42px] pt-[21px]">
      <div className="flex items-center justify-between">
        <LogoAndNameOfCompany className="text-mooduck-black hover:cursor-pointer" />
        <div className="flex items-center gap-x-[23px]">
          <div className="flex w-[561px] items-center rounded-[2px] border-[1px] border-mooduck-gray p-3">
            <input
              type="text"
              placeholder="Название книги"
              className="w-full placeholder-mooduck-gray"
            />
            <ReactSVG src={search} className="h-[16px] w-[16px] hover:cursor-pointer" />
          </div>
          <img src={unknownAvatar} className="h-[40px] w-[40px] hover:cursor-pointer" />
        </div>
      </div>
      <div className="h-[2px] w-full bg-mooduck-gray" />
    </header>
  )
}

export default Header
