import { Button, Hero, MetaHead, Wrapper } from '@/components'
import { baseURL } from '@/const'

export default function Page() {
  return (
    <>
      <MetaHead
        {...{
          title: 'Thanks | Contact',
          description: 'お問い合わせ頂きありがとうございました。',
          url: '/contact/thanks',
          imageUrl: `${baseURL}/api/og?title=Contact`,
        }}
      />
      <Wrapper>
        {/* hero */}
        <Hero title='Contact' imgSrc='/images/hero/contact.jpg' />
        <div className='mx-auto mb-10'>
          <div className='text-center text-lg'>
            お問い合わせありがとうございました。
            <br />
            内容を確認後、折り返しご連絡いたしますので、
            <br />
            今しばらくおまちください。
          </div>
        </div>
        <div className='flex justify-center'>
          <Button href='/news' text='Back to Index' />
        </div>
      </Wrapper>
    </>
  )
}
