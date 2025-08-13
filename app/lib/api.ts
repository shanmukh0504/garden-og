export type GardenResponse = {
    status: 'Ok' | string
    result: {
      created_at: string
      updated_at: string
      source_swap: {
        chain: string
        asset: string
        filled_amount: string
        amount: string
      }
      destination_swap: {
        chain: string
        asset: string
        filled_amount: string
        amount: string
      }
      create_order: {
        source_chain: string
        destination_chain: string
        source_asset: string
        destination_asset: string
        source_amount: string
        destination_amount: string
      }
    }
  }
  
  const BASE = 'https://testnet.api.garden.finance'
  
  export async function fetchOrder(orderId: string, opts?: RequestInit) {
    const url = `${BASE}/orders/id/${orderId}/matched`
    const res = await fetch(url, {
      // Edge-friendly fetch
      cache: 'no-store',
      // Some infra will require headers; keep lean here
      ...opts,
    })
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`)
    }
    const data = (await res.json()) as GardenResponse
    if (data.status !== 'Ok' || !data.result) {
      throw new Error('Unexpected API response')
    }
    return data.result
  }
  