import { ImageResponse } from 'next/og'
import { fetchOrder } from '@/utils/api'
import { compactHash, formatAmountRaw } from '@/utils/formatting'

export const size = { width: 1200, height: 630 }

export default async function OpengraphImage({ searchParams }: { searchParams: { orderId?: string } }) {
    try {
        const { orderId } = searchParams

        // Handle build-time scenario where no orderId is provided
        if (!orderId) {
            return new ImageResponse(
                (
                    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-12 font-sans">
                        <div className="bg-[#111315] border border-[#1e2329] rounded-2xl p-12 flex flex-col items-center justify-center min-w-[600px] max-w-[800px] text-center">
                            <div className="mb-8">
                                <div className="text-2xl text-[#9ca3af] mb-4">
                                    Cost Saved
                                </div>
                                <div className="text-xl text-[#e5e7eb] mb-6">
                                    Enter orderId to see savings
                                </div>
                                <div className="text-[72px] font-black text-[#34d399] leading-none">
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
        const feesSaved = '$20.01' // You can calculate this from order data if available

        return new ImageResponse(
            (
                <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-12 font-sans">
                    {/* SavingsShareCard styled for OpenGraph */}
                    <div className="bg-[#111315] border border-[#1e2329] rounded-2xl p-12 flex flex-col items-center justify-center min-w-[600px] max-w-[800px] text-center">
                        <div className="mb-8">
                            <div className="text-2xl text-[#9ca3af] mb-4">
                                Cost Saved
                            </div>
                            <div className="text-xl text-[#e5e7eb] mb-6">
                                {srcAsset} → {dstAsset}
                            </div>
                            <div className="text-[72px] font-black text-[#34d399] leading-none">
                                {feesSaved}
                            </div>
                        </div>

                        <div className="mt-6 text-[#9ca3af] text-lg flex gap-2">
                            <span>Order:</span>
                            <span className="font-mono">
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

        // Return a simple error image without fallback
        return new ImageResponse(
            (
                <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center text-[#e5e7eb] text-2xl font-sans">
                    Error generating image
                </div>
            ),
            { ...size }
        )
    }
}
