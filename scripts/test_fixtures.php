<?php

/**
 * Тестирование загруженных фикстур
 */

require_once __DIR__ . '/../vendor/autoload.php';

use App\DataFixtures\CustomerFixtures;
use App\DataFixtures\TagFixtures;
use Doctrine\DBAL\DriverManager;

// Подключение к базе данных
$connectionParams = [
    'dbname' => 'kimai',
    'user' => 'kimai',
    'password' => 'kimai',
    'host' => 'kimai-dev-mysql',
    'driver' => 'pdo_mysql',
    'charset' => 'utf8mb4',
    'driverOptions' => [
        1002 => 'SET sql_mode=(SELECT REPLACE(@@sql_mode,\'ONLY_FULL_GROUP_BY\',\'\'))'
    ]
];

echo "Тестирование обновленных фикстур...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    
    // Проверяем подключение
    $connection->connect();
    echo "✅ Подключение к базе данных успешно\n";
    
    // Проверяем наличие данных
    $customers = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_customers');
    $projects = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_projects');  
    $activities = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_activities');
    $tags = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_tags');
    
    echo "\n=== СТАТИСТИКА БАЗЫ ДАННЫХ ===\n";
    echo "Клиентов: $customers\n";
    echo "Проектов: $projects\n"; 
    echo "Активностей: $activities\n";
    echo "Тегов: $tags\n";
    
    if ($customers > 0 || $projects > 0 || $activities > 0 || $tags > 0) {
        echo "\n=== ПРИМЕРЫ ДАННЫХ ===\n";
        
        if ($customers > 0) {
            $customerSample = $connection->fetchAssociative('SELECT name, address, email FROM kimai2_customers LIMIT 1');
            echo "Пример клиента: " . $customerSample['name'] . "\n";
            echo "  Адрес: " . substr($customerSample['address'], 0, 50) . "...\n";
        }
        
        if ($projects > 0) {
            $projectSample = $connection->fetchAssociative('SELECT name, comment, order_date, start, end, color FROM kimai2_projects LIMIT 1');
            echo "Пример проекта: " . $projectSample['name'] . "\n";
            if ($projectSample['order_date']) {
                echo "  Дата заказа: " . $projectSample['order_date'] . "\n";
            }
            if ($projectSample['color']) {
                echo "  Цвет: " . $projectSample['color'] . "\n";
            }
        }
        
        if ($activities > 0) {
            $activitySample = $connection->fetchAssociative('SELECT name, comment, color FROM kimai2_activities LIMIT 1');
            echo "Пример активности: " . $activitySample['name'] . "\n";
            if ($activitySample['color']) {
                echo "  Цвет: " . $activitySample['color'] . "\n";
            }
        }
        
        if ($tags > 0) {
            $tagSamples = $connection->fetchAllAssociative('SELECT name, color FROM kimai2_tags LIMIT 5');
            echo "Примеры тегов: ";
            echo implode(', ', array_column($tagSamples, 'name')) . "\n";
        }
    } else {
        echo "\n⚠️  База данных пуста. Нужно загрузить фикстуры.\n";
        echo "Создаю простые тестовые данные...\n";
        
        // Создадим простые тестовые данные для проверки
        $testData = require __DIR__ . '/../src/DataFixtures/Data/simple_names.php';
        
        // Тестовый клиент
        $connection->executeStatement(
            'INSERT INTO kimai2_customers (name, currency, address, email, country, timezone, visible, billable, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            ['ООО Тестовая Компания', 'RUB', 'г. Москва, ул. Тестовая, д. 1', 'test@test.ru', 'RU', 'Europe/Moscow', 1, 1]
        );
        $customerId = $connection->lastInsertId();
        
        // Тестовый проект
        $projectName = $testData['projects'][0];
        $connection->executeStatement(
            'INSERT INTO kimai2_projects (customer_id, name, comment, order_number, visible, billable, budget, time_budget, order_date, start, end, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [$customerId, $projectName, 'Тестовое описание проекта', 'P-12345678', 1, 1, 50000, 1000000, '2025-01-01', '2025-01-15', '2025-06-15', '#FF5733']
        );
        $projectId = $connection->lastInsertId();
        
        // Тестовая активность
        $activityName = $testData['activities'][0];
        $connection->executeStatement(
            'INSERT INTO kimai2_activities (project_id, name, comment, visible, billable, budget, time_budget, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [$projectId, $activityName, 'Тестовое описание активности', 1, 1, 10000, 200000, '#33C3FF']
        );
        
        // Тестовые теги
        foreach (array_slice($testData['tags'], 0, 5) as $tagName) {
            $connection->executeStatement(
                'INSERT INTO kimai2_tags (name, visible, color) VALUES (?, ?, ?)',
                [$tagName, 1, sprintf('#%06X', mt_rand(0, 0xFFFFFF))]
            );
        }
        
        echo "✅ Тестовые данные созданы\n";
        echo "\nПроверяем результат:\n";
        echo "Проект: $projectName\n";
        echo "Активность: $activityName\n";
        echo "Теги: " . implode(', ', array_slice($testData['tags'], 0, 5)) . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}

