import AppShell from '@/components/layouts/AppShell'
// import Navbar from '@/components/layouts/Navbar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'




export default function App({ Component, pageProps : { session, ...pageProps}, }: AppProps) {
  return (
    <SessionProvider session={session}>

    <AppShell>
    {/* <Navbar /> Navbar kita rapihkan lagi di folder AppShell */}
    <Component {...pageProps} />
    </AppShell>

    </SessionProvider>
  ) 
  


}
