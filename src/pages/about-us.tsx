import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function AboutPage() {
  return (
    <>
      <main className={`${styles.main} ${styles.center} ${inter.className}`}>
        <div><h1>ABOUT PAGE WORKS!</h1></div>
      </main>
    </>
  )
}