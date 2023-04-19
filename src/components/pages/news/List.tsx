import React from 'react'

import { ImageWrap } from '@/components/common'

import { getTime } from '@/libs'
import { NewsListData } from '@/types'

type Props = {
  news: NewsListData[]
}

const newDefaultImage = 'https://placehold.jp/70/cccccc/ffffff/600x400.png?text=No Image'

export const List: React.FC<Props> = ({ news }) => {
  return (
    <>
      <div className='md:flex md:flex-wrap md:justify-between md:after:w-[30%]'>
        {news.map((child) => {
          const { id, title, description, thumbnail, publishedAt, category } = child
          const date = getTime(publishedAt, 'YYYY-MM-DD')
          return (
            <article key={id} className='mb-10 md:w-[30%]'>
              <a href={`/news/${id}`}>
                <ImageWrap
                  cls='relative mb-5 aspect-[3/2]'
                  url={thumbnail?.url ? thumbnail.url : newDefaultImage}
                  width={600}
                  height={400}
                />
                <div className='mb-2'>
                  {category && (
                    <div className='inline-block rounded-full border-2 border-white px-4 py-1 text-xs'>
                      {category.name}
                    </div>
                  )}
                </div>
                <div className='mb-4 flex justify-end'>
                  <time className='text-md block'>{date}</time>
                </div>
                <h3 className='mb-3 line-clamp-2 text-base font-bold'>{title}</h3>
                <div
                  className='mb-4 line-clamp-3 text-sm'
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </a>
            </article>
          )
        })}
      </div>
    </>
  )
}
