import { appId } from "@common/onesignal"
import { useRef, useState, useEffect } from "react"
import OneSignal from "react-onesignal"

export default function useOneSignal() {
  const [userId, setUserId] = useState<string | null>(null)
  const onesignalInitializingRef = useRef(false)

  useEffect(() => {
    const init = async () => {
      if (onesignalInitializingRef.current) return

      try {
        console.log("Initializing OneSignal")
        onesignalInitializingRef.current = true

        OneSignal

        // OneSignal.User.PushSubscription.addEventListener("change", (event) => {
        //   event.current.id ? setUserId(event.current.id) : setUserId(null)
        // })
        // OneSignal.Notifications.addEventListener(
        //   "foregroundWillDisplay",
        //   (event) => {
        //     console.info("Notification willDisplay", event)
        //   }
        // )
        // await OneSignal.init({
        //   appId: appId,
        //   allowLocalhostAsSecureOrigin: true,
        //   notifyButton: {
        //     enable: true,
        //     size: "large",
        //   },
        // })
      } catch (e) {
        console.error("OneSignal initilization error.", e)
      } finally {
        console.log("OneSignal initialized")
        onesignalInitializingRef.current = false
      }
    }
    void init()
  }, [])

  return { userId }
}
