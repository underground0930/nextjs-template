import { Button, MetaHead, Wrapper, Hero } from '@/components'
import { baseURL } from '@/const'

export default function Page() {
  return (
    <>
      <MetaHead
        {...{
          title: 'About',
          description: 'このサイトについての説明文です',
          url: '/about',
          imageUrl: `${baseURL}/api/og?title=About`,
        }}
      />
      <Wrapper>
        {/* hero */}
        <Hero title='About' imgSrc='/images/hero/about.jpg' />
        {/* content */}
        <div className='mb-10 text-base'>
          <section className='mb-10'>
            <h2 className='mb-5 text-lg font-bold'>このサイトについて</h2>
            <p>
              つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書
            </p>
          </section>
          <section className='mb-10'>
            <h2 className='mb-5 text-lg font-bold'>このサイトについて</h2>
            <p>
              つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書
            </p>
          </section>
        </div>
        <div className='flex justify-center'>
          <Button href='/' text='Back to Top' />
        </div>
      </Wrapper>
    </>
  )
}
