#!/bin/bash

set -e  # Остановить выполнение при ошибке

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода заголовков
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

# Функция для вывода успешных сообщений
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Функция для вывода предупреждений
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Функция для вывода ошибок
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Проверка системных требований
check_requirements() {
    print_header "Проверка системных требований"
    
    # Проверка Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker не установлен. Пожалуйста, установите Docker Desktop."
        echo "Скачать можно здесь: https://www.docker.com/products/docker-desktop"
        exit 1
    else
        print_success "Docker установлен: $(docker --version)"
    fi
    
    # Проверка Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose не установлен."
        exit 1
    else
        print_success "Docker Compose установлен: $(docker-compose --version)"
    fi
    
    # Проверка, что Docker запущен
    if ! docker info &> /dev/null; then
        print_error "Docker не запущен. Пожалуйста, запустите Docker Desktop."
        exit 1
    else
        print_success "Docker запущен и готов к работе"
    fi
}

# Настройка переменных окружения
setup_environment() {
    print_header "Настройка переменных окружения"
    
    # Определение USER_ID и GROUP_ID для совместимости с macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        export USER_ID=$(id -u)
        export GROUP_ID=$(id -g)
        print_success "Настроены переменные для macOS: USER_ID=$USER_ID, GROUP_ID=$GROUP_ID"
    else
        export USER_ID=1000
        export GROUP_ID=1000
        print_success "Настроены переменные для Linux: USER_ID=$USER_ID, GROUP_ID=$GROUP_ID"
    fi
}

# Остановка существующих контейнеров и очистка
stop_existing_containers() {
    print_header "Остановка существующих контейнеров и очистка"
    
    if docker-compose ps -q | grep -q .; then
        print_warning "Обнаружены запущенные контейнеры. Останавливаем..."
        docker-compose down
        print_success "Контейнеры остановлены"
    else
        print_success "Запущенных контейнеров не найдено"
    fi
    
    # Удаление старых образов для принудительной пересборки
    print_warning "Очистка старых образов для избежания конфликтов..."
    docker-compose down --rmi local 2>/dev/null || true
    
    # Очистка проблемных контейнеров
    docker container prune -f 2>/dev/null || true
    
    print_success "Очистка завершена"
}

# Сборка и запуск Docker контейнеров
setup_docker() {
    print_header "Сборка и запуск Docker контейнеров"
    
    print_warning "Сборка Docker образов (это может занять несколько минут)..."
    if ! docker-compose build --no-cache; then
        DOCKER_ERROR=1
        print_error "Ошибка при сборке Docker образов"
        cleanup
        exit 1
    fi
    print_success "Docker образы собраны"
    
    print_warning "Запуск контейнеров..."
    if ! docker-compose up -d; then
        DOCKER_ERROR=1
        print_error "Ошибка при запуске контейнеров"
        cleanup
        exit 1
    fi
    print_success "Контейнеры запущены"
    
    # Ожидание готовности сервисов
    print_warning "Ожидание готовности сервисов..."
    sleep 30
    
    # Проверка статуса контейнеров
    if docker-compose ps | grep -q "Up"; then
        print_success "Все сервисы запущены успешно"
    else
        print_error "Некоторые сервисы не запустились. Проверьте логи: docker-compose logs"
        exit 1
    fi
}

# Установка зависимостей
install_dependencies() {
    print_header "Установка зависимостей"
    
    print_warning "Установка PHP зависимостей через Composer..."
    docker-compose exec -T php composer install --no-interaction --optimize-autoloader
    print_success "PHP зависимости установлены"
    
    print_warning "Установка Node.js зависимостей через Yarn..."
    # Yarn уже запускается автоматически в webpack контейнере, но убедимся
    docker-compose exec -T webpack sh -c "corepack enable && yarn install"
    print_success "Node.js зависимости установлены"
}

# Настройка базы данных
setup_database() {
    print_header "Настройка базы данных"
    
    print_warning "Ожидание готовности MySQL..."
    # Дополнительное ожидание для MySQL
    sleep 15
    
    print_warning "Создание базы данных..."
    docker-compose exec -T php php bin/console doctrine:database:create --if-not-exists --no-interaction
    print_success "База данных создана"
    
    print_warning "Применение миграций..."
    docker-compose exec -T php php bin/console doctrine:migrations:migrate --no-interaction
    print_success "Миграции применены"
    
    print_warning "Очистка кэша..."
    docker-compose exec -T php php bin/console cache:clear --no-interaction
    print_success "Кэш очищен"
}

# Создание пользователя-администратора
create_admin_user() {
    print_header "Создание пользователя-администратора"
    
    echo -e "${YELLOW}Создается пользователь-администратор...${NC}"
    echo "Логин: admin"
    echo "Email: admin@localhost.dev"
    echo "Пароль: admin"
    
    # Создание админ пользователя
    docker-compose exec -T php php bin/console kimai:create-user admin admin@localhost.dev ROLE_SUPER_ADMIN --password=admin --no-interaction 2>/dev/null || {
        print_warning "Пользователь admin уже существует или произошла ошибка при создании"
    }
    
    print_success "Администратор настроен: admin / admin"
}

