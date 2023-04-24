import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='ja'>
      <Head />
      <body>
        <main className='container mx-auto'>
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  )
}
