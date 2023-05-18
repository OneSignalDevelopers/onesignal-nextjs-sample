"use client"

import { sendUserNotification } from "@common/actions"
import useOneSignal from "@hooks/onesignal"

export default function Demo() {
  const { userId } = useOneSignal()

  return (
    <>
      <p className="justify-center mx-auto">
        OneSignal User ID: {userId || "Anonymous User"}
      </p>

      <button
        onClick={(e) => {
          e.preventDefault()
          userId && void sendUserNotification(userId)
        }}
        className="p-2 border border-slate-50 w-48 justify-center mx-auto hover:border-red-500"
      >
        Send notification...
      </button>
    </>
  )
}
