import { ImageResponse } from 'next/og'
import { fetchOrder } from '@/lib/api'
import { compactHash, formatAmountRaw } from '@/lib/formatting'

export const runtime = 'edge'
export const alt = 'Garden Order'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export const revalidate = 3600

export const staticFallback = new ImageResponse(
    (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            fontSize: 28,
            color: '#e5e7eb',
            fontFamily: 'Inter, ui-sans-serif, system-ui',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{
                    width: 48, height: 48, borderRadius: 12, background: '#34d399'
                }} />
                <div style={{ fontSize: 36, fontWeight: 700 }}>Garden Order</div>
            </div>

            <div style={{
                background: '#111315',
                border: '1px solid #1e2329',
                borderRadius: 16,
                padding: 32,
                textAlign: 'center',
                maxWidth: 600
            }}>
                <div style={{ color: '#9ca3af', fontSize: 20, marginBottom: 16 }}>
                    Garden Cross-Chain Order
                </div>
                <div style={{
                    fontSize: 24,
                    color: '#34d399'
                }}>
                    Secure Asset Transfers
                </div>
            </div>
        </div>
    ),
    { width: 1200, height: 630 }
)

const bg = '#0a0a0a'
const panel = '#111315'
const border = '#1e2329'
const text = '#e5e7eb'
const subtext = '#9ca3af'
const accent = '#34d399'

async function fetchOrderWithRetry(orderId: string, maxRetries = 3, timeout = 5000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), timeout)

            const result = await fetchOrder(orderId, {
                signal: controller.signal
            })

            clearTimeout(timeoutId)
            return result
        } catch (error) {
            console.error(`Attempt ${attempt} failed for order ${orderId}:`, error)

            if (attempt === maxRetries) {
                throw error
            }

            const delay = Math.min(1000, Math.pow(2, attempt) * 100)
            await new Promise(resolve => setTimeout(resolve, delay))
        }
    }
}

function generateFallbackImage(orderId: string) {
    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                background: bg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 48,
                fontSize: 28,
                color: text,
                fontFamily: 'Inter, ui-sans-serif, system-ui',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 12, background: accent
                    }} />
                    <div style={{ fontSize: 36, fontWeight: 700 }}>Garden Order</div>
                </div>

                <div style={{
                    background: panel,
                    border: `1px solid ${border}`,
                    borderRadius: 16,
                    padding: 32,
                    textAlign: 'center',
                    maxWidth: 600
                }}>
                    <div style={{ color: subtext, fontSize: 20, marginBottom: 16 }}>
                        Order Details Temporarily Unavailable
                    </div>
                    <div style={{
                        fontFamily: 'ui-monospace, SFMono-Regular',
                        fontSize: 24,
                        color: accent,
                        wordBreak: 'break-all'
                    }}>
                        {orderId}
                    </div>
                </div>

                <div style={{
                    marginTop: 32,
                    color: subtext,
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    Please try again later
                </div>
            </div>
        ),
        { ...size }
    )
}

export default async function OpengraphImage({ params }: { params: Promise<{ orderId: string }> }) {
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

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: bg,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 48,
                        fontSize: 28,
                        color: text,
                        fontFamily: 'Inter, ui-sans-serif, system-ui',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 8, background: accent
                        }} />
                        <div style={{ fontSize: 30, fontWeight: 700 }}>Garden Order</div>
                    </div>

                    <div style={{
                        marginTop: 32,
                        display: 'flex',
                        gap: 24,
                    }}>
                        <div style={{
                            flex: 1,
                            background: panel,
                            border: `1px solid ${border}`,
                            borderRadius: 16,
                            padding: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                        }}>
                            <div style={{ color: subtext, fontSize: 18, textTransform: 'uppercase', letterSpacing: 2 }}>From</div>
                            <div style={{ fontSize: 34, fontWeight: 700 }}>{srcChain}</div>
                            <div style={{ color: subtext }}>Asset</div>
                            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular', fontSize: 26 }}>{srcAsset}</div>
                            <div style={{ color: subtext }}>Amount</div>
                            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular', fontSize: 30, color: accent }}>
                                {srcAmt}
                            </div>
                        </div>

                        <div style={{ alignSelf: 'center', fontSize: 48, color: subtext }}>→</div>

                        <div style={{
                            flex: 1,
                            background: panel,
                            border: `1px solid ${border}`,
                            borderRadius: 16,
                            padding: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                        }}>
                            <div style={{ color: subtext, fontSize: 18, textTransform: 'uppercase', letterSpacing: 2 }}>To</div>
                            <div style={{ fontSize: 34, fontWeight: 700 }}>{dstChain}</div>
                            <div style={{ color: subtext }}>Asset</div>
                            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular', fontSize: 26 }}>{dstAsset}</div>
                            <div style={{ color: subtext }}>Amount</div>
                            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular', fontSize: 30, color: accent }}>
                                {dstAmt}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: 24,
                        color: subtext,
                        fontSize: 20,
                        display: 'flex',
                        gap: 8
                    }}>
                        <span>Order:</span>
                        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular' }}>{orderId.slice(0, 10)}…{orderId.slice(-8)}</span>
                    </div>
                </div>
            ),
            { ...size }
        )
    } catch (error: unknown) {
        console.error('OpenGraph image generation failed:', error)

        const { orderId } = await params
        return generateFallbackImage(orderId)
    }
}
