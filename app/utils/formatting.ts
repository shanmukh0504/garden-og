export function compactHash(addr?: string) {
    if (!addr) return ''
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`
  }
  
  export function formatAmountRaw(amount?: string) {
    if (!amount) return ''
    try {
      const withCommas = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return withCommas
    } catch {
      return amount
    }
  }
  