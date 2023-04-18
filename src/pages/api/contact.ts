import { NextApiRequest, NextApiResponse } from 'next'

import { verifyRecaptcha } from '@/libs/form/verifyRecaptcha'
import { sendMail } from '@/libs/form/sendMail'

import { FormBodyDataSchema, PostFormBodyData } from '@/types/contact'

interface ExtendNextApiRequest extends NextApiRequest {
  body: PostFormBodyData
}

export default async function handler(req: ExtendNextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res
      .status(405)
      .json({ message: `Method ${req.method} is not allowed. Please use POST instead.` })
  }

  const { username, email, company, detail, token, debug } = req.body

  // フォームの入力値のバリデート ////////////////////////////////////
  const validateResult = FormBodyDataSchema.safeParse({
    username: username ?? '',
    email: email ?? '',
    company: company ?? '',
    detail: detail ?? '',
  })

  if (!validateResult.success) {
    return res.json({
      success: false,
      error: {
        type: 'invalid',
        data: validateResult.error.issues,
      },
    })
  }

  // recapchaのテスト ////////////////////////////////////

  const recaptchaResult = await verifyRecaptcha(token)

  if (recaptchaResult === 0) {
    // 検証中にエラーが発生
    return res.json({
      success: false,
      error: {
        type: 'recapcha_error',
        data: null,
      },
    })
  } else if (recaptchaResult === 2) {
    // botとして検出
    return res.json({
      success: false,
      error: {
        type: 'recapcha_failed',
        data: null,
      },
    })
  }

  // メール送信処理  ////////////////////////////////////
  const sendMailResult = await sendMail({ debug, ...validateResult.data })

  const result = sendMailResult
    ? { success: true, error: null }
    : {
        success: false,
        error: {
          type: 'mail_failed',
          data: null,
        },
      }
  return res.json(result)
}
