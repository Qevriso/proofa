#!/bin/bash

# Скрипт для полной очистки и сброса Kimai окружения

set -e

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${RED}"
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                        ВНИМАНИЕ!                                 ║"
echo "║          Этот скрипт полностью очистит Kimai окружение           ║"
echo "║       Все данные, контейнеры и образы будут удалены!            ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Запрос подтверждения
read -p "Вы уверены, что хотите продолжить? [y/N]: " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Операция отменена${NC}"
    exit 0
fi

echo -e "\n${YELLOW}🧹 Начинаем полную очистку...${NC}\n"

# Остановка всех контейнеров
echo -e "${BLUE}1. Остановка контейнеров...${NC}"
docker-compose down -v --remove-orphans 2>/dev/null || true

# Удаление всех образов проекта
echo -e "${BLUE}2. Удаление образов...${NC}"
docker-compose down --rmi all 2>/dev/null || true

# Удаление volumes
echo -e "${BLUE}3. Удаление volumes...${NC}"
docker volume prune -f 2>/dev/null || true

# Удаление неиспользуемых контейнеров
echo -e "${BLUE}4. Очистка неиспользуемых контейнеров...${NC}"
docker container prune -f 2>/dev/null || true

# Удаление неиспользуемых образов
echo -e "${BLUE}5. Очистка неиспользуемых образов...${NC}"
docker image prune -f 2>/dev/null || true

# Удаление сети
echo -e "${BLUE}6. Очистка сетей...${NC}"
docker network prune -f 2>/dev/null || true

# Очистка локальных файлов разработки (опционально)
echo -e "${BLUE}7. Очистка локальных файлов...${NC}"
rm -rf vendor/ 2>/dev/null || true
rm -rf node_modules/ 2>/dev/null || true
rm -rf var/cache/* 2>/dev/null || true
rm -rf var/log/* 2>/dev/null || true

echo -e "\n${GREEN}✅ Очистка завершена!${NC}"
echo -e "${YELLOW}Теперь можете запустить: ./setup-dev.sh${NC}"
