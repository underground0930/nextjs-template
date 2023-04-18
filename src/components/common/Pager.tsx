import React, { useEffect, useState } from 'react'

import { PagerChild } from '@/components/common/PagerChild'

type Props = {
  totalPages: number
  currentPage: number
  range: number
  setPath: (page: number) => string
}

type Page =
  | { type: 'count' | 'current' | 'prev' | 'next'; count: number }
  | { type: 'dot'; count: null }

export const Pager: React.FC<Props> = ({ totalPages, currentPage, range, setPath }) => {
  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    const p = [] as Page[]
    const rangeVal = range * 2 + 1

    // prev
    if (currentPage !== 1) {
      p.push({ type: 'prev', count: 1 })
    }

    if (totalPages <= rangeVal) {
      // totalがrangeより小さい場合
      for (let i = 1; i <= totalPages; i++) {
        p.push({ type: i === currentPage ? 'current' : 'count', count: i })
      }
    } else if (currentPage - range <= 2) {
      for (let i = 1; i <= rangeVal; i++) {
        // 現在の位置でrangeの最小値が１より小さい
        p.push({ type: i === currentPage ? 'current' : 'count', count: i })
      }
      p.push({ type: 'dot', count: null }, { type: 'count', count: totalPages })
    } else if (currentPage >= totalPages - range - 1) {
      // 現在の位置でrangeの最大値がtotalPagesより大きい
      p.push({ type: 'count', count: 1 }, { type: 'dot', count: null })
      for (let i = totalPages - rangeVal; i <= totalPages; i++) {
        p.push({ type: i === currentPage ? 'current' : 'count', count: i })
      }
    } else {
      // 現在値がrangeの範囲内にいる
      p.push({ type: 'count', count: 1 }, { type: 'dot', count: null })
      for (let i = currentPage - range; i <= currentPage + 2; i++) {
        p.push({ type: i === currentPage ? 'current' : 'count', count: i })
      }
      p.push({ type: 'dot', count: null }, { type: 'count', count: totalPages })
    }

    // next
    if (currentPage !== totalPages && totalPages !== 1) {
      p.push({ type: 'next', count: currentPage + 1 })
    }

    setPages(p)
  }, [totalPages, currentPage, range])

  return (
    <>
      <nav className='flex justify-center'>
        <ul className='flex'>
          {pages.map((page, index) => {
            const { type, count } = page
            if (type === 'dot') {
              return <PagerChild key={index}>...</PagerChild>
            } else {
              return (
                <PagerChild key={index} href={setPath(count)} active={type === 'current'}>
                  {type === 'prev' ? (
                    <>&#60;</>
                  ) : type === 'next' ? (
                    <>&#62;</>
                  ) : (
                    <>{count}</>
                  )}
                </PagerChild>
              )
            }
          })}
        </ul>
      </nav>
    </>
  )
}
