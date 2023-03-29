import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Script from "next/script"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://raw.githubusercontent.com/rajatsehgal/add-to-home-screen/gh-pages/AddToHomeScreen.js" />
      <Component {...pageProps} />
    </>
  )
}
