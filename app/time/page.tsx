import { SavingsShareCard } from '@/components/SavingsShareCard'

export default function TimePage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <SavingsShareCard
                time={true}
                inputAssetSymbol="BTC"
                outputAssetSymbol="USDC"
                timeSaved="01m 23s"
            />
        </div>
    )
}
