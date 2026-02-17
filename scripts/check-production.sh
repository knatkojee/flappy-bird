#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Полная проверка проекта (включая production)"
echo "Рабочая директория: $(pwd)"
echo "=================================================="
echo ""

# Функция для проверки успешности команды
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 успешно${NC}"
        return 0
    else
        echo -e "${RED}✗ $1 провалено${NC}"
        exit 1
    fi
}

# 1. Проверка типов и сборка (через check:all)
echo -e "${YELLOW}▶ Проверка TypeScript и сборка...${NC}"
yarn check:all > /dev/null 2>&1
check_status "TypeScript и сборка"
echo ""

# 2. Тесты
echo -e "${YELLOW}▶ Запуск тестов...${NC}"
yarn test > /dev/null 2>&1
check_status "Тесты"
echo ""

# 3. Проверка production сервера
echo -e "${YELLOW}▶ Проверка production сервера...${NC}"

# Запуск сервера в фоне
yarn preview --scope=server > /dev/null 2>&1 &
SERVER_PID=$!

# Ждем запуска сервера (увеличено время)
sleep 8

# Проверка API
API_RESPONSE=$(curl -s http://localhost:3001/api/health)
if echo "$API_RESPONSE" | grep -q "Flappy Bird API Server"; then
    echo -e "${GREEN}  ✓ API работает${NC}"
else
    echo -e "${RED}  ✗ API не отвечает${NC}"
    kill $SERVER_PID 2>/dev/null
    pkill -f "register-paths" 2>/dev/null
    exit 1
fi

# Проверка SSR
SSR_RESPONSE=$(curl -s http://localhost:3001/)
if echo "$SSR_RESPONSE" | grep -q "<title>Flappy Bird"; then
    echo -e "${GREEN}  ✓ SSR рендеринг работает${NC}"
else
    echo -e "${RED}  ✗ SSR не работает${NC}"
    kill $SERVER_PID 2>/dev/null
    pkill -f "register-paths" 2>/dev/null
    exit 1
fi

# Останавливаем сервер
kill $SERVER_PID 2>/dev/null
pkill -f "register-paths" 2>/dev/null
sleep 1

check_status "Production сервер"
echo ""

echo "=================================================="
echo -e "${GREEN}✓ Все проверки успешно пройдены!${NC}"
echo "  - TypeScript типы: OK"
echo "  - Тесты: OK"
echo "  - Сборка: OK"
echo "  - Production сервер: OK"
echo "  - API: OK"
echo "  - SSR: OK"
