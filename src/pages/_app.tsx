import '@/styles/globals.css'

import Script from 'next/script'

import { GA_ID } from '@/const'
import { usePageView } from '@/hooks'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()
  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script strategy='afterInteractive' id='gtag-init'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
