import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  name: string
  label: string
  textarea?: boolean
  row?: number
  getError: (name: string) => string | undefined
  register: UseFormRegister<FieldValues>
}

export const InputText: React.FC<Props> = ({
  name,
  label,
  textarea = false,
  row,
  getError,
  register,
}) => {
  const error = getError(name)
  return (
    <>
      <label className='border-l-5 mb-3 block text-xl font-bold' htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          className='border-1 border-border block w-full resize-none p-2 text-xl text-black'
          id={name}
          rows={row ?? 10}
          {...register(name)}
        />
      ) : (
        <input
          type='text'
          className='border-1 border-border block w-full p-2 text-xl text-black'
          id={name}
          {...register(name)}
        />
      )}

      {error && <div className='pt-2 text-lg font-bold text-red-500'>{error}</div>}
    </>
  )
}
