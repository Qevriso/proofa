<?php

/**
 * Проверка и восстановление базовых пользователей
 * Не удаляет существующих суперадминов
 */

require_once __DIR__ . '/../vendor/autoload.php';

use Doctrine\DBAL\DriverManager;
use Faker\Factory;

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

echo "Проверка и восстановление базовых пользователей...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    $connection->connect();
    
    // Проверяем текущих пользователей
    $users = $connection->fetchAllAssociative('SELECT id, username, email, roles FROM kimai2_users');
    
    echo "Найдено пользователей: " . count($users) . "\n";
    
    foreach ($users as $user) {
        $roles = unserialize($user['roles']);
        echo "- " . $user['username'] . " (" . $user['email'] . ") - роли: " . implode(', ', $roles) . "\n";
    }
    
    // Определяем базовых пользователей, которые должны быть
    $requiredUsers = [
        [
            'username' => 'john_user',
            'email' => 'john_user@example.com',
            'roles' => ['ROLE_USER'],
            'alias' => 'Иван Пользователев',
            'title' => 'Обычный пользователь'
        ],
        [
            'username' => 'tony_teamlead',
            'email' => 'tony_teamlead@example.com',
            'roles' => ['ROLE_TEAMLEAD'],
            'alias' => 'Антон Тимлидов',
            'title' => 'Руководитель команды'
        ],
        [
            'username' => 'anna_admin',
            'email' => 'anna_admin@example.com',
            'roles' => ['ROLE_ADMIN'],
            'alias' => 'Анна Админова',
            'title' => 'Администратор'
        ],
        [
            'username' => 'susan_super',
            'email' => 'susan_super@example.com',
            'roles' => ['ROLE_SUPER_ADMIN'],
            'alias' => 'Сюзанна Суперадминова',
            'title' => 'Суперадминистратор'
        ]
    ];
    
    $faker = Factory::create('ru_RU');
    $existingUsernames = array_column($users, 'username');
    
    // Создаем недостающих пользователей
    foreach ($requiredUsers as $userData) {
        if (!in_array($userData['username'], $existingUsernames)) {
            echo "Создание пользователя: " . $userData['username'] . "...\n";
            
            // Хешируем стандартный пароль "password"
            $hashedPassword = password_hash('password', PASSWORD_DEFAULT);
            
            $connection->executeStatement(
                'INSERT INTO kimai2_users (username, email, password, alias, title, roles, enabled, language, timezone, registration_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
                [
                    $userData['username'],
                    $userData['email'],
                    $hashedPassword,
                    $userData['alias'],
                    $userData['title'],
                    serialize($userData['roles']),
                    1, // enabled
                    'ru',
                    'Europe/Moscow'
                ]
            );
            
            echo "✅ Пользователь " . $userData['username'] . " создан\n";
        } else {
            echo "✓ Пользователь " . $userData['username'] . " уже существует\n";
        }
    }
    
    // Создаем несколько дополнительных русскоязычных пользователей
    $additionalUsersCount = 5;
    echo "\nСоздание $additionalUsersCount дополнительных русскоязычных пользователей...\n";
    
    for ($i = 1; $i <= $additionalUsersCount; $i++) {
        $username = 'user_' . $i;
        
        if (!in_array($username, $existingUsernames)) {
            $hashedPassword = password_hash('password', PASSWORD_DEFAULT);
            
            $connection->executeStatement(
                'INSERT INTO kimai2_users (username, email, password, alias, title, roles, enabled, language, timezone, registration_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
                [
                    $username,
                    $username . '@example.com',
                    $hashedPassword,
                    $faker->name(),
                    $faker->jobTitle(),
                    serialize(['ROLE_USER']),
                    1,
                    'ru',
                    'Europe/Moscow'
                ]
            );
        }
    }
    
    // Итоговая статистика
    $finalUsers = $connection->fetchAllAssociative('SELECT username, email, alias, roles FROM kimai2_users ORDER BY id');
    
    echo "\n=== ИТОГОВЫЙ СПИСОК ПОЛЬЗОВАТЕЛЕЙ ===\n";
    foreach ($finalUsers as $user) {
        $roles = unserialize($user['roles']);
        echo "- " . $user['username'] . " (" . $user['alias'] . ") - " . implode(', ', $roles) . "\n";
    }
    
    echo "\n✅ Все базовые пользователи проверены и при необходимости созданы!\n";
    echo "Логин/пароль для всех пользователей: username/password\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}

