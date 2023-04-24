import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
  url: string
  alt?: string
  fill?: boolean
  width?: number | `${number}`
  height?: number | `${number}`
  sizes?: string
  cls?: string
}

export const ImageWrap: React.FC<Props> = ({
  url,
  alt = '',
  fill = false,
  width,
  height,
  sizes = '',
  cls,
}) => {
  const [hide, setHide] = useState(false)

  return (
    <>
      {!hide && (
        <Image
          alt={alt}
          src={url}
          width={width}
          height={height}
          fill={fill}
          sizes={sizes}
          className={cls}
          onError={() => setHide(true)}
        />
      )}
    </>
  )
}
