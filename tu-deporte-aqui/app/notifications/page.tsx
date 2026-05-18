"use client"

import { useState, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import { subscribeUser, unsubscribeUser, sendNotification } from '../actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
 
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
 
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function subscribeToPushSupport() {
  return () => {}
}

function getPushSupportSnapshot() {
  if (typeof window === "undefined") {
    return false
  }

  return 'serviceWorker' in navigator && 'PushManager' in window
}

function PushNotificationManager() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )
  const [message, setMessage] = useState('')
  const isSupported = useSyncExternalStore(
    subscribeToPushSupport,
    getPushSupportSnapshot,
    () => false
  )
 
  async function ensureServiceWorkerRegistration() {
    const existingRegistration = await navigator.serviceWorker.getRegistration('/')

    if (existingRegistration) {
      return existingRegistration
    }

    return navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
  }
 
  async function subscribeToPush() {
    const registration = await ensureServiceWorkerRegistration()
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }
 
  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }
 
  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }
 
  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }
 
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Push Notifications</CardTitle>
      </CardHeader>
      {subscription ? (
        <CardContent>
          <div className="flex flex-col gap-8">
            <p>You are subscribed to push notifications.</p>
            <Button className="w-full" onClick={unsubscribeFromPush}>Unsubscribe</Button>

            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Enter notification message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button className="" onClick={sendTestNotification}>Send Test</Button>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <div className="flex flex-col gap-8">
            <p>You are not subscribed to push notifications.</p>
            <Button className="w-full" onClick={subscribeToPush}>Subscribe</Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function Page() {
  return (
  <div className="flex flex-col min-h-svh items-center justify-center bg-muted/30 p-6 gap-12">
    <PushNotificationManager />
  </div>
  )
}
