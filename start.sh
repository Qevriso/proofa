#!/bin/bash

# Простой скрипт для запуска Kimai в режиме разработки

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Запуск Kimai Development Environment...${NC}\n"

# Установка переменных окружения для macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    export USER_ID=$(id -u)
    export GROUP_ID=$(id -g)
fi

# Запуск контейнеров
docker-compose up -d

echo -e "\n${GREEN}✅ Все сервисы Kimai запущены!${NC}\n"

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    ДОСТУПНЫЕ СЕРВИСЫ                          ║${NC}"
echo -e "${BLUE}╠═══════════════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║ 🌐 Kimai (основное приложение):                               ║${NC}"
echo -e "${BLUE}║    ${YELLOW}http://localhost:8083${NC}${BLUE}                                      ║${NC}"
echo -e "${BLUE}║                                                               ║${NC}"
echo -e "${BLUE}║ 📧 MailHog (тестирование email):                              ║${NC}"
echo -e "${BLUE}║    ${YELLOW}http://localhost:8025${NC}${BLUE}                                      ║${NC}"
echo -e "${BLUE}║                                                               ║${NC}"
echo -e "${BLUE}║ 🗄️  phpMyAdmin (управление БД):                                ║${NC}"
echo -e "${BLUE}║    ${YELLOW}http://localhost:8082${NC}${BLUE}                                      ║${NC}"
echo -e "${BLUE}║                                                               ║${NC}"
echo -e "${BLUE}║ ⚡ Webpack Dev Server (hot-reload):                           ║${NC}"
echo -e "${BLUE}║    ${YELLOW}http://localhost:8081${NC}${BLUE}                                      ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${GREEN}🔑 Логин: ${YELLOW}admin${NC} / ${GREEN}Пароль: ${YELLOW}admin${NC}"
echo -e "${GREEN}Приятной разработки! 🚀${NC}"
