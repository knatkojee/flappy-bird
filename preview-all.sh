#!/bin/bash

# Цвета
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Запуск production серверов...${NC}"
echo ""

# Запуск клиента в фоне
echo -e "${GREEN}▶ Запуск клиента (vite preview)...${NC}"
(cd packages/client && yarn preview > /dev/null 2>&1) &
CLIENT_PID=$!

# Запуск сервера в фоне
echo -e "${GREEN}▶ Запуск SSR сервера...${NC}"
(cd packages/server && yarn preview > /dev/null 2>&1) &
SERVER_PID=$!

sleep 3

echo ""
echo -e "${GREEN}✓ Серверы запущены!${NC}"
echo ""
echo "  📦 Client (SPA):  http://localhost:4173"
echo "  🚀 Server (SSR):  http://localhost:3001"
echo ""
echo -e "${YELLOW}Для остановки нажмите Ctrl+C${NC}"
echo ""

# Ждем сигнала завершения
trap "echo ''; echo 'Останавливаю серверы...'; kill $CLIENT_PID $SERVER_PID 2>/dev/null; exit" INT TERM

# Держим скрипт запущенным
wait
