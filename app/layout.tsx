import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { CSPostHogProvider } from './providers'
import type { Metadata } from 'next'


const fontHeading = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: '700', 
})

const fontBody = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400', 
})

export const metadata: Metadata = {
  title: 'VSL Script Builder',
  description: 'Modeled after Alex Hormozi\'s Video Sales Letter for the Skool Games',
  openGraph: {
    title: 'VSL Script Builder',
    description: 'Modeled after Alex Hormozi\'s Video Sales Letter for the Skool Games',
    images: [
      {
        url: 'https://vsl-builder.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image Alt',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'VSL Script Builder',
    description: 'Modeled after Alex Hormozi\'s Video Sales Letter for the Skool Games',
    images: ['https://vsl-builder.vercel.app/og-image.png'],
  },
}


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
        > 
        {children}
        <Toaster />
      </body>
      </CSPostHogProvider>
    </html>
  )
}