import React from 'react'
import { useSelector } from 'react-redux'

/**
 * Компонент для отображения состояния гидратации
 * Показывает данные, полученные с сервера
 */
const HydrationTest: React.FC = () => {
  const authState = useSelector((state: any) => state.auth)

  return (
    <div>
      <h3>Тест гидратации</h3>

      <div>
        <b>Источник данных:</b>
        {typeof window !== 'undefined' && (window as any).__INITIAL_STATE__
          ? 'Сервер'
          : 'Клиент'}
      </div>

      <div>
        <b>Статус авторизации:</b>
        {authState?.isAuthenticated ? 'Авторизован' : 'Не авторизован'}
      </div>

      {authState?.user && (
        <div>
          <b>Пользователь:</b>
          <div>
            <div>
              Имя: {authState.user.first_name} {authState.user.second_name}
            </div>
            <div>Логин: {authState.user.login}</div>
            <div>Email: {authState.user.email}</div>
          </div>
        </div>
      )}

      <div>
        <b>Состояние загрузки:</b>
        {authState?.isLoading ? '⏳ Загружается' : '✅ Готово'}
      </div>

      <h3>Полное состояние Redux</h3>
      {JSON.stringify(authState, null, 2)}
    </div>
  )
}

export default HydrationTest
