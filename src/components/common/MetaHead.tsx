import Head from 'next/head'

import { baseURL, commonImageURL } from '@/const'

type Props = {
  title: string
  description: string
  url: string
  imageUrl?: string
}

export const MetaHead: React.FC<Props> = ({ title, description, url, imageUrl }) => {
  const image = imageUrl ? imageUrl : commonImageURL
  const fullPathURL = baseURL + url

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={url ? 'article' : 'website'} />
      <meta property='og:url' content={fullPathURL} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={fullPathURL} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />
    </Head>
  )
}
