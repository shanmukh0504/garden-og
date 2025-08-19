export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://garden-og.vercel.app'

export function buildUrl(path: string): string {
    return `${DOMAIN}${path}`
}
