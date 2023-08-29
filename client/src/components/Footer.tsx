import React from 'react'
import LogoAndNameOfCompany from './LogoAndNameOfCompany'

const Footer = () => {
  return (
    <footer className="flex w-full flex-col gap-y-3 pt-[100px]">
      <div className="flex w-full items-center justify-between bg-mooduck-blue py-[30px] px-[42px]">
        <div className='h-full w-[1px] bg-mooduck-white'/>
        <LogoAndNameOfCompany className='text-mooduck-white'/>
        <div className='h-full w-[1px] bg-mooduck-white'/>
      </div>
      <p className="text-center text-mooduck-black">
        © Mooduck 2023. All rights reserved
      </p>
    </footer>
  )
}

export default Footer
