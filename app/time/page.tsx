import { SavingsShareCard } from '@/components/SavingsShareCard'

export const dynamic = 'force-dynamic'

export default function TimePage() {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
            <SavingsShareCard
                time={true}
                inputAssetSymbol="BTC"
                outputAssetSymbol="USDC"
                timeSaved="01m 23s"
                flowersSrc="/flowers.png"
                pinkStrokesSrc="/PinkStrokes.png"
                flowersLogoSrc="/flowersLogo.png"
            />
        </div>
    )
}
