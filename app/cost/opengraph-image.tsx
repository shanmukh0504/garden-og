import { ImageResponse } from 'next/og'
import { fetchOrder } from '@/utils/api'
import { compactHash } from '@/utils/formatting'

export const size = { width: 1200, height: 630 }

export default async function OpengraphImage({ searchParams }: { searchParams: { orderId?: string } }) {
    try {
        if (!searchParams || typeof searchParams !== 'object') searchParams = {}
        const { orderId } = searchParams

        if (!orderId) {
            return new ImageResponse(
                (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#0a0a0a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 48,
                        fontFamily: 'Inter, ui-sans-serif, system-ui',
                    }}>
                        <div style={{
                            background: '#111315',
                            border: '1px solid #1e2329',
                            borderRadius: 16,
                            padding: 48,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 600,
                            maxWidth: 800,
                            textAlign: 'center'
                        }}>
                            <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: 24, color: '#9ca3af', marginBottom: 16 }}>
                                    Cost Saved
                                </div>
                                <div style={{ fontSize: 20, color: '#e5e7eb', marginBottom: 24 }}>
                                    Enter orderId to see savings
                                </div>
                                <div style={{
                                    fontSize: 72,
                                    fontWeight: 900,
                                    color: '#34d399',
                                    lineHeight: 1
                                }}>
                                    $0.00
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                { ...size }
            )
        }

        if (orderId.length < 10) {
            throw new Error('Invalid order ID')
        }

        const result = await fetchOrder(orderId)

        if (!result?.create_order) {
            throw new Error('Invalid order data structure')
        }

        const srcAsset = compactHash(result.create_order.source_asset) || 'Unknown'
        const dstAsset = compactHash(result.create_order.destination_asset) || 'Unknown'
        const feesSaved = '$20.01'

        return new ImageResponse(
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
                    fontFamily: 'Inter, ui-sans-serif, system-ui',
                }}>
                    <div style={{
                        background: '#111315',
                        border: '1px solid #1e2329',
                        borderRadius: 16,
                        padding: 48,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 600,
                        maxWidth: 800,
                        textAlign: 'center'
                    }}>
                        <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 24, color: '#9ca3af', marginBottom: 16 }}>
                                Cost Saved
                            </div>
                            <div style={{ fontSize: 20, color: '#e5e7eb', marginBottom: 24 }}>
                                {srcAsset} → {dstAsset}
                            </div>
                            <div style={{
                                fontSize: 72,
                                fontWeight: 900,
                                color: '#34d399',
                                lineHeight: 1
                            }}>
                                {feesSaved}
                            </div>
                        </div>

                        <div style={{
                            marginTop: 24,
                            color: '#9ca3af',
                            fontSize: 18,
                            display: 'flex',
                            gap: 8
                        }}>
                            <span>Order:</span>
                            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular' }}>
                                {orderId.slice(0, 10)}…{orderId.slice(-8)}
                            </span>
                        </div>
                    </div>
                </div>
            ),
            { ...size }
        )
    } catch (error: unknown) {
        console.error('OpenGraph image generation failed:', error)

        return new ImageResponse(
            (
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e5e7eb',
                    fontSize: 24,
                    fontFamily: 'Inter, ui-sans-serif, system-ui',
                }}>
                    Error generating image
                </div>
            ),
            { ...size }
        )
    }
}
