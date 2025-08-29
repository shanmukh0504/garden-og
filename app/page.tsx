'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DOMAIN } from '@/utils/config'

export default function Home() {
  const [orderId, setOrderId] = useState('')
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-semibold">Garden Order OG Generator</h1>
        <p className="text-neutral-400">
          Paste an <code className="text-neutral-200">orderId</code> to see details and get a shareable OG image.
        </p>
        <div className="space-y-4">
          <input
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="1c010f0d...eab894bb"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              className="flex-1 px-5 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!orderId.trim()}
              onClick={() => {
                if (orderId.trim()) router.push(`/time/${orderId.trim()}`)
              }}
            >
              Time
            </button>
            <button
              className="flex-1 px-5 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!orderId.trim()}
              onClick={() => {
                if (orderId.trim()) router.push(`/cost/${orderId.trim()}`)
              }}
            >
              Cost
            </button>
          </div>
        </div>

        <div className="text-sm text-neutral-500">
          Tip: Share <code>{DOMAIN}/time/&lt;orderId&gt;</code> or <code>{DOMAIN}/cost/&lt;orderId&gt;</code> on X.com — the preview images are generated from live data.
        </div>
      </div>
    </main>
  )
}
