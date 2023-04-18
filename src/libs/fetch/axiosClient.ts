// Axios
// url: https://github.com/axios/axios#request-config

import axios, { AxiosRequestConfig, isAxiosError } from 'axios'

import { baseURL } from '@/const'

////////////////////////////////////////////
// common
////////////////////////////////////////////

const instance = axios.create({
  baseURL,
  timeout: 10000,
})

////////////////////////////////////////////
// GET
////////////////////////////////////////////

export const apiGet = <T>({
  url,
  config,
}: {
  url: string
  config?: Omit<AxiosRequestConfig, 'method'>
}) => {
  return instance
    .get<T>(url, config)
    .then(function (response) {
      const { status, data } = response
      return {
        status,
        data,
        error: null,
      }
    })
    .catch(function (error) {
      if (isAxiosError(error)) {
        const { response } = error
        return {
          status: response?.status ?? null,
          data: null,
          error: response?.statusText ?? 'unknown_error',
        }
      }
      return {
        status: null,
        data: null,
        error: 'unknown_error',
      }
    })
}

////////////////////////////////////////////
// POST
////////////////////////////////////////////

export const apiPost = async <T, D = undefined>({
  url,
  data,
  config,
}: {
  url: string
  data?: D
  config?: Omit<AxiosRequestConfig, 'method'>
}) => {
  return instance
    .post<T>(url, data, config)
    .then(function (response) {
      const { status, data: responseData } = response
      return {
        status,
        data: responseData,
        error: null,
      }
    })
    .catch(function (error) {
      if (isAxiosError(error)) {
        const { response } = error
        return {
          status: response?.status ?? null,
          data: null,
          error: response?.statusText ?? 'unknown_error',
        }
      }
      return {
        status: null,
        data: null,
        error: 'unknown_error',
      }
    })
}
