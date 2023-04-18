import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { baseURL } from '@/const'

export const config = {
  runtime: 'edge',
}

export default function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title')

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: '#000',
          }}
        ></div>
        <div
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          {baseURL}
        </div>
        <div>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
