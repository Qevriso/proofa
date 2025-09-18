# 🚀 Генерация тестовых данных для Kimai

## 📋 Обзор

Данный гайд описывает процесс генерации реалистичных тестовых данных для новой среды разработки Kimai. Система генерирует полный набор данных, имитирующий реальную деятельность российской IT-компании.

## 🎯 Что будет создано

- **35 пользователей** с русскими ФИО и реалистичными email
- **8 клиентов** (российские компании с адресами)
- **37 проектов** с детальными описаниями
- **320+ активностей** с конкретными задачами
- **3 команды** с распределением участников
- **4,600+ записей времени** за последние 3 месяца
- **28+ счетов** с русскими банковскими реквизитами
- **Индивидуальные тарифы** для клиентов/проектов/активностей
- **30 профессиональных тегов** с привязкой к задачам

## ⚡ Быстрый старт

### 1. Запуск среды разработки
```bash
# Запуск Docker контейнеров
docker-compose up -d

# Проверка статуса
docker-compose ps
```

### 2. Полная генерация данных (с нуля)
```bash
# Сброс и создание базы данных
docker exec kimai-dev-php bin/console doctrine:database:drop --force --if-exists
docker exec kimai-dev-php bin/console doctrine:database:create
docker exec kimai-dev-php bin/console doctrine:migrations:migrate --no-interaction

# Генерация всех тестовых данных
docker exec kimai-dev-php php scripts/load_fixtures_manually.php

# Проверка результатов
docker exec kimai-dev-mysql mysql -u kimai -pkimai kimai -e "
SELECT 'Пользователи' as entity, COUNT(*) as count FROM kimai2_users
UNION ALL SELECT 'Проекты', COUNT(*) FROM kimai2_projects
UNION ALL SELECT 'Timesheet записи', COUNT(*) FROM kimai2_timesheet
UNION ALL SELECT 'Счета', COUNT(*) FROM kimai2_invoices;"
```

## 📚 Детальные команды

### 🔄 Сценарий 1: Полная очистка и генерация

```bash
# 1. Остановка и очистка
docker-compose down
docker volume rm proofa_mysql_data  # Удаление данных БД

# 2. Запуск системы
docker-compose up -d

# 3. Ожидание готовности MySQL (важно!)
sleep 30

# 4. Подготовка базы данных
docker exec kimai-dev-php bin/console doctrine:database:create
docker exec kimai-dev-php bin/console doctrine:migrations:migrate --no-interaction

# 5. Генерация данных
docker exec kimai-dev-php php scripts/load_fixtures_manually.php
```

### 🔧 Сценарий 2: Обновление данных (без удаления пользователей)

```bash
# Генерация новых данных с сохранением пользователей
docker exec kimai-dev-php php scripts/generate_new_data.php
```

### 👥 Сценарий 3: Расширение команды

```bash
# Добавление пользователей до 35 человек
docker exec kimai-dev-php php scripts/expand_users_to_30.php

# Обновление старых пользователей (если есть user_N)
docker exec kimai-dev-php php scripts/update_old_users.php
```

## 🛠️ Доступные скрипты

### `scripts/load_fixtures_manually.php`
**Назначение**: Полная генерация всех тестовых данных с нуля

**Что делает**:
- Очищает все таблицы данных
- Создает пользователей, клиентов, проекты, активности
- Генерирует команды и связи между сущностями  
- Создает записи времени за 3 месяца
- Формирует счета и тарифы
- Добавляет теги к задачам

**Время выполнения**: ~30-60 секунд

### `scripts/generate_new_data.php`
**Назначение**: Генерация новых данных с сохранением пользователей

**Что делает**:
- Сохраняет существующих пользователей
- Создает новые проекты, клиенты, активности
- Генерирует свежие записи времени
- Обновляет команды и связи

**Время выполнения**: ~20-40 секунд

### `scripts/expand_users_to_30.php`
**Назначение**: Расширение команды до 35 пользователей

**Что делает**:
- Добавляет новых пользователей с реалистичными данными
- Генерирует связанные данные (предпочтения, команды)
- Создает записи времени для новых сотрудников

