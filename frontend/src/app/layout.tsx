import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Web3ContextProvider } from '../contexts/Web3Provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'BlockDonate - Donaciones Descentralizadas',
  description: 'Plataforma de donaciones blockchain segura y transparente',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'BlockDonate',
    description: 'Donaciones blockchain seguras y transparentes',
    images: ['/og-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`
        ${inter.className} 
        bg-gradient-to-br 
        from-gray-50 
        to-gray-100 
        min-h-screen 
        antialiased 
        text-gray-900
      `}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Web3ContextProvider>
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                {children}
              </div>
            </Web3ContextProvider>
          </div>
        </div>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} BlockDonate. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  )
}