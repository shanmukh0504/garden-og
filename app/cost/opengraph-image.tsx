import { ImageResponse } from 'next/og'
import { fetchOrder } from '@/utils/api'
import { compactHash, formatAmountRaw } from '@/utils/formatting'
import { OGSavingsShareCard } from '@/components/OGSavingsShareCard'

export const size = { width: 1200, height: 630 }

export default async function OpengraphImage({ searchParams }: { searchParams: { orderId?: string } }) {
    try {
        if (!searchParams || typeof searchParams !== 'object') searchParams = {}
        const { orderId } = searchParams

        if (!orderId) {
            return new ImageResponse(
                <OGSavingsShareCard
                    time={false}
                    inputAssetSymbol="BTC"
                    outputAssetSymbol="USDC"
                    feesSaved="$0.00"
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
        const srcAmt = formatAmountRaw(result.create_order.source_amount) || '0'
        const dstAmt = formatAmountRaw(result.create_order.destination_amount) || '0'

        // Calculate fees saved (you can implement your own logic here)
        const feesSaved = `$${srcAmt} saved`

        return new ImageResponse(
            <OGSavingsShareCard
                time={false}
                inputAssetSymbol={srcAsset}
                outputAssetSymbol={dstAsset}
                feesSaved={feesSaved}
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
