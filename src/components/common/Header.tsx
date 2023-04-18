import Link from 'next/link'
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

const navLinks = [
  {
    link: '/',
    label: 'Top',
  },
  {
    link: '/about',
    label: 'About',
  },
  {
    link: '/news',
    label: 'News',
  },
  {
    link: '/contact',
    label: 'Contact',
  },
]

export const Header: React.FC = () => {
  const router = useRouter()

  const setLink = useCallback(
    (path: string) => {
      return router.pathname === path ? 'underline' : 'no-underline'
    },
    [router],
  )

  return (
    <>
      <header className='py-10'>
        <nav>
          <ul className='flex'>
            {navLinks.map((nav, index) => {
              return (
                <li className='mr-5' key={index}>
                  <Link href={nav.link} className={setLink(nav.link)}>
                    {nav.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    </>
  )
}
