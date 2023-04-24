import { InferGetStaticPropsType } from 'next'

import { microcmsGetList } from '@/libs/index'

import { MetaHead } from '@/components/common'
import { Content } from '@/components/pages/news/Content'

import { baseURL, limit } from '@/const'
import { NewsIdData, NewsListData } from '@/types'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Page({ news, page, limit }: PageProps) {
  return (
    <>
      <MetaHead
        {...{
          title: `News | ${page} page`,
          description: 'お知らせ一覧のページになります',
          url: '/news',
          imageUrl: `${baseURL}/api/og?title=News`,
        }}
      />
      <Content news={news} page={page} limit={limit} />
    </>
  )
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const result = await microcmsGetList<NewsIdData[]>({
    endpoint: 'news',
    queries: {
      fields: ['id'],
    },
  })

  let paths: string[] = []

  if (result.data) {
    const range = (start: number, end: number): number[] =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i)
    paths = range(1, Math.ceil(result.data.totalCount / limit)).map(
      (page) => `/news/page/${page}`,
    )
  }

  return { paths, fallback: true }
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const result = await microcmsGetList<NewsListData>({
    endpoint: 'news',
    queries: {
      limit,
      offset: (Number(params.page) - 1) * limit,
    },
  })

  if (!result.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      news: result.data,
      limit,
      page: params?.page ? Number(params.page) : 1,
    },
  }
}
