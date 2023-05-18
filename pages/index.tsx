import Head from "next/head"
import Script from "next/script"
import useOneSignal from "./hooks/onesignal"


export default function Home() {
  const { user } = useOneSignal()

  return (
    <>
      <Head>
        <title>OneSignal + Next.js 13</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script type="module" src="../scripts/a2hs.js" />
      <main className="container mx-auto sm:px-6 lg:px-8 mt-4 mb-4 h-screen flex flex-col gap-4">
        <h1 className="text-3xl text-center">OneSignal Next.js 13</h1>

        <pre className="justify-center mx-auto">
          UserId: {user || "Anonymous"}
        </pre>
        <button
          onClick={(e) => {
            e.preventDefault()
            user && void sendUserNotification(user)
          }}
          className="p-2 border border-slate-50 w-48 justify-center mx-auto hover:border-red-500"
        >
          Send notification...
        </button>
      </main>
    </>
  )
}
