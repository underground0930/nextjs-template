// microCMS JavaScript SDK
// url: https://github.com/microcmsio/microcms-js-sdk

import {
  createClient,
  GetListDetailRequest,
  GetListRequest,
  MicroCMSQueries,
} from 'microcms-js-sdk'

import { NewsData } from '@/types/index'

////////////////////////////////////////////
// common
////////////////////////////////////////////

const microcmsClient = () =>
  createClient({
    serviceDomain: 'nextjs-website-template',
    apiKey: process.env.MICROCMS_API_KEY ?? '',
  })

const microcmsGetList = <T>({ endpoint, queries }: GetListRequest) => {
  const client = microcmsClient()

  return client
    .getList<T>({ endpoint, queries })
    .then((response) => {
      return {
        data: response,
        error: false,
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        data: null,
        error: true,
      }
    })
}

const microcmsGetDetail = <T>({ endpoint, contentId, queries }: GetListDetailRequest) => {
  const client = microcmsClient()

  return client
    .getListDetail<T>({ endpoint, contentId, queries })
    .then((response) => {
      return {
        data: response,
        error: false,
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        data: null,
        error: true,
      }
    })
}

////////////////////////////////////////////
// news list
////////////////////////////////////////////

export const fetchNewsList = async (queries?: MicroCMSQueries) => {
  const result = await microcmsGetList<NewsData>({
    endpoint: 'news',
    queries,
  })

  if (result.error) return null
  return result.data
}

////////////////////////////////////////////
// news detail
////////////////////////////////////////////

export const fetchNewsDetail = async ({ id }: { id: string }) => {
  const result = await microcmsGetDetail<NewsData>({
    endpoint: 'news',
    contentId: id,
  })
  if (result.error) return null
  return result.data
}
