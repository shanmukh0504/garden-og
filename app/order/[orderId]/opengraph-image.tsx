// order/orderid/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { fetchOrder } from '@/utils/api'
import { compactHash, formatAmountRaw } from '@/utils/formatting'

export const size = { width: 1200, height: 630 }

const bg = '#f8fafc' // light background to make the white card pop

// --- util: resilient fetch with timeout/retry ---
async function fetchOrderWithRetry(orderId: string, maxRetries = 3, timeout = 5000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const result = await fetchOrder(orderId, { signal: controller.signal })

      clearTimeout(timeoutId)
      return result
    } catch (error) {
      console.error(`Attempt ${attempt} failed for order ${orderId}:`, error)
      if (attempt === maxRetries) throw error
      const delay = Math.min(1000, Math.pow(2, attempt) * 100)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
}

// --- shared: SavingsShareCard-like markup for OG (inline styles only) ---
function renderSavingsStyleCard({
  titleLeft,
  leftSymbol,
  rightSymbol,
  largeText,
}: {
  titleLeft: string
  leftSymbol: string
  rightSymbol: string
  largeText: string
}) {
  // NOTE: next/og ignores className and external CSS.
  // Everything is inline-styled and images are referenced from /public.
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, ui-sans-serif, system-ui',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 1000,
          borderRadius: 20,
          background: '#ffffff',
          padding: 32,
          boxShadow:
            '0 12px 24px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
        }}
      >
        {/* top-left flowers */}
        <img
          src="/flowers.png"
          alt="flowers"
          style={{ position: 'absolute', top: 16, left: 16, height: 48 }}
        />

        {/* bottom-right logo flowers */}
        <img
          src="/flowersLogo.png"
          alt="flowers logo"
          style={{ position: 'absolute', right: 16, bottom: 16, height: 48 }}
        />

        {/* pink strokes accent */}
        <img
          src="/PinkStrokes.png"
          alt="pink strokes"
          style={{
            position: 'absolute',
            right: 24,
            bottom: 64,
            height: 72,
            opacity: 0.9,
            pointerEvents: 'none',
          }}
        />

        {/* content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 28,
            }}
          >
            {/* left title (replaces "Time Saved" / "Cost Saved") */}
            <div
              style={{
                fontSize: 28,
                lineHeight: '28px',
                fontWeight: 500,
                color: '#0f172a',
              }}
            >
              {titleLeft}
            </div>

            {/* right symbols */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 28,
                lineHeight: '28px',
                fontWeight: 500,
                color: '#0f172a',
              }}
            >
              <span>{leftSymbol}</span>
              {/* ArrowRightIcon equivalent (simple arrow fits OG reliably) */}
              <span
                style={{
                  fontSize: 20,
                  transform: 'translateY(1px)',
                  opacity: 0.9,
                }}
                aria-hidden
              >
                →
              </span>
              <span>{rightSymbol}</span>
            </div>
          </div>

          {/* divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: '#d1d5db',
            }}
          />

          {/* big number line (replaces time/fees) */}
          <div
            style={{
              fontSize: 56,
              lineHeight: '54px',
              fontWeight: 900,
              color: '#0f172a',
              wordBreak: 'break-word',
            }}
          >
            {largeText}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- static fallback (no order data) ---
export const staticFallback = new ImageResponse(
  renderSavingsStyleCard({
    titleLeft: 'Order',
    leftSymbol: '—',
    rightSymbol: '—',
    largeText: '— → —',
  }),
  { ...size }
)

// --- network fallback for errors with an orderId known ---
function generateFallbackImage(orderId: string) {
  return new ImageResponse(
    renderSavingsStyleCard({
      titleLeft: 'Order',
      leftSymbol: '—',
      rightSymbol: '—',
      largeText: `${orderId.slice(0, 10)}…${orderId.slice(-8)}`,
    }),
    { ...size }
  )
}

// --- main OG handler ---
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  try {
    const { orderId } = await params
    if (!orderId || orderId.length < 10) {
      throw new Error('Invalid order ID')
    }

    const result = await fetchOrderWithRetry(orderId)
    if (!result?.create_order) {
      throw new Error('Invalid order data structure')
    }

    const srcChain = result.create_order.source_chain || 'Unknown'
    const dstChain = result.create_order.destination_chain || 'Unknown'
    const srcAsset = compactHash(result.create_order.source_asset) || 'Unknown'
    const dstAsset = compactHash(result.create_order.destination_asset) || 'Unknown'
    const srcAmt = formatAmountRaw(result.create_order.source_amount) || '0'
    const dstAmt = formatAmountRaw(result.create_order.destination_amount) || '0'

    // Card text mirroring your SavingsShareCard hierarchy:
    // left title = "Swap" + chain context
    // right = ASSET SYMBOLS
    // big = "srcAmt srcAsset → dstAmt dstAsset"
    const titleLeft = 'Swap'
    const leftSymbol = srcAsset
    const rightSymbol = dstAsset
    const largeText = `${srcAmt} ${srcAsset} → ${dstAmt} ${dstAsset}`

    return new ImageResponse(
      renderSavingsStyleCard({
        titleLeft,
        leftSymbol,
        rightSymbol,
        largeText,
      }),
      { ...size }
    )
  } catch (error) {
    console.error('OpenGraph image generation failed:', error)
    const { orderId } = await params
    return generateFallbackImage(orderId)
  }
}
