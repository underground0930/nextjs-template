import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import { Button, ImageWrap, MetaHead, Wrapper } from '@/components/common'

import { baseURL, maxLimit } from '@/const'
import { getTime, microcmsGetDetail, microcmsGetList } from '@/libs'
import { NewsData, NewsPagerData } from '@/types'
import { onlyString } from '@/utils'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Page({ news, id, prev, next }: PageProps) {
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
  const result = await microcmsGetList<{ id: string }>({
    endpoint: 'news',
    queries: {
      fields: ['id'],
      limit: maxLimit,
    },
  })

  const paths = result.data?.contents.map((val) => ({ params: { id: val.id } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
  preview = false,
  previewData,
}: {
  params: { id?: string | string[]; slug?: string }
  preview?: boolean
  previewData: {
    draftKey?: string
  }
}) => {
  const id = onlyString(params?.id)
  const result = await Promise.allSettled([
    microcmsGetDetail<NewsData>({
      endpoint: 'news',
      contentId: id,
      queries: {
        draftKey: preview ? previewData?.draftKey : undefined,
      },
    }),
    microcmsGetList<NewsPagerData>({
      endpoint: 'news',
      queries: {
        fields: ['id', 'title'],
        limit: maxLimit,
      },
    }),
  ]).then((values) => {
    return {
      detail: values[0].status === 'fulfilled' ? values[0].value.data : null,
      allList: values[1].status === 'fulfilled' ? values[1].value.data?.contents : null,
    }
  })

  const index = result.allList?.findIndex((v) => v.id === id)

  if (!result.detail || index === undefined) {
    return {
      notFound: true,
    }
  }

  const prev = result.allList?.[index - 1]
  const next = result.allList?.[index + 1]

  return {
    props: {
      news: result.detail,
      prev: prev ?? null,
      next: next ?? null,
      id,
    },
  }
}
