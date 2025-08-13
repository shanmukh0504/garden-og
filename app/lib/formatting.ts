export function compactHash(addr?: string) {
    if (!addr) return ''
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`
  }
  
  export function formatAmountRaw(s?: string) {
    if (!s) return ''
    try {
      const withCommas = s.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return withCommas
    } catch {
      return s
    }
  }
  