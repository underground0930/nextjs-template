import { Button, MetaHead, Wrapper } from '@/components/common'
import { Hero } from '@/components/common/Hero'

import { baseURL } from '@/const'

export default function Page() {
  return (
    <>
      <MetaHead
        {...{
          title: '404',
          description: 'お探しのページはみつかりませんでした',
          url: '/404',
          imageUrl: `${baseURL}/api/og?title=404`,
        }}
      />
      <Wrapper>
        {/* hero */}
        <Hero title='Not Found' imgSrc='/images/hero/404.jpg' />
        {/* content */}
        <div className='mb-10 text-base'>
          <section className='mb-10'>
            <h2 className='mb-3 text-2xl font-bold md:mb-5 md:text-3xl'>Not Found</h2>
            <p>お探しのページは見つかりませんでした。</p>
          </section>
        </div>
        <div className='flex justify-center'>
          <Button href='/' text='Back to Top' />
        </div>
      </Wrapper>
    </>
  )
}
