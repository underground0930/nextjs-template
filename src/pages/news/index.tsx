import { InferGetStaticPropsType } from 'next'

import { MetaHead } from '@/components/common'
import { Content } from '@/components/pages/news'

import { microcmsGetList } from '@/libs'
import { baseURL, limit } from '@/const'
import { NewsListData } from '@/types'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Page({ news, page, limit }: PageProps) {
  return (
    <>
      <MetaHead
        {...{
          title: 'News',
          description: 'お知らせ一覧のページになります',
          url: '/news',
          imageUrl: `${baseURL}/api/og?title=News`,
        }}
      />
      <Content news={news} page={page} limit={limit} />
    </>
  )
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const result = await microcmsGetList<NewsListData>({
    endpoint: 'news',
    queries: {
      limit,
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
