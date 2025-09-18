<?php

/**
 * Обновление профилей пользователей русскими данными
 */

require_once __DIR__ . '/../vendor/autoload.php';

use Doctrine\DBAL\DriverManager;
use Faker\Factory;

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

echo "Обновление профилей пользователей русскими данными...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    $connection->connect();
    
    $faker = Factory::create('ru_RU');
    
    // Обновляем профили конкретных пользователей
    $userProfiles = [
        'john_user' => ['alias' => 'Иван Пользователев', 'title' => 'Разработчик'],
        'anna_admin' => ['alias' => 'Анна Админова', 'title' => 'Системный администратор'],
        'tony_teamlead' => ['alias' => 'Антон Тимлидов', 'title' => 'Руководитель команды']
    ];
    
    foreach ($userProfiles as $username => $profile) {
        $connection->executeStatement(
            'UPDATE kimai2_users SET alias = ?, title = ?, color = ? WHERE username = ?',
            [$profile['alias'], $profile['title'], $faker->hexColor(), $username]
        );
        echo "✅ Обновлён профиль пользователя: $username -> " . $profile['alias'] . "\n";
    }
    
    // Создаём пользовательские настройки (preferences)
    $users = $connection->fetchAllAssociative('SELECT id, username FROM kimai2_users WHERE username != ?', ['admin']);
    
    foreach ($users as $user) {
        // Часовая ставка
        $hourlyRate = rand(500, 3000);
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_user_preferences (user_id, name, value) VALUES (?, ?, ?)',
            [$user['id'], 'hourly_rate', $hourlyRate]
        );
        
        // Язык
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_user_preferences (user_id, name, value) VALUES (?, ?, ?)',
            [$user['id'], 'language', 'ru']
        );
        
        // Часовой пояс
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_user_preferences (user_id, name, value) VALUES (?, ?, ?)',
            [$user['id'], 'timezone', 'Europe/Moscow']
        );
        
        echo "✅ Настройки для " . $user['username'] . ": ставка $hourlyRate ₽/час, язык ru, часовой пояс Europe/Moscow\n";
    }
    
    // Итоговая проверка
    $finalUsers = $connection->fetchAllAssociative('SELECT username, alias, title, roles FROM kimai2_users ORDER BY id');
    
    echo "\n=== ИТОГОВЫЙ СПИСОК ПОЛЬЗОВАТЕЛЕЙ ===\n";
    foreach ($finalUsers as $user) {
        $roles = unserialize($user['roles']);
        echo "- " . $user['username'];
        if ($user['alias']) {
            echo " (" . $user['alias'] . ")";
        }
        if ($user['title']) {
            echo " - " . $user['title'];
        }
        echo " [" . implode(', ', $roles) . "]\n";
    }
    
    echo "\n✅ Все пользователи обновлены с русскими профилями!\n";
    echo "Логин/пароль: username/password\n";
    echo "🔐 Суперадмин: admin/admin (или admin/password)\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}

