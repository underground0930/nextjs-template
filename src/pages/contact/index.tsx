import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRecaptchaV2 } from 'react-hook-recaptcha-v2'

import { Hero, LoadingSpinner, MetaHead, Wrapper, InputText } from '@/components'
import { baseURL, errorText, inputElements, sitekey } from '@/const'
import { apiPost } from '@/libs'
import { FormBodyDataSchema, PostFormBodyData, ResultType } from '@/types'

type ErrorType = { [key: string]: string }

type FormDataType = {
  username: string
  company?: string
  email: string
  detail: string
} & FieldValues

// contactのデバッグ用
const debug = false

export default function Page() {
  const [token, setToken] = useState<string | null>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [serverInvalidErrors, setServerInvalidErrors] = useState<ErrorType>({})
  const { recaptchaRef } = useRecaptchaV2({
    sitekey,
    callback: (token) => setToken(token),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: debug ? undefined : zodResolver(FormBodyDataSchema),
  })

  useEffect(() => {
    const { current } = parentRef
    if (!current) return
    loading ? current.setAttribute('inert', '') : current.removeAttribute('inert')
  }, [loading])

  const frontInvalidErrors = useMemo(() => {
    const newErrors: ErrorType = {}
    for (const key in errors) {
      newErrors[key] = errors[key]?.message as string
    }
    return newErrors
  }, [errors])

  const getError = useCallback(
    (key: string): string | undefined =>
      frontInvalidErrors[key] || serverInvalidErrors[key],
    [frontInvalidErrors, serverInvalidErrors],
  )

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    if (!token) return
    setLoading(true)
    setError('')

    parentRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    return await apiPost<ResultType, PostFormBodyData>({
      url: '/api/contact',
      data: {
        ...data,
        debug,
        token,
      },
      config: {
        headers: { 'Content-type': 'application/json' },
      },
    })
      .then((response) => {
        const { data: responseData, error: err } = response
        if (!responseData) {
          throw new Error(err)
        }
        const { success, error } = responseData
        if (success) {
          location.href = '/contact/thanks'
          return
        }
        const { type, data } = error
        if (type === 'invalid') {
          const err: ErrorType = {}
          for (let i = 0; i < data.length; i++) {
            err[data[i].path[0]] = data[i].message
          }
          setServerInvalidErrors(err)
          return
        }
        setError(errorText[type])
      })
      .catch(() => setError(errorText['server']))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <MetaHead
        {...{
          title: 'Contact',
          description: 'お問い合わせはこちらからお願いします',
          url: '/contact',
          imageUrl: `${baseURL}/api/og?title=Contact`,
        }}
      />
      <Wrapper>
        {/* hero */}
        <Hero title='Contact' imgSrc='/images/hero/contact.jpg' />
        {/* form */}
        {loading && (
          <div className='fixed inset-0 z-[10] m-auto flex items-center justify-center bg-black bg-opacity-50'>
            <LoadingSpinner />
          </div>
        )}
        <div className=''>
          <div className='pt-5 md:mx-auto' ref={parentRef}>
            {error && <div className='pb-10 text-lg font-bold text-red-500'>{error}</div>}
            <div className='mb-10'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ul className='mb-10'>
                  {inputElements.map((elem, index) => {
                    const { name, textarea, row, label } = elem
                    return (
                      <li key={index} className='mb-6'>
                        <InputText
                          name={name}
                          textarea={textarea}
                          label={label}
                          {...(row ? { row } : {})}
                          register={register}
                          getError={getError}
                        />
                      </li>
                    )
                  })}
                </ul>
                <div className='flex items-center justify-center pb-10'>
                  <div ref={recaptchaRef} />
                </div>
                <div className='flex items-center justify-center pb-10'>
                  <button
                    className={`cursor-pointer border-2 border-white bg-black px-10 py-3 font-bold text-white transition-colors duration-200 ${
                      token
                        ? 'cursor-pointer hover:bg-white hover:text-black'
                        : 'cursor-default disabled:opacity-30'
                    }`}
                    type='submit'
                    disabled={!token}
                  >
                    送信
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
