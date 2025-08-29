import { ImageResponse } from 'next/og'
import { fetchOrder } from '@/utils/api'
import { compactHash } from '@/utils/formatting'
import { OGSavingsShareCard } from '@/components/OGSavingsShareCard'

export const size = { width: 1200, height: 630 }

export default async function OpengraphImage({ searchParams }: { searchParams: { orderId?: string } }) {
    try {
        const { orderId } = searchParams

        if (!orderId) {
            return new ImageResponse(
                <OGSavingsShareCard
                    time={true}
                    inputAssetSymbol="BTC"
                    outputAssetSymbol="USDC"
                    timeSaved="00m 00s"
                />,
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

        const timeSaved = `1m 23s`

        return new ImageResponse(
            <OGSavingsShareCard
                time={true}
                inputAssetSymbol={srcAsset}
                outputAssetSymbol={dstAsset}
                timeSaved={timeSaved}
            />,
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
