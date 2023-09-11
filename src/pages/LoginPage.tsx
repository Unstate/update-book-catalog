import { LogoAndNameOfCompany } from '../components'
import { MyButton, SignupForm } from '../components/UI'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const isMobile = window.innerWidth <= 1023
  return (
    <>
      {isMobile ? (
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-[40px] bg-mooduck-blue">
          <LogoAndNameOfCompany className={'text-[40px] text-mooduck-white'} />
          <div className="h-[572px] w-full">
            <SignupForm />
          </div>
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
          <div className="h-[2px] w-[325px] bg-mooduck-white" />
        </main>
      ) : (
        <main className="flex min-h-screen w-full items-center justify-center">
          <aside className="flex h-full w-5/12 flex-col justify-between bg-mooduck-blue p-20 2xl:w-1/3">
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
      )}
    </>
  )
}

export default LoginPage
