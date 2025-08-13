import { formatAmountRaw, compactHash } from '@/lib/formatting'

export default function OrderCard({
  source_chain, destination_chain,
  source_asset, destination_asset,
  source_amount, destination_amount
}: {
  source_chain: string
  destination_chain: string
  source_asset: string
  destination_asset: string
  source_amount: string
  destination_amount: string
}) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="text-neutral-400 text-xs uppercase">From</div>
          <div className="text-lg font-medium">{source_chain}</div>
          <div className="text-sm text-neutral-300">Asset: {compactHash(source_asset)}</div>
          <div className="text-sm text-emerald-400 font-mono">
            Amount: {formatAmountRaw(source_amount)}
          </div>
        </div>
        <div>
          <div className="text-neutral-400 text-xs uppercase">To</div>
          <div className="text-lg font-medium">{destination_chain}</div>
          <div className="text-sm text-neutral-300">Asset: {compactHash(destination_asset)}</div>
          <div className="text-sm text-emerald-400 font-mono">
            Amount: {formatAmountRaw(destination_amount)}
          </div>
        </div>
      </div>
    </div>
  )
}
