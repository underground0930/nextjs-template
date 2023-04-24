import React from 'react'

export const LoadingSpinner: React.FC = () => {
  return (
    <>
      <div className='h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent' />
    </>
  )
}
