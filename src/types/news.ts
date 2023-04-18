import { MicroCMSDate } from 'microcms-js-sdk'

// newsの記事データ
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
