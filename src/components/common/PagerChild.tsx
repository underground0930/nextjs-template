import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
  active?: boolean
  href?: string
}

const styles = {
  normal:
    'block ml-0 border-y border-r border-white bg-black px-3 py-2 text-white hover:text-black hover:bg-white',
  active: 'block px-3 py-2 border-y border-r border-white bg-white text-black',
  unlink: 'block ml-0 border-y border-r border-white bg-black px-3 py-2 text-white',
}

export const PagerChild: React.FC<Props> = ({ children, active = false, href }) => {
  return (
    <>
      <li className='[&>a]:first-of-type:border-l'>
        {href ? (
          <Link className={active ? styles.active : styles.normal} href={`${href}`}>
            {children}
          </Link>
        ) : (
          <a className={styles.unlink}>{children}</a>
        )}
      </li>
    </>
  )
}
