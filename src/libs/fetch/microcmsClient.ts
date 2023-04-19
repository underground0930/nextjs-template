// microCMS JavaScript SDK
// url: https://github.com/microcmsio/microcms-js-sdk

import { createClient, GetListDetailRequest, GetListRequest } from 'microcms-js-sdk'

////////////////////////////////////////////
// common
////////////////////////////////////////////

const microcmsClient = () =>
  createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
    apiKey: process.env.MICROCMS_API_KEY!,
  })

export const microcmsGetList = <T>({ endpoint, queries }: GetListRequest) => {
  const client = microcmsClient()

  return client
    .getList<T>({ endpoint, queries })
    .then((response) => {
      return {
        data: response,
        error: null,
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        data: null,
        error,
      }
    })
}

export const microcmsGetDetail = <T>({
  endpoint,
  contentId,
  queries,
}: GetListDetailRequest) => {
  const client = microcmsClient()

  return client
    .getListDetail<T>({ endpoint, contentId, queries })
    .then((response) => {
      return {
        data: response,
        error: null,
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        data: null,
        error,
      }
    })
}
