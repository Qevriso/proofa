#!/bin/bash

# Простой скрипт для остановки Kimai

set -e

RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🛑 Остановка Kimai Development Environment...${NC}\n"

# Остановка контейнеров
docker-compose down

echo -e "\n${RED}✓ Все сервисы остановлены${NC}"
