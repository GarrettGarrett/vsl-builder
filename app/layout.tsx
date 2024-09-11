// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { CSPostHogProvider } from './providers'


const fontHeading = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: '700', // Added weight for heading
})

const fontBody = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400', // Added weight for body
})

 


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