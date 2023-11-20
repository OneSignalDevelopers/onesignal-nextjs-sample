'use client'

import { appId } from '@common/onesignal'
import { useState, useEffect } from 'react'
import OneSignal from 'react-onesignal'

export default function useOneSignal() {
  const [userId, setUserId] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      console.log('Initializing OneSignal')

      OneSignal.User.PushSubscription.addEventListener('change', event => {
        event.current.id ? setUserId(event.current.id) : setUserId(null)
      })
      OneSignal.Notifications.addEventListener(
        'foregroundWillDisplay',
        event => {
          console.info('Notification willDisplay', event)
        }
      )

      if (initialized) return
      if (!window) return

      try {
        setInitialized(true)
        await OneSignal.init({
          appId: appId,
          allowLocalhostAsSecureOrigin: true,
          notifyButton: {
            enable: true,
            size: 'large',
          },
        })
      } catch (e) {
        console.error('OneSignal initilization error.', e)
      }
    }
    void init()
  }, [])

  return { userId }
}
