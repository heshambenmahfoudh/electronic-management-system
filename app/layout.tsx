import type { Metadata } from 'next'
import './globals.css'
import ContextProvider from '../contexts/ContextProvider'
import { Toaster } from 'react-hot-toast'
import { EdgeStoreProvider } from '@/lib/edgestore'
import Provider from '@/provider/providers'

export const metadata: Metadata = {
  title: 'Electronic Management System',
  description: 'Electronic Management System Power full app to send files pdf',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
      // className={inter.className}
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <ContextProvider>
          <EdgeStoreProvider>
            <Provider>{children}</Provider>
          </EdgeStoreProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
