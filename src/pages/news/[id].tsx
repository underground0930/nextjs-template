import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'

import { MetaHead, ImageWrap, Wrapper, Button } from '@/components/common'

import { fetchNewsList, fetchNewsDetail, getTime } from '@/libs'
import { baseURL, maxLimit } from '@/const'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Page({ news, id, prev, next }: PageProps) {
  if (!news) {
    return <></>
  }

  const { title, thumbnail, content, publishedAt, category, description } = news
  const date = getTime(publishedAt, 'YYYY-MM-DD')

  return (
    <>
      <MetaHead
        {...{
          title: `${title} | News`,
          description: `${description}`,
          url: `/news/${id}`,
          imageUrl: thumbnail?.url ? thumbnail.url : `${baseURL}/api/og?title=News`,
        }}
      />
      <Wrapper>
        <article>
          <div className=''>
            <div className='relative mb-3'>
              {thumbnail && <ImageWrap {...thumbnail} cls='w-full' />}
            </div>
            <div className=' mb-10  border-b-2 border-white pb-10 pt-6'>
              <h1 className='mb-10 text-3xl font-bold'>{title}</h1>
              <div className='mb-2'>
                {category && (
                  <div className='inline-block rounded-full border-2 border-white px-4 py-1'>
                    {category.name}
                  </div>
                )}
              </div>
              <div className='mb-4 flex justify-end'>
                <time className='block text-xl'>{date}</time>
              </div>
              <div
                className='cms-content'
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            <div className='flex justify-between'>
              {prev ? (
                <Link
                  href={`/news/${prev.id}`}
                  className='ml-0 block border border-white bg-black px-3 py-2 text-white hover:bg-white hover:text-black'
                >
                  &#60;
                </Link>
              ) : (
                <div className='w-1'></div>
              )}
              {next ? (
                <Link
                  href={`/news/${next.id}`}
                  className='ml-0 block border border-white bg-black px-3 py-2 text-white hover:bg-white hover:text-black'
                >
                  &#62;
                </Link>
              ) : (
                <div className='w-1'></div>
              )}
            </div>
            <div className='flex justify-center'>
              <Button href='/news' text='Back to Index' />
            </div>
          </div>
        </article>
      </Wrapper>
    </>
  )
}

export async function getStaticPaths() {
  const result = await fetchNewsList({
    fields: ['id'],
    limit: maxLimit,
  })

  const paths = result?.contents?.map?.((val) => ({ params: { id: val.id } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const result = await Promise.allSettled([
    fetchNewsDetail({ id: params.id }),
    fetchNewsList({
      fields: ['id', 'title'],
      limit: maxLimit,
    }),
  ]).then((values) => {
    return {
      detail: values[0].status === 'fulfilled' ? values[0].value : null,
      allList: values[1].status === 'fulfilled' ? values[1].value?.contents : null,
    }
  })

  const index = result.allList?.findIndex((v) => v.id === params.id) as number
  const prev = result.allList?.[index - 1]
  const next = result.allList?.[index + 1]

  return {
    props: {
      news: result.detail,
      prev: prev ?? null,
      next: next ?? null,
      id: params.id,
    },
  }
}
