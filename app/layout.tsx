import { Inter } from 'next/font/google';
import type { Children } from "@types";
import "./globals.css";
import { SWRProvider } from './context/SWRProvider';
import { Navbar } from './containers';

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
          <header className='flex w-full justift-center'>
            <Navbar />
          </header>
          {children}
        </body>
      </SWRProvider>
    </html>
  )
}