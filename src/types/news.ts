import { MicroCMSDate } from 'microcms-js-sdk'

// news詳細の記事データ
export type NewsData = {
  id: string
  title: string
  content: string
  description: string
  thumbnail?: {
    url: string
    height: number
    width: number
  }
  category: {
    id: string
    name: string
  }
} & MicroCMSDate

// news詳細のpagerで使うデータ
export type NewsPagerData = Pick<NewsData, 'id' | 'title'>

// news一覧で使うデータ
export type NewsListData = Omit<NewsData, 'content'>

// getStaticPathで使うデータ
export type NewsIdData = Pick<NewsData, 'id'>
