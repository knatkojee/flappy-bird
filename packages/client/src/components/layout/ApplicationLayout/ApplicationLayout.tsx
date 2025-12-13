import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import styles from './ApplicationLayout.module.css'

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  )
}
