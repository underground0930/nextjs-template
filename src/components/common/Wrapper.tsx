import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: React.ReactNode
}

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className='mx-auto max-w-4xl'>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
