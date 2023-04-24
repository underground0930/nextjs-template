import { z, ZodIssue } from 'zod'

export type FormBodyData = {
  username: string
  company?: string
  email: string
  detail: string
}

export type PostFormBodyData = FormBodyData & {
  token: string
  debug: boolean
}

const err = {
  min: '必須項目です',
  max: (max: number) => `最大${max}文字までにしてください`,
  email: 'メールアドレスの値が不正です',
}

export const FormBodyDataSchema = z.object({
  username: z.string().trim().min(1, err.min).max(100, err.max(100)),
  company: z.string().trim().max(150, err.max(150)).optional(),
  email: z.string().email(err.email).trim().min(1, err.min).max(150, err.max(150)),
  detail: z.string().trim().min(1, err.min).max(3000, err.max(3000)),
}) satisfies z.ZodType<FormBodyData>

export type ResultType =
  | {
      success: true
      error: null
    }
  | {
      success: false
      error: {
        type: 'invalid'
        data: ZodIssue[]
      }
    }
  | {
      success: false
      error: {
        type: 'mail_failed'
        data: null
      }
    }
  | {
      success: false
      error: {
        type: 'recapcha_error'
        data: null
      }
    }
  | {
      success: false
      error: {
        type: 'recapcha_failed'
        data: null
      }
    }
