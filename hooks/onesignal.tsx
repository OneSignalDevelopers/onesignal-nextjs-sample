import { appId } from "@/common/onesignal"
import React, { useRef, useState } from "react"
import OneSignal from "react-onesignal"

const useOneSignal = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const onesignalInitializingRef = useRef(false)

  React.useEffect(() => {
    const init = async () => {
      try {
        if (!onesignalInitializingRef.current) {
          console.log("Initializing OneSignal")
          onesignalInitializingRef.current = true
          await OneSignal.init({
            appId: appId,
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
              enable: true,
              size: "large",
            },
          })

          OneSignal.User.PushSubscription.addEventListener(
            "change",
            (event) => {
              event.current.id ? setUserId(event.current.id) : setUserId(null)
            }
          )

          OneSignal.Notifications.addEventListener(
            "foregroundWillDisplay",
            (event) => {
              console.info("Notification willDisplay", event)
            }
          )
        }
      } catch (e) {
        console.error("OneSignal initilization error.", e)
      } finally {
        onesignalInitializingRef.current = false
      }
    }

    init()
  }, [])

  return { userId }
}

export default useOneSignal
