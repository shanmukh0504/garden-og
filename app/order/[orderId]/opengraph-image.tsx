import { ImageResponse } from 'next/og'
import { fetchOrder } from '@/lib/api'
import { compactHash, formatAmountRaw } from '@/lib/formatting'

export const runtime = 'edge'
export const alt = 'Garden Order'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Optional: quick brand colors
const bg = '#0a0a0a'
const panel = '#111315'
const border = '#1e2329'
const text = '#e5e7eb'
const subtext = '#9ca3af'
const accent = '#34d399'

export default async function OpengraphImage({ params }: { params: Promise<{ orderId: string }> }) {
    try {
        const { orderId } = await params
        const result = await fetchOrder(orderId)

        const srcChain = result.create_order.source_chain
        const dstChain = result.create_order.destination_chain
        const srcAsset = compactHash(result.create_order.source_asset)
        const dstAsset = compactHash(result.create_order.destination_asset)
        const srcAmt = formatAmountRaw(result.create_order.source_amount)
        const dstAmt = formatAmountRaw(result.create_order.destination_amount)

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
                        {/* From */}
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

                        {/* Arrow */}
                        <div style={{ alignSelf: 'center', fontSize: 48, color: subtext }}>→</div>

                        {/* To */}
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
        // Fallback image on error
        const { orderId } = await params
        return new ImageResponse(
            (
                <div style={{
                    width: '100%', height: '100%', background: '#111', color: '#eee',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36
                }}>
                    Failed to load order: {orderId}
                </div>
            ),
            { ...size }
        )
    }
}
