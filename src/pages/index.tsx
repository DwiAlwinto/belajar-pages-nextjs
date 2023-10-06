import Head from 'next/head'
// import Navbar from '@/components/layouts/Navbar'
import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      {/* <Navbar /> */}
      <div>Hello Alwinto</div>
    </div>
  )
}
