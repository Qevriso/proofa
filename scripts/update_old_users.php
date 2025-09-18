<?php

/**
 * Обновление пользователей со старыми именами (user_N)
 * Замена на реалистичные username и email + присвоение к командам
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/transliterate_helper.php';

use Doctrine\DBAL\DriverManager;
use Faker\Factory;

// Подключение к базе данных
$connectionParams = [
    'dbname' => 'kimai',
    'user' => 'kimai',
    'password' => 'kimai',
    'host' => 'kimai-dev-mysql',
    'port' => '3306',
    'driver' => 'pdo_mysql',
    'charset' => 'utf8mb4'
];

echo "Обновление пользователей со старыми именами...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    $connection->connect();
    
    $faker = Factory::create('ru_RU');
    
    // Получаем всех пользователей со старыми именами
    $oldUsers = $connection->fetchAllAssociative("
        SELECT id, username, alias, email 
        FROM kimai2_users 
        WHERE username LIKE 'user_%' 
        ORDER BY id
    ");
    
    echo "Найдено пользователей для обновления: " . count($oldUsers) . "\n\n";
    
    // Получаем существующие команды
    $teams = $connection->fetchAllAssociative('SELECT id, name FROM kimai2_teams ORDER BY id');
    
    $updatedCount = 0;
    $addedToTeamsCount = 0;
    
    foreach ($oldUsers as $user) {
        // Разбираем ФИО на имя и фамилию
        $fullName = trim($user['alias']);
        $nameParts = explode(' ', $fullName);
        
        if (count($nameParts) >= 2) {
            $firstName = $nameParts[0];
            $lastName = $nameParts[1];
        } else {
            // Если ФИО в одном слове, используем faker
            $firstName = $faker->firstName();
            $lastName = $faker->lastName();
        }
        
        // Генерируем новые реалистичные данные
        $newUsername = generateRealisticUsername($firstName, $lastName);
        $newEmail = generateRealisticEmail($newUsername);
        
        // Проверяем уникальность username
        $existingUser = $connection->fetchOne(
            'SELECT COUNT(*) FROM kimai2_users WHERE username = ? AND id != ?',
            [$newUsername, $user['id']]
        );
        
        if ($existingUser > 0) {
            // Если username занят, добавляем номер
            $counter = 2;
            do {
                $uniqueUsername = $newUsername . $counter;
                $existingUser = $connection->fetchOne(
                    'SELECT COUNT(*) FROM kimai2_users WHERE username = ? AND id != ?',
                    [$uniqueUsername, $user['id']]
                );
                $counter++;
            } while ($existingUser > 0);
            
            $newUsername = $uniqueUsername;
            $newEmail = generateRealisticEmail($newUsername);
        }
        
        // Обновляем пользователя
        $connection->executeStatement(
            'UPDATE kimai2_users SET username = ?, email = ? WHERE id = ?',
            [$newUsername, $newEmail, $user['id']]
        );
        
        echo "✅ {$user['username']} → {$newUsername} ({$user['alias']}) - {$newEmail}\n";
        $updatedCount++;
        
        // Проверяем, не состоит ли пользователь уже в команде
        $inTeam = $connection->fetchOne(
            'SELECT COUNT(*) FROM kimai2_users_teams WHERE user_id = ?',
            [$user['id']]
        );
        
        if ($inTeam == 0 && !empty($teams)) {
            // Выбираем случайную команду
            $randomTeam = $faker->randomElement($teams);
            
            // Добавляем пользователя в команду
            $connection->executeStatement(
                'INSERT INTO kimai2_users_teams (user_id, team_id, teamlead) VALUES (?, ?, ?)',
                [$user['id'], $randomTeam['id'], 0] // 0 = обычный участник
            );
            
            echo "   👥 Добавлен в команду: {$randomTeam['name']}\n";
            $addedToTeamsCount++;
        }
    }
    
    echo "\n✅ Обновление завершено!\n";
    echo "\n=== СТАТИСТИКА ===\n";
    echo "Обновлено пользователей: $updatedCount\n";
    echo "Добавлено в команды: $addedToTeamsCount\n";
    
    // Итоговая статистика команд
    echo "\n=== ИТОГОВОЕ РАСПРЕДЕЛЕНИЕ ПО КОМАНДАМ ===\n";
    $teamStats = $connection->fetchAllAssociative("
        SELECT 
            t.name,
            COUNT(tm.user_id) as members_count
        FROM kimai2_teams t
        LEFT JOIN kimai2_users_teams tm ON t.id = tm.team_id
        GROUP BY t.id, t.name
        ORDER BY members_count DESC
    ");
    
    foreach ($teamStats as $team) {
        echo "  - {$team['name']}: {$team['members_count']} участников\n";
    }
    
    // Примеры обновленных пользователей
    echo "\n=== ПРИМЕРЫ ОБНОВЛЕННЫХ ПОЛЬЗОВАТЕЛЕЙ ===\n";
    $examples = $connection->fetchAllAssociative("
        SELECT 
            u.username,
            u.alias,
            u.email,
            t.name as team_name
        FROM kimai2_users u
        LEFT JOIN kimai2_users_teams tm ON u.id = tm.user_id
        LEFT JOIN kimai2_teams t ON tm.team_id = t.id
        WHERE u.username LIKE '%.%' 
        ORDER BY u.id DESC 
        LIMIT 10
    ");
    
    foreach ($examples as $example) {
        $team = $example['team_name'] ? " (команда: {$example['team_name']})" : " (без команды)";
        echo "  - {$example['username']} ({$example['alias']}) - {$example['email']}{$team}\n";
    }
    
    echo "\n🎉 Все пользователи обновлены и распределены по командам!\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}
