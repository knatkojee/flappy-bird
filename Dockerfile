# Аргументы сборки
ARG NODE_VERSION=20.19.0
ARG SERVER_PORT=3001
ARG CLIENT_PORT=3000

# ============================================
# Базовый образ для сборки клиента
FROM node:${NODE_VERSION}-bookworm as builder
WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package.json yarn.lock lerna.json ./
COPY packages/client/package.json ./packages/client/
COPY packages/server/package.json ./packages/server/
COPY shared/package.json ./shared/

# Устанавливаем все зависимости
RUN yarn install --frozen-lockfile

# Копируем весь исходный код
COPY . .

# Собираем клиент (для статики)
RUN yarn build --scope=client

# Финальный образ для клиента (vite preview)
FROM node:${NODE_VERSION}-bookworm-slim as client

WORKDIR /app

# Копируем все необходимое из билдера
COPY --from=builder /app/packages/client ./packages/client
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/package.json /app/yarn.lock /app/lerna.json ./
COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/packages/client

# Устанавливаем переменные окружения
ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}

EXPOSE ${CLIENT_PORT}

# Запускаем preview
CMD ["yarn", "preview", "--host", "--port", "3000"]

# ============================================
# Финальный образ для сервера
FROM node:${NODE_VERSION}-bookworm-slim as server

WORKDIR /app

# Копируем ВСЁ из билдера (весь проект)
COPY --from=builder /app /app

# Устанавливаем только production зависимости (но без --production, чтобы devDependencies тоже были)
RUN yarn install --frozen-lockfile

# Устанавливаем ts-node и typescript глобально (на всякий случай)
RUN yarn global add ts-node typescript

# Устанавливаем переменные окружения
ARG SERVER_PORT
ENV SERVER_PORT=${SERVER_PORT}
ENV NODE_ENV=production

EXPOSE ${SERVER_PORT}

# Запускаем preview из папки сервера
CMD ["sh", "-c", "cd packages/server && yarn preview"]
