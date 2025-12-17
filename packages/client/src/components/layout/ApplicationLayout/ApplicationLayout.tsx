import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import styles from './ApplicationLayout.module.css'
import { ApplicationLayoutProps } from '@/types/components'

export default function ApplicationLayout({
  children,
}: ApplicationLayoutProps) {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  )
}
