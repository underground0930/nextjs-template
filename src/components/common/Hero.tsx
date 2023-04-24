import React from 'react'

import { ImageWrap } from './ImageWrap'

type Props = {
  imgSrc: string
  title?: string
}

export const Hero: React.FC<Props> = ({ imgSrc, title }) => {
  return (
    <div className='relative mb-10 flex aspect-[10/3] flex-col justify-center overflow-hidden'>
      <h1 className='relative z-[1] pl-5 text-2xl font-bold md:pl-8 md:text-5xl'>
        {title}
      </h1>
      <ImageWrap url={imgSrc} fill />
    </div>
  )
}
