//////////////////////////////
// GAの計測
//////////////////////////////

import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function usePageView() {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => window.gtag.pageview(url)
    router.events.on('routeChangeComplete', handleRouteChange)
  }, [router.events])
}
