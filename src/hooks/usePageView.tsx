//////////////////////////////
// GAの計測
//////////////////////////////

// ref : https://wp-kyoto.net/nextjs-add-ga4-tracking-code-manually/

import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { GA_ID } from '@/const'

export function usePageView() {
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url: string) => {
      gtag('config', GA_ID, {
        page_location: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    router.events.on('hashChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
      router.events.off('hashChangeComplete', handleRouterChange)
    }
  }, [router.events])
}
