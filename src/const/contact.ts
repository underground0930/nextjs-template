export const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''

export const inputElements = [
  {
    name: 'username',
    textarea: false,
    label: 'お名前 [必須]',
    row: null,
  },
  {
    name: 'company',
    textarea: false,
    label: '会社名',
    row: null,
  },
  {
    name: 'email',
    textarea: false,
    label: 'メールアドレス [必須]',
    row: null,
  },
  {
    name: 'detail',
    textarea: true,
    label: 'お問い合わせ [必須]',
    row: 15,
  },
] as const

const commonErrorText =
  'お手数ですが、再度お試しいただくか、しばらく時間を置いてからお試しください。'

export const errorText = {
  mail_failed: `メールの送信に失敗しました。${commonErrorText}`,
  recapcha_failed: 'bot判定されたため、データは送信されませんでした。',
  recapcha_error: `bot判定検証中にエラーが発生したため、データは送信されませんでした。${commonErrorText}`,
  server: `サーバーとの通信でエラーが発生したため、${commonErrorText}`,
}
