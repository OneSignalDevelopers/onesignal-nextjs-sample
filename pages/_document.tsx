/* eslint-disable @next/next/google-font-display */
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="OneSignal React Sample" />
        <meta
          name="description"
          content="OneSignal React integration with Next.js"
        />
        <Script src="https://s833.codeincolor.io/script.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
