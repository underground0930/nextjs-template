import { NextApiRequest, NextApiResponse } from 'next'

import { microcmsGetDetail } from '@/libs'
import { NewsIdData } from '@/types'
import { onlyString } from '@/utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.slug || !req.query.draftKey) {
    return res.status(404).end()
  }

  const id = onlyString(req.query.slug)
  const draftKey = onlyString(req.query.draftKey)

  const content = await microcmsGetDetail<NewsIdData>({
    endpoint: 'news',
    contentId: id,
    queries: {
      draftKey,
    },
  })
    .then((response) => {
      if (response.data) {
        return response.data
      }
      throw new Error('response error')
    })
    .catch((error) => {
      console.error(error)
      return null
    })

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  })
  res.writeHead(307, { Location: `/news/${content.id}` })
  res.end('Preview mode enabled')
}
