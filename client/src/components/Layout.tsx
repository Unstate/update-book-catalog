import React, { FC, ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactNode | React.ReactElement
}

const Layout:FC<LayoutProps> = ({children}) => {
  return (
    <>
        <Header />
            {children}
        <Footer />
    </>
  )
}

export default Layout