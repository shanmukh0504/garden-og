import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { fetchOrder } from '@/lib/api'
import OrderCard from '@/components/OrderCard'

export const dynamic = 'force-dynamic'

async function getBaseUrlFromHeaders() {
    const h = await headers()
    const proto = h.get('x-forwarded-proto') ?? 'https'
    const host =
        h.get('x-forwarded-host') ??
        h.get('host') ??
        'localhost:3000'
    return `${proto}://${host}`
}

export async function generateMetadata(
    { params }: { params: Promise<{ orderId: string }> }
): Promise<Metadata> {
    const { orderId } = await params
    const base = await getBaseUrlFromHeaders()
    const ogUrl = new URL(`/order/${orderId}/opengraph-image`, base).toString()

    return {
        title: `Order ${orderId}`,
        description: 'Garden order preview',
        openGraph: {
            type: 'website',
            images: [{ url: ogUrl, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            images: [ogUrl],
        },
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
