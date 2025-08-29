import type { Metadata } from 'next'
import './globals.css'
import "@gardenfi/garden-book/style.css";

export const metadata: Metadata = {
  title: 'Garden OG Generator',
  description: 'Generate OG images for Garden orders',
  openGraph: { type: 'website' },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950">{children}</body>
    </html>
  )
}