**Время выполнения**: ~10-20 секунд

### `scripts/update_old_users.php`
**Назначение**: Обновление пользователей со старыми именами

**Что делает**:
- Находит пользователей с именами типа `user_N`
- Заменяет на реалистичные русские имена и email
- Назначает пользователей в команды

**Время выполнения**: ~5-10 секунд

## ✅ Проверка результатов

### Базовая проверка данных
```bash
docker exec kimai-dev-mysql mysql -u kimai -pkimai kimai -e "
SELECT '📊 ОБЗОР СИСТЕМЫ:' as info;
SELECT 
    'Пользователи' as entity, COUNT(*) as count,
    'Русские ФИО + email' as description
FROM kimai2_users
UNION ALL
SELECT 'Проекты', COUNT(*), 'С описаниями' FROM kimai2_projects  
UNION ALL
SELECT 'Timesheet', COUNT(*), 'За 3 месяца' FROM kimai2_timesheet
UNION ALL
SELECT 'Счета', COUNT(*), 'С реквизитами' FROM kimai2_invoices;"
```

### Проверка качества данных
```bash
docker exec kimai-dev-mysql mysql -u kimai -pkimai kimai -e "
SELECT '🏢 ПРИМЕРЫ КЛИЕНТОВ:' as info;
SELECT name, LEFT(address, 50) as address, phone 
FROM kimai2_customers LIMIT 3;

SELECT '👥 КОМАНДЫ:' as info;
SELECT t.name, COUNT(ut.user_id) as members
FROM kimai2_teams t 
LEFT JOIN kimai2_users_teams ut ON t.id = ut.team_id
GROUP BY t.id, t.name;"
```

### Проверка доступности системы
```bash
# Проверка веб-интерфейса
curl -I http://localhost:8083/

# Ожидаемый ответ: HTTP/1.1 200 OK
```

## 🎯 Логины для тестирования

### Администраторы
- **Логин**: `admin` / **Пароль**: `password`
- **Логин**: `anna` / **Пароль**: `kitten`  
- **Логин**: `john` / **Пароль**: `kitten`

### Обычные пользователи
Все сгенерированные пользователи используют пароль: `password`

Примеры username'ов:
- `emiliya.kudryashova`
- `savva.sergeev`
- `elizaveta.smirnova`

## 🔍 Устранение проблем

### Проблема: "Connection refused" при подключении к MySQL
```bash
# Проверка статуса контейнеров
docker-compose ps

# Перезапуск MySQL
docker-compose restart mysql

# Ожидание готовности
sleep 30
```

### Проблема: "Table doesn't exist"
```bash
# Применение миграций
docker exec kimai-dev-php bin/console doctrine:migrations:migrate --no-interaction

# Очистка кеша
docker exec kimai-dev-php bin/console cache:clear
```

### Проблема: Дублирование данных
```bash
# Полная очистка перед генерацией
docker exec kimai-dev-php bin/console doctrine:database:drop --force
docker exec kimai-dev-php bin/console doctrine:database:create
docker exec kimai-dev-php bin/console doctrine:migrations:migrate --no-interaction
```

## 📁 Структура данных

### Файлы с исходными данными
- `src/DataFixtures/Data/spheres.php` - Сферы деятельности
- `src/DataFixtures/Data/projects.php` - Проекты по сферам
- `src/DataFixtures/Data/tasks.php` - Список задач и активностей
- `src/DataFixtures/Data/project_descriptions.php` - Описания проектов
- `src/DataFixtures/Data/timesheet_patterns.php` - Паттерны рабочего времени

### Вспомогательные файлы
- `scripts/transliterate_helper.php` - Транслитерация для username/email

## 🚀 Рекомендации

1. **Всегда ждите готовности MySQL** после запуска контейнеров
2. **Используйте полную очистку** при проблемах с данными  
3. **Проверяйте доступность** http://localhost:8083/ после генерации
4. **Сохраняйте логи** выполнения скриптов для отладки
5. **Не запускайте скрипты параллельно** - это может вызвать конфликты

