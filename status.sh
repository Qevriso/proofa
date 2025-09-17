#!/bin/bash

# Скрипт для проверки статуса сервисов Kimai

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📊 Статус Kimai Development Environment${NC}\n"

# Проверка статуса контейнеров
if docker-compose ps -q | grep -q .; then
    echo -e "${GREEN}🟢 Статус контейнеров:${NC}"
    docker-compose ps
    
    echo -e "\n${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                  СТАТУС СЕРВИСОВ                              ║${NC}"
    echo -e "${BLUE}╠═══════════════════════════════════════════════════════════════╣${NC}"
    
    # Проверка доступности сервисов
    if curl -s http://localhost:8083 > /dev/null; then
        echo -e "${BLUE}║ 🌐 Kimai:           ${GREEN}http://localhost:8083 ✓${NC}${BLUE}                 ║${NC}"
    else
        echo -e "${BLUE}║ 🌐 Kimai:           ${RED}http://localhost:8083 ✗${NC}${BLUE}                 ║${NC}"
    fi
    
    echo -e "${BLUE}║                                                               ║${NC}"
    
    if curl -s http://localhost:8025 > /dev/null; then
        echo -e "${BLUE}║ 📧 MailHog:         ${GREEN}http://localhost:8025 ✓${NC}${BLUE}                 ║${NC}"
    else
        echo -e "${BLUE}║ 📧 MailHog:         ${RED}http://localhost:8025 ✗${NC}${BLUE}                 ║${NC}"
    fi
    
    echo -e "${BLUE}║                                                               ║${NC}"
    
    if curl -s http://localhost:8082 > /dev/null; then
        echo -e "${BLUE}║ 🗄️  phpMyAdmin:     ${GREEN}http://localhost:8082 ✓${NC}${BLUE}                 ║${NC}"
    else
        echo -e "${BLUE}║ 🗄️  phpMyAdmin:     ${RED}http://localhost:8082 ✗${NC}${BLUE}                 ║${NC}"
    fi
    
    echo -e "${BLUE}║                                                               ║${NC}"
    
    # Webpack dev server обычно не отвечает на curl, просто показываем порт
    echo -e "${BLUE}║ ⚡ Webpack Dev:     ${YELLOW}http://localhost:8081${NC}${BLUE}                    ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
    
    echo -e "\n${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                     ДАННЫЕ ДЛЯ ВХОДА                          ║${NC}"
    echo -e "${GREEN}╠═══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║ 🔑 Kimai: ${YELLOW}admin${NC}${GREEN} / ${YELLOW}admin${NC}${GREEN}                                       ║${NC}"
    echo -e "${GREEN}║ 🗄️ База данных: ${YELLOW}kimai${NC}${GREEN} / ${YELLOW}kimai${NC}${GREEN} на ${YELLOW}localhost:3307${NC}${GREEN}        ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    
    echo -e "\n${BLUE}💾 Использование дискового пространства:${NC}"
    docker system df
    
else
    echo -e "${RED}❌ Kimai не запущен${NC}"
    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                 ДОСТУПНЫЕ КОМАНДЫ                             ║${NC}"
    echo -e "${BLUE}╠═══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${BLUE}║ Запустить:       ${GREEN}./start.sh${NC}${BLUE}                                    ║${NC}"
    echo -e "${BLUE}║ Первая установка: ${GREEN}./setup-dev.sh${NC}${BLUE}                              ║${NC}"
    echo -e "${BLUE}║ Полная очистка:   ${GREEN}./reset.sh${NC}${BLUE}                                  ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
fi
