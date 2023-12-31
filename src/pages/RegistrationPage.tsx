import { LogoAndNameOfCompany } from '../components'
import { MyButton, RegistrationForm } from '../components/UI/'

import { Link } from 'react-router-dom'

const RegistrationPage = () => {
  const isMobile = window.innerWidth <= 1023

  return (
    <>
      {isMobile ? (
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-[40px] bg-mooduck-blue">
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
        </main>
      ) : (
        <main className="flex min-h-screen w-full items-center justify-center ">
          <aside className="flex h-full 2xl:w-1/3 xl:w-1/3 w-5/12 flex-col justify-between bg-mooduck-blue p-20">
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
      )}
    </>
  )
}

export default RegistrationPage
