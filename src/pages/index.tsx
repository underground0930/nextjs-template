import { InferGetStaticPropsType } from 'next'
import { Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

import { MetaHead, ImageWrap, Button, Wrapper } from '@/components/common'
import { List } from '@/components/pages/news'

import { microcmsGetList } from '@/libs'
import { baseURL } from '@/const'
import { NewsListData } from '@/types'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Page({ news }: PageProps) {
  return (
    <>
      <MetaHead
        {...{
          title: 'Top',
          description: 'Websiteへようこそ',
          url: '',
          imageUrl: `${baseURL}/api/og?title=Top`,
        }}
      />
      <Wrapper>
        {/* hero */}
        <div className='relative mb-10 flex aspect-[10/4] flex-col justify-center overflow-hidden'>
          <h1 className='relative z-[2] pl-5 text-3xl font-bold md:pl-8 md:text-5xl'>
            Website
          </h1>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect='fade'
            speed={3000}
            fadeEffect={{ crossFade: true }}
            autoplay
            className='!absolute inset-0 h-full w-full'
          >
            <SwiperSlide>
              <ImageWrap url='/images/hero/top.jpg' fill />
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrap url='/images/hero/top_2.jpg' fill />
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrap url='/images/hero/top_3.jpg' fill />
            </SwiperSlide>
          </Swiper>
        </div>
        {/* news */}
        <section className='pb-6 md:pb-8'>
          <h2 className='mb-3 text-2xl font-bold md:mb-5 md:text-3xl'>Latest News</h2>
          {news && <List news={news} />}
        </section>
        <div className='flex justify-center'>
          <Button href='/news' text='News top' />
        </div>
      </Wrapper>
    </>
  )
}

export async function getStaticProps() {
  const result = await microcmsGetList<NewsListData>({
    endpoint: 'news',
    queries: { limit: 3 },
  })
  return {
    props: {
      news: result.data?.contents ?? [],
    },
  }
}
