import classNames from 'classnames'
import styles from './Home.module.css'
import {
  InfoHeart,
  InfoTrophy,
  InfoUsers,
  InfoZap,
} from '@/components/common/Icon/Icon'
import ActionsBlock from './ActionsBlock/ActionsBlock'

const infoConfig = [
  {
    id: 1,
    icon: <InfoZap />,
    title: 'Увлекательно',
    text: 'Попробуйте побить свой предыдущий рекорд?',
  },
  {
    id: 2,
    icon: <InfoTrophy />,
    title: 'Соревнуйтесь с другими игроками',
    text: 'Бросьте вызов игрокам по всему миру и займите свое место в таблице лидеров.',
  },
  {
    id: 3,
    icon: <InfoUsers />,
    title: 'Сообщество',
    text: 'Присоединяйтесь к сообществу игроков и делитесь своими достижениями.',
  },
  {
    id: 4,
    icon: <InfoHeart />,
    title: 'Бесконечное веселье',
    text: 'Легко в учении - тяжело в бою. Впереди целая бесконечность',
  },
]

const playConfig = [
  {
    id: 1,
    title: 'Нажмите, чтобы взлететь',
    text: 'Нажмите или коснитесь экрана, чтобы ваша птица взмахнула крыльями и набрала высоту. Чем дольше вы будете удерживать ее, тем выше подниметесь.',
  },
  {
    id: 2,
    title: 'Перемещение по трубам',
    text: 'Избегайте попадающихся на вашем пути зеленых труб. Каждый успешный проход по трубе приносит вам одно очко.',
  },
  {
    id: 3,
    title: 'Соревнуйтесь и побеждайте',
    text: 'Испытайте себя, чтобы побить свой рекорд и занять место в глобальной таблице лидеров. Чем больше вы наберете очков, тем больше славы!',
  },
]

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div
          className={classNames(
            styles.section,
            styles.heroLeft,
            styles.bgWhite
          )}>
          <div className={styles.heroLeftIcon}>🐦</div>
          <div className={styles.heroLeftTitle}>Готовы к полету?</div>
          <p className={styles.heroLeftSubtitle}>
            Присоединяйтесь к миллионам игроков в захватывающем испытании полета
          </p>
        </div>
        <div className={styles.heroRight}>
          <h1 className={styles.heroRightTitle}>
            Добро пожаловать в{' '}
            <span className={styles.colorYellow}>Flappy&nbsp;Bird</span>
          </h1>
          <p className={styles.heroRightSubtitle}>
            Испытайте самую захватывающую летающую игру из когда-либо созданных.
            Проведите своего пернатого друга по бесконечному потоку труб,
            проверьте свои рефлексы и соревнуйтесь с игроками по всему миру.
          </p>

          <ActionsBlock />

          <p className={styles.heroRightNote}>
            ✨ Скачивать не требуется • Играйте мгновенно • Играйте бесплатно
          </p>
        </div>
      </section>

      <section className={classNames(styles.section, styles.bgWhite)}>
        <h2 className={styles.sectionTitle}>Зачем играть в Flappy Bird?</h2>
        <div className={classNames(styles.sectionWrap, styles.infoWrap4Col)}>
          {infoConfig.map(item => (
            <div key={item.id} className={styles.infoBlock}>
              <div className={styles.infoBlockIcon}>{item.icon}</div>
              <h3 className={styles.infoBlockTitle}>{item.title}</h3>
              <p className={styles.infoBlockText}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={classNames(styles.section, styles.bgWhite)}>
        <h2 className={styles.sectionTitle}>Как играть?</h2>
        <div className={classNames(styles.sectionWrap, styles.infoWrap3Col)}>
          {playConfig.map(item => (
            <div key={item.id} className={styles.playBlock}>
              <div className={styles.infoBlockNum}>{item.id}</div>
              <h3 className={styles.infoBlockTitle}>{item.title}</h3>
              <p className={styles.infoBlockText}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={classNames(styles.section, styles.bgGradient)}>
        <h2 className={styles.sectionTitle}>Готовы к полету?</h2>
        <div className={styles.offerWrap}>
          <p className={styles.offerText}>
            Присоединяйтесь к тысячам игроков прямо сейчас и станьте чемпионом
            Flappy Bird. Создайте свой аккаунт, чтобы начать играть, отслеживать
            свою статистику и подниматься в таблице лидеров.
          </p>
          <ActionsBlock />
        </div>
      </section>
    </div>
  )
}

export default Home
