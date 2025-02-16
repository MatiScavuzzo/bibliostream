import { Roboto } from 'next/font/google';
import type { Children } from "@types";
import "./globals.css";
import { SWRProvider } from './context/SWRProvider';
import { Navbar } from './containers';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export default function RootLayout(
  {
    children
  }: Children) {
  return (
    <html lang="es" className={roboto.className}>
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