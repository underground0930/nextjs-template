import { apiPost } from '@/libs'

export const verifyRecaptcha = async (recaptchaValue: string): Promise<0 | 1 | 2> => {
  return apiPost<{ success: boolean }>({
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${
      process.env.RECAPTCHA_SECRET_KEY ?? ''
    }&response=${recaptchaValue}`,
  })
    .then((response) => {
      return response.data?.success ? 1 : 2 // reCAPTCHA 検証成功 or 検証失敗
    })
    .catch(
      () => 0, // reCAPTCHA 検証中にエラーが発生
    )
}
