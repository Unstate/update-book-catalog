import LogoAndNameOfCompany from '@/components/LogoAndNameOfCompany'
import { MyButton, RegistrationForm } from '@/components/UI/'
import { Link } from 'react-router-dom'
import RegistrationPageMobile from './RegistrationPageMobile'
import ModalRegistration from '@/components/UI/modal/ModalRegistration'
import { useState } from 'react'

const RegistrationPage = () => {
  const [visable, setVisable] = useState<boolean>(false)
  return (
    <>
      <main className="hidden min-h-screen w-full items-center justify-center lg:flex xl:flex 2xl:flex">
        <aside className="flex h-full w-1/3 flex-col justify-between bg-mooduck-blue p-20">
          <LogoAndNameOfCompany className={'text-mooduck-green'} />
          <div className="flex flex-col items-center justify-center gap-9">
            <p className="text-center text-2xl font-bold uppercase text-mooduck-white">
              уже есть аккаунт?
            </p>
            <Link to={'/'}>
            <MyButton className="w-[253px] border-mooduck-white bg-mooduck-white py-4 text-mooduck-blue">
              Войти
            </MyButton>
          </Link>
          </div>
          <div className="h-[2px] w-full bg-mooduck-white" />
        </aside>
        <RegistrationForm />
      </main>
      <RegistrationPageMobile />
      
    </>
  )
}

export default RegistrationPage
