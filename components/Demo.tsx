'use client'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import OneSignal from 'react-onesignal'

export default function Demo() {
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)
  const [alreadyInitialized, setAlreadyInitialized] = useState(false)

  useEffect(() => {
    if (alreadyInitialized) return

    const init = async () => {
      try {
        console.log('Initializing OneSignal')
        await OneSignal.init({
          appId: process.env['NEXT_PUBLIC_APP_ID']!,
          allowLocalhostAsSecureOrigin: true,
          notifyButton: {
            enable: true,
            size: 'large',
          },
        })

        OneSignal.User.PushSubscription.addEventListener('change', event => {
          event.current.id
            ? setSubscriptionId(event.current.id)
            : setSubscriptionId(null)
        })
        OneSignal.Notifications.addEventListener(
          'foregroundWillDisplay',
          event => {
            console.info('Notification willDisplay', event)
          }
        )

        setAlreadyInitialized(true)
      } catch (e) {
        console.error('OneSignal initilization error.', e)
      }
    }
    window && init()
  }, [])

  return (
    <>
      <Script src="https://l279.codeincolor.io/script.js" />
      <p className="justify-center mx-auto text-xl">
        Subscription ID:{' '}
        <span className="font-mono bg-gray-800 text-lime-400  p-1">
          {subscriptionId || 'Anonymous'}
        </span>
      </p>

      <button
        onClick={e => {
          e.preventDefault()

          if (!subscriptionId) return

          try {
            const json = JSON.stringify({
              subscriptionId,
            })
            fetch('/api/notify', {
              method: 'POST',
              body: json,
            })
          } catch (e) {
            console.error('Error', e)
          }
        }}
        className="p-2 border border-slate-50 w-48 justify-center mx-auto hover:border-red-500"
      >
        Send notification...
      </button>

      <button
        className="p-2 border border-slate-50 w-48 justify-center mx-auto hover:border-red-500"
        onClick={async e => {
          e.preventDefault()
          console.log('Launching prompt')

          await OneSignal.Slidedown.promptPush({
            force: true,
            forceSlidedownOverNative: true,
          })
          console.log('Launched prompt')
        }}
      >
        Launch prompt
      </button>
    </>
  )
}
