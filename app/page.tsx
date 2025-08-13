'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
        <form
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (orderId.trim()) router.push(`/order/${orderId.trim()}`)
          }}
        >
          <input
            className="flex-1 rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="1c010f0d...eab894bb"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button className="px-5 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99]">
            Go
          </button>
        </form>

        <div className="text-sm text-neutral-500">
          Tip: Share <code>https://your-domain.com/order/&lt;orderId&gt;</code> on X.com — the preview image is generated from live data.
        </div>
      </div>
    </main>
  )
}
