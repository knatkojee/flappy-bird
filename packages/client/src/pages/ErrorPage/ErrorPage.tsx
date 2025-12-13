import { PAGE_TITLES } from '@/constants/pageTitles'
import styles from './ErrorPage.module.css'
import birdImg from '@/assets/images/bird-dead.webp'

const ErrorPage: React.FC<{ error: '404' | '500' }> = ({ error }) => {
  const title =
    error === '404' ? PAGE_TITLES.NOT_FOUND : PAGE_TITLES.SERVER_ERROR
  const subTitle =
    error === '404'
      ? 'Надо перестроить маршрут'
      : 'Что-то пошло не так. Мы уже разбираемся'

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1 className={styles.code}>{title}</h1>
        <h2 className={styles.message}>{subTitle}</h2>
      </div>
      <img className={styles.img} src={birdImg} alt="Ошибка" />
    </div>
  )
}

export default ErrorPage
