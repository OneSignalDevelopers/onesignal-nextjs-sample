import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Script from "next/script"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script type="module" src="../scripts/a2hs.js" />
      <Component {...pageProps} />
    </>
  )
}
