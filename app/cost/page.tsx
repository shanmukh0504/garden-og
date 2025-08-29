import { SavingsShareCard } from '@/components/SavingsShareCard'
import { fetchOrder } from '@/utils/api'
import { compactHash } from '@/utils/formatting'

export const dynamic = 'force-dynamic'

export default async function CostPage({
    searchParams,
}: {
    searchParams: Promise<{ orderId?: string }>
}) {
    const { orderId } = await searchParams

    if (!orderId) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-white">Cost Savings</h1>
                    <p className="text-gray-300">Please provide an orderId to see cost savings</p>
                </div>
            </div>
        )
    }

    try {
        const result = await fetchOrder(orderId)
        const { create_order } = result

        const srcAsset = compactHash(create_order.source_asset) || 'Unknown'
        const dstAsset = compactHash(create_order.destination_asset) || 'Unknown'
        const feesSaved = '$20.01'

        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4">
                <SavingsShareCard
                    time={false}
                    inputAssetSymbol={srcAsset}
                    outputAssetSymbol={dstAsset}
                    feesSaved={feesSaved}
                    flowersSrc="/flowers.png"
                    pinkStrokesSrc="/PinkStrokes.png"
                    flowersLogoSrc="/flowersLogo.png"
                />
            </div>
        )
    } catch {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-white">Error</h1>
                    <p className="text-gray-300">Failed to load order data</p>
                </div>
            </div>
        )
    }
}
