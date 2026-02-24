## Структура проекта

Проект построен на архитектуре **monorepo** с использованием [lerna](https://github.com/lerna/lerna):

```
flappy-bird/
├── packages/
│   ├── client/          # React SPA (Vite) - порт 3000
│   └── server/          # Express SSR сервер - порт 3001
└── shared/              # Общий код (Redux store, API, типы, SSR рендеринг)
```

### Компоненты системы

- **Client (порт 3000)** - клиентское приложение на React с Vite dev server
- **Server (порт 3001)** - Express сервер с Server-Side Rendering (SSR)
- **Shared** - общая библиотека с Redux store, API методами, типами и утилитами для SSR

## Как запускать?

### Первоначальная настройка

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. После изменений в `shared` модуле выполните `cd shared && yarn build`
4. Запустите PostgreSQL: `docker-compose up -d postgres`
5. Создайте таблицы: `docker-compose exec -T postgres psql -U postgres -d postgres < packages/server/migrations/seed-users.sql`

### Режимы запуска

**Запуск всего (клиент + SSR сервер):**

```bash
yarn dev
```

**Только клиент (SPA режим):**

```bash
yarn dev --scope=client
# или
yarn dev:client
```

Доступен на http://localhost:3000

**Только SSR сервер:**

```bash
yarn dev --scope=server
# или
yarn dev:server
```

Доступен на http://localhost:3001

### Важно

- В dev режиме клиент и SSR сервер работают **независимо** друг от друга
- Клиент использует `createRoot` (обычный SPA)
- SSR сервер использует `renderToString` для серверного рендеринга
- Оба используют общий код из `shared` (Redux store, API, компоненты)

## Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

## Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

## Линтинг

`yarn lint`

## Форматирование prettier

`yarn format`

## Production build

`yarn build`

И чтобы посмотреть что получилось:

**Запуск обоих серверов:**

```bash
yarn preview
```

- 📦 Client (SPA): http://localhost:4173
- 🚀 Server (SSR): http://localhost:3001

**Запуск отдельно:**

```bash
yarn preview:client  # Только клиент на порту 4173
yarn preview:server  # Только SSR сервер на порту 3001
```

Для остановки нажмите `Ctrl+C`

## Скрипты проверки TypeScript и сборки

В проекте доступны два скрипта для проверки TypeScript и сборки всех частей приложения (client, server, shared).

### Скрипты

#### 1. `check-types.sh` - Проверка TypeScript

Выполняет проверку типов TypeScript во всех частях приложения без сборки.

**Использование:**

```bash
yarn check:types
```

**Или напрямую:**

```bash
./scripts/check-types.sh
```

**Что проверяется:**

- `shared` - TypeScript проверка
- `packages/client` - TypeScript проверка
- `packages/server` - TypeScript проверка

---

#### 2. `check-build-all.sh` - Полная проверка и сборка

Выполняет проверку типов TypeScript и полную сборку всех частей приложения.

**Использование:**

```bash
yarn check:all
```

**Или напрямую:**

```bash
./scripts/check-build-all.sh
```

**Что проверяется:**

- `shared` - TypeScript проверка
- `packages/client` - TypeScript проверка + сборка (Vite build)
- `packages/server` - TypeScript проверка + сборка (tsc)

---

### Результаты выполнения

Скрипты используют цветовой вывод для наглядности:

- 🟢 **Зелёный** - проверка успешно пройдена
- 🔴 **Красный** - обнаружены ошибки

При наличии ошибок скрипт завершается с кодом выхода `1`, что позволяет использовать его в CI/CD пайплайнах.

### Когда использовать

- `check:types` - для быстрой проверки типов во время разработки
- `check:all` - перед коммитом или деплоем, чтобы убедиться, что всё собирается корректно
- `check:production` - полная проверка включая тесты и запуск production сборки

### CI/CD

Эти скрипты можно использовать в GitHub Actions или других CI/CD системах:

```yaml
- name: Check TypeScript and build
  run: yarn check:all
```

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify`

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

---

## Theme API

API для управления цветовыми темами пользователей (`light` / `dark`).

### Быстрая проверка

```bash
curl -X GET "http://localhost:3001/api/user/theme" \
  -H "X-User-Id: 1"
```

### Endpoints

- `GET /api/user/theme` - получить тему пользователя
- `PUT /api/user/theme` - установить тему (body: `{"theme": "dark"}`)

## Архитектура и соглашения

### Соглашения

- Используем `type` вместо `interface`
- Компоненты без `React.FC`, типизируем параметры напрямую:
  ```typescript
  const Button = ({ variant, children }: ButtonProps) => {}
  ```
- Типы компонентов именуются с суффиксом `Props` и находятся в том же файле
- Файлы компонентов в PascalCase: `Button/Button.tsx`
- Экспорт компонентов через `index.ts`
- Для конкатенации CSS-классов используем библиотеку `classnames`:

  ```typescript
  import classNames from 'classnames'

  const classes = classNames(
    styles.button,
    styles[variant],
    { [styles.active]: isActive },
    className
  )
  ```

- Импорты через алиас `@/` для `src/`:
  ```typescript
  import { Button } from '@/components'
  import { ROUTES } from '@/constants/routes'
  ```

## Видео с демонстрацией работоспособности приложения

https://disk.yandex.ru/i/7-t-BzVqmoBBDw
