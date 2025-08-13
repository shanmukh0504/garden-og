import { Metadata } from 'next'
import { fetchOrder } from '@/lib/api'
import { compactHash, formatAmountRaw } from '@/lib/formatting'
import OrderCard from '@/components/OrderCard'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: Promise<{ orderId: string }> }): Promise<Metadata> {
    try {
        const { orderId } = await params
        const result = await fetchOrder(orderId)

        const srcChain = result.create_order.source_chain
        const dstChain = result.create_order.destination_chain
        const srcAsset = compactHash(result.create_order.source_asset)
        const dstAsset = compactHash(result.create_order.destination_asset)
        const srcAmt = formatAmountRaw(result.create_order.source_amount)
        const dstAmt = formatAmountRaw(result.create_order.destination_amount)

        return {
            title: `Garden Order ${orderId.slice(0, 8)}...`,
            description: `Cross-chain transfer: ${srcAmt} ${srcAsset} on ${srcChain} → ${dstAmt} ${dstAsset} on ${dstChain}`,
            openGraph: {
                title: `Garden Order ${orderId.slice(0, 8)}...`,
                description: `Cross-chain transfer: ${srcAmt} ${srcAsset} on ${srcChain} → ${dstAmt} ${dstAsset} on ${dstChain}`,
                type: 'website',
                images: [
                    {
                        url: `/order/${orderId}/opengraph-image`,
                        width: 1200,
                        height: 630,
                        alt: 'Garden Order Preview',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: `Garden Order ${orderId.slice(0, 8)}...`,
                description: `Cross-chain transfer: ${srcAmt} ${srcAsset} on ${srcChain} → ${dstAmt} ${dstAsset} on ${dstChain}`,
                images: [`/order/${orderId}/opengraph-image`],
            },
        }
    } catch (error) {
        const { orderId } = await params
        return {
            title: `Garden Order ${orderId.slice(0, 8)}...`,
            description: 'Garden cross-chain order details',
            openGraph: {
                title: `Garden Order ${orderId.slice(0, 8)}...`,
                description: 'Garden cross-chain order details',
                type: 'website',
                images: [
                    {
                        url: `/order/${orderId}/opengraph-image`,
                        width: 1200,
                        height: 630,
                        alt: 'Garden Order Preview',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: `Garden Order ${orderId.slice(0, 8)}...`,
                description: 'Garden cross-chain order details',
                images: [`/order/${orderId}/opengraph-image`],
            },
        }
    }
}

export default async function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params
    const data = await fetchOrder(orderId)
    const { create_order } = data

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Order</h1>
            <div className="text-xs text-neutral-500 break-all">ID: {orderId}</div>

            <OrderCard
                source_chain={create_order.source_chain}
                destination_chain={create_order.destination_chain}
                source_asset={create_order.source_asset}
                destination_asset={create_order.destination_asset}
                source_amount={create_order.source_amount}
                destination_amount={create_order.destination_amount}
            />
        </main>
    )
}
