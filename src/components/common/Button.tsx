import Link from 'next/link'
import React from 'react'

export type Props = {
  text: string
  href: string
}

export const Button: React.FC<Props> = ({ text, href }) => {
  return (
    <>
      <Link
        href={href}
        className='cursor-pointer border-2 border-white bg-black px-12 py-3 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8'
      >
        {text}
      </Link>
    </>
  )
}
