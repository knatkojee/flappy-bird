ARG NODE_VERSION=20.19.0
ARG SERVER_PORT=3001
ARG CLIENT_PORT=3000

FROM node:${NODE_VERSION}-bookworm as builder
WORKDIR /app

COPY package.json yarn.lock lerna.json ./
COPY packages/client/package.json ./packages/client/
COPY packages/server/package.json ./packages/server/
COPY shared/package.json ./shared/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build --scope=client

FROM node:${NODE_VERSION}-bookworm-slim as client

WORKDIR /app


COPY --from=builder /app/packages/client ./packages/client
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/package.json /app/yarn.lock /app/lerna.json ./
COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/packages/client

ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}

EXPOSE ${CLIENT_PORT}

CMD ["yarn", "preview", "--host", "--port", "3000"]


FROM node:${NODE_VERSION}-bookworm-slim as server

WORKDIR /app

COPY --from=builder /app /app

RUN yarn install --frozen-lockfile

RUN yarn global add ts-node typescript

ARG SERVER_PORT
ENV SERVER_PORT=${SERVER_PORT}
ENV NODE_ENV=production

EXPOSE ${SERVER_PORT}

CMD ["sh", "-c", "cd packages/server && yarn preview"]
