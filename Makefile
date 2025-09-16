# Kimai Development Makefile
# Команды для удобной работы с Docker окружением

.PHONY: help build up down restart logs shell composer yarn install

# Показать справку
help:
	@echo "Доступные команды:"
	@echo "  help       - Показать эту справку"
	@echo "  build      - Собрать Docker образы"
	@echo "  up         - Запустить все сервисы"
	@echo "  down       - Остановить все сервисы"
	@echo "  restart    - Перезапустить все сервисы"
	@echo "  logs       - Показать логи всех сервисов"
	@echo "  shell      - Подключиться к PHP контейнеру"
	@echo "  composer   - Выполнить команду composer"
	@echo "  yarn       - Выполнить команду yarn"
	@echo "  install    - Установить зависимости и настроить проект"
	@echo "  db-create  - Создать схему базы данных"
	@echo "  db-migrate - Применить миграции базы данных"
	@echo "  cache-clear - Очистить кэш Symfony"

# Собрать Docker образы
build:
	docker-compose build

# Запустить все сервисы
up:
	docker-compose up -d
	@echo "Сервисы запущены:"
	@echo "- Kimai: http://localhost:8083"
	@echo "- MailHog: http://localhost:8025"
	@echo "- phpMyAdmin: http://localhost:8082"
	@echo "- Webpack Dev Server: http://localhost:8081"

# Остановить все сервисы
down:
	docker-compose down

# Перезапустить все сервисы
restart: down up

# Показать логи всех сервисов
logs:
	docker-compose logs -f

# Подключиться к PHP контейнеру
shell:
	docker-compose exec php sh

# Выполнить команду composer
composer:
	docker-compose exec php composer $(ARGS)

# Выполнить команду yarn
yarn:
	docker-compose exec webpack yarn $(ARGS)

# Установить зависимости и настроить проект
install:
	@echo "Установка зависимостей PHP..."
	docker-compose exec php composer install
	@echo "Установка зависимостей Node.js..."
	docker-compose exec webpack yarn install
	@echo "Создание схемы базы данных..."
	make db-create
	@echo "Применение миграций..."
	make db-migrate
	@echo "Очистка кэша..."
	make cache-clear
	@echo "Установка завершена!"

# Создать схему базы данных
db-create:
	docker-compose exec php php bin/console doctrine:database:create --if-not-exists

# Применить миграции базы данных
db-migrate:
	docker-compose exec php php bin/console doctrine:migrations:migrate --no-interaction

# Очистить кэш Symfony
cache-clear:
	docker-compose exec php php bin/console cache:clear

# Сгенерировать ключи для двухфакторной аутентификации
generate-keys:
	docker-compose exec php php bin/console kimai:create-user admin admin@localhost.dev ROLE_SUPER_ADMIN

# Показать статус сервисов
status:
	docker-compose ps