# Отображение информации о доступе
display_access_info() {
    print_header "Информация о доступе к приложению"
    
    echo -e "${GREEN}🎉 Kimai успешно развернут для локальной разработки!${NC}\n"
    
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
    echo ""
    
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                     ДАННЫЕ ДЛЯ ВХОДА                          ║${NC}"
    echo -e "${GREEN}╠═══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║ 🔑 Kimai Admin:                                              ║${NC}"
    echo -e "${GREEN}║    Логин:    ${YELLOW}admin${NC}${GREEN}                                          ║${NC}"
    echo -e "${GREEN}║    Пароль:   ${YELLOW}admin${NC}${GREEN}                                          ║${NC}"
    echo -e "${GREEN}║                                                               ║${NC}"
    echo -e "${GREEN}║ 🗄️ База данных (MySQL):                                       ║${NC}"
    echo -e "${GREEN}║    Хост:     ${YELLOW}localhost:3307${NC}${GREEN}                                 ║${NC}"
    echo -e "${GREEN}║    Логин:    ${YELLOW}kimai${NC}${GREEN}                                          ║${NC}"
    echo -e "${GREEN}║    Пароль:   ${YELLOW}kimai${NC}${GREEN}                                          ║${NC}"
    echo -e "${GREEN}║    БД:       ${YELLOW}kimai${NC}${GREEN}                                          ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    echo -e "${YELLOW}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║                    ПОЛЕЗНЫЕ КОМАНДЫ                           ║${NC}"
    echo -e "${YELLOW}╠═══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${YELLOW}║ Остановить сервисы:                                          ║${NC}"
    echo -e "${YELLOW}║   ${GREEN}./stop.sh${NC}${YELLOW} или ${GREEN}docker-compose down${NC}${YELLOW}                      ║${NC}"
    echo -e "${YELLOW}║                                                               ║${NC}"
    echo -e "${YELLOW}║ Запустить сервисы:                                           ║${NC}"
    echo -e "${YELLOW}║   ${GREEN}./start.sh${NC}${YELLOW} или ${GREEN}docker-compose up -d${NC}${YELLOW}                    ║${NC}"
    echo -e "${YELLOW}║                                                               ║${NC}"
    echo -e "${YELLOW}║ Проверить статус:                                            ║${NC}"
    echo -e "${YELLOW}║   ${GREEN}./status.sh${NC}${YELLOW}                                              ║${NC}"
    echo -e "${YELLOW}║                                                               ║${NC}"
    echo -e "${YELLOW}║ Посмотреть логи:                                             ║${NC}"
    echo -e "${YELLOW}║   ${GREEN}docker-compose logs -f${NC}${YELLOW}                                  ║${NC}"
    echo -e "${YELLOW}║                                                               ║${NC}"
    echo -e "${YELLOW}║ Консоль PHP:                                                 ║${NC}"
    echo -e "${YELLOW}║   ${GREEN}docker-compose exec php sh${NC}${YELLOW}                              ║${NC}"
    echo -e "${YELLOW}║                                                               ║${NC}"
    echo -e "${YELLOW}║ Полная очистка (при проблемах):                              ║${NC}"
    echo -e "${YELLOW}║   ${GREEN}./reset.sh${NC}${YELLOW}                                               ║${NC}"
    echo -e "${YELLOW}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    echo -e "${GREEN}Приятной разработки! 🚀${NC}"
}

# Функция для диагностики проблем
diagnose_error() {
    print_header "Диагностика проблемы"
    
    echo -e "${YELLOW}Информация о системе:${NC}"
    echo "OS: $(uname -s)"
    echo "USER_ID: ${USER_ID}"
    echo "GROUP_ID: ${GROUP_ID}"
    
    echo -e "\n${YELLOW}Проверка Docker:${NC}"
    docker --version
    docker-compose --version
    
    echo -e "\n${YELLOW}Статус контейнеров:${NC}"
    docker-compose ps
    
    echo -e "\n${YELLOW}Логи последней ошибки:${NC}"
    docker-compose logs --tail=20
    
    echo -e "\n${YELLOW}Для решения проблемы попробуйте:${NC}"
    echo "1. Полная очистка: docker-compose down -v --rmi all"
    echo "2. Повторный запуск: ./setup-dev.sh"
    echo "3. Просмотр полных логов: docker-compose logs"
}

# Функция для обработки прерывания и ошибок
cleanup() {
    echo -e "\n${YELLOW}Получен сигнал прерывания или произошла ошибка.${NC}"
    
    # Показать диагностику только если возникла ошибка во время выполнения Docker команд
    if [[ -n "${DOCKER_ERROR}" ]]; then
        diagnose_error
    fi
    
    exit 1
}

# Установка обработчика сигналов
trap cleanup SIGINT SIGTERM

# Основная функция
main() {
    clear
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════════╗"
    echo "║                    KIMAI DEVELOPMENT SETUP                       ║"
    echo "║              Скрипт для локального развертывания                 ║"
    echo "╚══════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    check_requirements
    setup_environment
    stop_existing_containers
    setup_docker
    install_dependencies
    setup_database
    create_admin_user
    display_access_info
}

# Запуск основной функции
main "$@"
