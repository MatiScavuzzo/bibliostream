import { Inter } from 'next/font/google';
import type { Children } from "@types";
import "./globals.css";
import { SWRProvider } from './context/SWRProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout(
  {
    children
  }: Children) {
  return (
    <html lang="es" className={inter.className}>
      <SWRProvider>
        <body>
          {children}
        </body>
      </SWRProvider>
    </html>
  )
}