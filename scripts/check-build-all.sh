#!/bin/bash

# Скрипт для проверки TypeScript и сборки во всех частях приложения

# Получаем корневую директорию проекта (на уровень выше scripts)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🔍 Начинаю проверку TypeScript и сборку всех частей приложения..."
echo "Рабочая директория: $SCRIPT_DIR"
echo "=================================================="

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для выполнения команды в директории
run_check() {
    local dir=$1
    local name=$2
    local command=$3

    echo ""
    echo -e "${YELLOW}▶ Проверка ${name}...${NC}"
    echo "Директория: ${SCRIPT_DIR}/${dir}"
    echo "Команда: ${command}"
    
    if cd "${SCRIPT_DIR}/${dir}" && eval "$command"; then
        echo -e "${GREEN}✓ ${name} успешно проверен${NC}"
        return 0
    else
        echo -e "${RED}✗ Ошибка при проверке ${name}${NC}"
        return 1
    fi
}

# Переменная для отслеживания ошибок
HAS_ERRORS=0

# Проверка shared
echo ""
echo "📦 Проверка shared..."
if ! run_check "shared" "shared (TypeScript и сборка)" "tsc"; then
    HAS_ERRORS=1
fi

# Проверка client
echo ""
echo "📦 Проверка client..."
if ! run_check "packages/client" "client (TypeScript)" "tsc --noEmit"; then
    HAS_ERRORS=1
fi
if ! run_check "packages/client" "client (сборка)" "yarn build"; then
    HAS_ERRORS=1
fi

# Проверка server
echo ""
echo "📦 Проверка server..."
if ! run_check "packages/server" "server (TypeScript)" "tsc --noEmit"; then
    HAS_ERRORS=1
fi
if ! run_check "packages/server" "server (сборка)" "yarn build"; then
    HAS_ERRORS=1
fi

# Возврат в исходную директорию
cd "$SCRIPT_DIR" > /dev/null

echo ""
echo "=================================================="
if [ $HAS_ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ Все проверки успешно пройдены!${NC}"
    exit 0
else
    echo -e "${RED}✗ Обнаружены ошибки при проверке${NC}"
    exit 1
fi
