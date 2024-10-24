import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'AI Resume Enhancer',
  description: 'Boost your career with AI-powered resume optimization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  )
}