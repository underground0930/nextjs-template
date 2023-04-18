import { InferGetStaticPropsType } from 'next'

import { MetaHead } from '@/components/common'
import { Content } from '@/components/pages/news'

import { fetchNewsList } from '@/libs'
import { baseURL, limit } from '@/const'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const meta = {
  title: 'News',
  description: 'お知らせ一覧のページになります',
  url: '/news',
  imageUrl: `${baseURL}/api/og?title=News`,
}

export default function Page({ news, page, limit }: PageProps) {
  return (
    <>
      <MetaHead {...meta} />
      <Content news={news} page={page} limit={limit} />
    </>
  )
}

export async function getStaticProps() {
  const result = await fetchNewsList({ limit })
  return {
    props: {
      news: result,
      limit,
      page: 1,
    },
  }
}
