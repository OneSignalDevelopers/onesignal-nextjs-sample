import Head from "next/head"
import useOneSignal from "./hooks/onesignal"
import OneSignal from "react-onesignal"
import { useEffect, useState } from "react"

async function sendUserNotification(userId: string) {
  try {
    const json = JSON.stringify({ userId })
    fetch("/api/notify", {
      method: "POST",
      body: json,
    })
  } catch (e) {
    console.error("Failed to send notification", e)
  }
}

export default function Home() {
  const [osUser, setOsUser] = useState("")
  useOneSignal()

  useEffect(() => {
    const loadOneSignalUser = async () => {
      const userId = await OneSignal.getUserId()
      if (userId) {
        setOsUser(userId)
      }
    }

    loadOneSignalUser()
  })

  return (
    <>
      <Head>
        <title>OneSignal + Next.js 13</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto sm:px-6 lg:px-8 mt-4 mb-4 h-screen flex flex-col gap-4">
        <h1 className="text-3xl text-center">OneSignal Next.js 13</h1>

        <pre className="justify-center mx-auto">
          UserId: {osUser || "Anonymous"}
        </pre>
        <button
          onClick={(e) => {
            e.preventDefault()
            osUser && void sendUserNotification(osUser)
          }}
          className="p-2 border border-slate-50 w-48 justify-center mx-auto hover:border-red-500"
        >
          Send notification...
        </button>
      </main>
    </>
  )
}
