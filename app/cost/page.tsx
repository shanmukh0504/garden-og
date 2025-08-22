import { SavingsShareCard } from '@/components/SavingsShareCard'

// Force dynamic rendering to prevent build-time issues
export const dynamic = 'force-dynamic'

export default function CostPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <SavingsShareCard
                time={false}
                inputAssetSymbol="BTC"
                outputAssetSymbol="USDC"
                feesSaved="$20.01"
                flowersSrc="/flowers.png"
                pinkStrokesSrc="/PinkStrokes.png"
                flowersLogoSrc="/flowersLogo.png"
            />
        </div>
    )
}
