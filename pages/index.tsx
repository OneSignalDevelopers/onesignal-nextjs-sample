import Demo from "@/components/Demo"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>OneSignal + Next.js 13</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Script type="module" src="../scripts/a2hs.js" /> */}
      <main className="container mx-auto sm:px-6 lg:px-8 mt-4 mb-4 h-screen flex flex-col gap-4">
        <h1 className="text-3xl text-center">OneSignal Next.js 13</h1>

        <Demo />
      </main>
    </>
  )
}
