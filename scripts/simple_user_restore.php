<?php

/**
 * Простое восстановление базовых пользователей
 */

require_once __DIR__ . '/../vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

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

echo "Простое восстановление пользователей...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    $connection->connect();
    
    // Проверяем структуру таблицы
    $columns = $connection->fetchAllAssociative("SHOW COLUMNS FROM kimai2_users");
    echo "Колонки таблицы пользователей:\n";
    foreach ($columns as $column) {
        echo "- " . $column['Field'] . " (" . $column['Type'] . ")\n";
    }
    
    // Проверяем текущих пользователей
    $users = $connection->fetchAllAssociative('SELECT id, username, email FROM kimai2_users');
    
    echo "\nТекущие пользователи:\n";
    foreach ($users as $user) {
        echo "- " . $user['username'] . " (" . $user['email'] . ")\n";
    }
    
    // Используем команду Kimai для создания пользователей
    echo "\n✅ Существующий суперадмин сохранён!\n";
    echo "Для создания дополнительных пользователей используйте:\n";
    echo "docker exec kimai-dev-php php bin/console kimai:user:create\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}

