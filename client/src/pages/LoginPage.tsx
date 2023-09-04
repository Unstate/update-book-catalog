import LogoAndNameOfCompany from '@/components/LogoAndNameOfCompany'
import { MyButton, SignupForm } from '@/components/UI'
import { Link } from 'react-router-dom'
import LoginPageMobile from './LoginPageMobile'

const LoginPage = () => {
  return (
    <>
      <main className="hidden min-h-screen w-full items-center justify-center lg:flex xl:flex 2xl:flex">
        <aside className="flex h-full w-1/3 flex-col justify-between bg-mooduck-blue p-20">
          <LogoAndNameOfCompany className={'text-mooduck-green'} />
          <div className="flex flex-col items-center justify-center gap-9">
            <p className="text-center text-2xl font-bold uppercase text-mooduck-white">
              еще нет аккаунта?
            </p>
            <Link to={'/registration'}>
              <MyButton className="w-[253px] border-mooduck-white bg-mooduck-white py-4 text-mooduck-blue">
                зарегестрироваться
              </MyButton>
            </Link>
          </div>
          <div className="h-[2px] w-full bg-mooduck-white" />
        </aside>
        <SignupForm />
      </main>
      <LoginPageMobile />
    </>
  )
}

export default LoginPage
