# Kimai - Руководство по локальной разработке

## Быстрый старт

### Первоначальная установка

Для первого развертывания проекта выполните:

```bash
./setup-dev.sh
```

Этот скрипт автоматически:
- ✅ Проверит системные требования (Docker, Docker Compose)
- ✅ Настроит переменные окружения для вашей ОС
- ✅ Соберет и запустит все Docker контейнеры
- ✅ Установит PHP и Node.js зависимости
- ✅ Создаст и настроит базу данных
- ✅ Применит все миграции
- ✅ Создаст администратора (admin/admin)
- ✅ Покажет информацию о доступе к приложению

### Ежедневная работа

После первоначальной установки используйте эти команды:

```bash
# Запуск всех сервисов
./start.sh

# Остановка всех сервисов
./stop.sh

# Проверка статуса сервисов
./status.sh

# Полная очистка окружения (в случае проблем)
./reset.sh
```

## Доступные сервисы

| Сервис | URL | Порт | Описание |
|--------|-----|------|----------|
| 🌐 **Kimai** | http://localhost:8083 | 8083 | Основное приложение времени-трекинга |
| 📧 **MailHog** | http://localhost:8025 | 8025 | Тестирование email (SMTP: 1025) |
| 🗄️ **phpMyAdmin** | http://localhost:8082 | 8082 | Управление базой данных MySQL |
| ⚡ **Webpack Dev** | http://localhost:8081 | 8081 | Hot-reload и сборка frontend |
| 🐬 **MySQL** | localhost:3307 | 3307 | Прямое подключение к БД |
| 🔴 **Redis** | localhost:6379 | 6379 | Кэш и сессии |

## Данные для входа

### Kimai
- **Логин:** admin
- **Пароль:** admin

### База данных (phpMyAdmin)
- **Хост:** localhost:3307
- **Логин:** kimai  
- **Пароль:** kimai
- **База данных:** kimai

## Полезные команды

### Docker
```bash
# Просмотр логов
docker-compose logs -f

# Подключение к PHP контейнеру
docker-compose exec php sh

# Подключение к MySQL
docker-compose exec mysql mysql -u kimai -pkimai kimai

# Перезапуск конкретного сервиса
docker-compose restart php
```

### Symfony/PHP
```bash
# Очистка кэша
docker-compose exec php php bin/console cache:clear

# Выполнение миграций
docker-compose exec php php bin/console doctrine:migrations:migrate

# Создание пользователя
docker-compose exec php php bin/console kimai:create-user <username> <email> <role>

# Запуск тестов
docker-compose exec php composer tests
```

### Frontend
```bash
# Сборка для разработки
docker-compose exec webpack yarn dev

# Сборка для продакшена
docker-compose exec webpack yarn build

# Проверка линтера
docker-compose exec webpack yarn lint
```

## Структура проекта

```
Proofa/
├── setup-dev.sh      # Первоначальная установка
├── start.sh          # Быстрый запуск
├── stop.sh           # Остановка сервисов
├── status.sh         # Проверка статуса
├── reset.sh          # Полная очистка окружения
├── docker-compose.yml # Конфигурация Docker
├── Dockerfile.dev     # PHP контейнер для разработки
├── Makefile          # Дополнительные команды
└── DEVELOPMENT.md    # Этот файл
```

## Решение проблем

### Ошибка создания пользователя в Docker (macOS)
Если возникает ошибка `addgroup: gid '20' in use`:

```bash
# Полная очистка и пересборка
./reset.sh
./setup-dev.sh
```

Эта ошибка исправлена в новой версии Dockerfile.dev, который автоматически обрабатывает конфликты с существующими группами на macOS.

### Контейнеры не запускаются
```bash
# Проверить статус
./status.sh

# Посмотреть логи
docker-compose logs

# Пересобрать образы
docker-compose build --no-cache
```

### База данных недоступна
```bash
# Перезапустить MySQL
docker-compose restart mysql

# Проверить healthcheck
docker-compose ps
```

### Проблемы с правами доступа (macOS)
```bash
# Переустановить с правильными правами
./setup-dev.sh
```

### Общие проблемы со сборкой
```bash
# Полная очистка всех данных и образов
./reset.sh

# Пересборка с нуля
./setup-dev.sh
```

### Медленная работа на macOS
Убедитесь, что:
- Docker Desktop имеет достаточно ресурсов (4GB+ RAM)
- Используется latest версия Docker Desktop
- В настройках Docker включен VirtioFS (File sharing implementation)

## Производительность

### Для macOS пользователей
- Используется `cached` режим для volume mount
- Отдельные volumes для `vendor/` и `node_modules/`
- Оптимизирован Dockerfile для быстрой сборки

### Мониторинг ресурсов
```bash
# Использование ресурсов контейнерами
docker stats

# Использование дискового пространства
docker system df
```

## Дополнительная информация

- [Официальная документация Kimai](https://www.kimai.org/documentation/)
- [Symfony документация](https://symfony.com/doc/current/index.html)
- [Docker Compose документация](https://docs.docker.com/compose/)

---

**Удачной разработки! 🚀**
