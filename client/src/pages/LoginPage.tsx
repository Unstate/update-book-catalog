import React from 'react'

import SignupForm from '@/components/UI/SignupForm'

const LoginPage = () => {
  return (
    <main className='flex items-center justify-center min-h-screen w-full'>
      <aside className='bg-mooduck-blue w-1/3 h-full'></aside>
      <SignupForm />
    </main>
  )
}

export default LoginPage
