import { LogoAndNameOfCompany } from '@/components'
import { MyButton, RegistrationForm } from '@/components/UI'
import ModalRegistration from '@/components/UI/modal/ModalRegistration'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegistrationPageMobile = () => {
  const [visable, setVisable] = useState<boolean>(false)

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-[40px] bg-mooduck-blue lg:hidden xl:hidden 2xl:hidden">
      <LogoAndNameOfCompany className={'text-[40px] text-mooduck-white'} />
      <div className="h-[700px] w-full">
        <RegistrationForm />
      </div>
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
      <div className="h-[2px] w-[325px] bg-mooduck-white" />
      <ModalRegistration
        visable={visable}
        setVisable={setVisable}
      />
    </main>
  )
}

export default RegistrationPageMobile
