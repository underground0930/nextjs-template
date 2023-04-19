import { useMemo } from 'react'
import { MicroCMSListResponse } from 'microcms-js-sdk'

import { Button, Wrapper, Pager, Hero } from '@/components/common'
import { List } from '@/components/pages/news'

import { NewsListData } from '@/types'

type Props = {
  news: MicroCMSListResponse<NewsListData> | null
  page: number
  limit: number
}

export const Content: React.FC<Props> = ({ news, page, limit }) => {
  const totalPages = useMemo(() => {
    if (!news) return false
    if (news.totalCount === 0) return 1
    return Math.ceil(news.totalCount / limit)
  }, [news, limit])

  return (
    <Wrapper>
      {/* hero */}
      <Hero title='News' imgSrc='/images/hero/news.jpg' />
      {news && totalPages && (
        <>
          {/* news list */}
          <List news={news.contents} />
          {/* pager */}
          <div className='mb-14'>
            <Pager
              range={2}
              currentPage={page}
              totalPages={totalPages}
              setPath={(count) => (count !== 1 ? `/news/page/${count}` : '/news')}
            />
          </div>
        </>
      )}
      <div className='flex justify-center'>
        <Button href='/' text='Back to Top' />
      </div>
    </Wrapper>
  )
}
