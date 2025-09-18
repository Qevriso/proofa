<?php

/**
 * Расширение списка пользователей до 30 человек
 * Создание новых пользователей с полным набором данных
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
    'driver' => 'pdo_mysql',
    'charset' => 'utf8mb4',
    'driverOptions' => [
        1002 => 'SET sql_mode=(SELECT REPLACE(@@sql_mode,\'ONLY_FULL_GROUP_BY\',\'\'))'
    ]
];

echo "Расширение списка пользователей до 30 человек...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    $connection->connect();
    
    $faker = Factory::create('ru_RU');
    $patterns = require __DIR__ . '/../src/DataFixtures/Data/timesheet_patterns.php';
    
    // Проверяем текущих пользователей
    $currentUsersCount = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_users');
    $targetUsers = 35;
    $usersToCreate = $targetUsers - $currentUsersCount;
    
    echo "Текущее количество пользователей: $currentUsersCount\n";
    echo "Целевое количество: $targetUsers\n";
    echo "Нужно создать: $usersToCreate пользователей\n\n";
    
    if ($usersToCreate <= 0) {
        echo "✅ Уже достаточно пользователей!\n";
        exit(0);
    }
    
    // Создаем новых пользователей
    $newUserIds = [];
    $roles = ['ROLE_USER', 'ROLE_TEAMLEAD', 'ROLE_ADMIN'];
    
    echo "Создание $usersToCreate новых пользователей...\n";
    
    for ($i = 1; $i <= $usersToCreate; $i++) {
        // Генерируем уникальные реалистичные данные
        $firstName = $faker->firstName();
        $lastName = $faker->lastName();
        $patronymic = $faker->firstName('male'); // отчество
        $alias = "$firstName $lastName";
        
        // Создаем реалистичный username из русских имен
        $username = generateRealisticUsername($firstName, $lastName);
        $email = generateRealisticEmail($username);
        $role = $faker->randomElement($roles);
        
        // Вероятности ролей: 70% обычные пользователи, 20% тимлиды, 10% админы
        $roleProb = $faker->numberBetween(1, 100);
        if ($roleProb <= 70) {
            $role = 'ROLE_USER';
        } elseif ($roleProb <= 90) {
            $role = 'ROLE_TEAMLEAD';
        } else {
            $role = 'ROLE_ADMIN';
        }
        
        // Создаем пользователя
        $hashedPassword = password_hash('password', PASSWORD_DEFAULT);
        
        $connection->executeStatement(
            'INSERT INTO kimai2_users (username, email, password, alias, title, roles, enabled, color, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [
                $username,
                $email,
                $hashedPassword,
                $alias,
                $faker->jobTitle(),
                serialize([$role]),
                1, // enabled
                $faker->hexColor()
            ]
        );
        
        $userId = $connection->lastInsertId();
        $newUserIds[] = $userId;
        
        // Создаем предпочтения пользователя
        $rateRange = $patterns['hourly_rates_by_role'][$role] ?? [800, 3000];
        $hourlyRate = $faker->numberBetween($rateRange[0], $rateRange[1]);
        
        // Часовая ставка
        $connection->executeStatement(
            'INSERT INTO kimai2_user_preferences (user_id, name, value) VALUES (?, ?, ?)',
            [$userId, 'hourly_rate', $hourlyRate]
        );
        
        // Язык
        $connection->executeStatement(
            'INSERT INTO kimai2_user_preferences (user_id, name, value) VALUES (?, ?, ?)',
            [$userId, 'language', 'ru']
        );
        
        // Часовой пояс
        $connection->executeStatement(
            'INSERT INTO kimai2_user_preferences (user_id, name, value) VALUES (?, ?, ?)',
            [$userId, 'timezone', 'Europe/Moscow']
        );
        
        echo "  ✅ $username ($alias) - $role - {$hourlyRate}₽/ч\n";
    }
    
    echo "\n📊 Добавление новых пользователей в команды...\n";
    
    // Добавляем новых пользователей в существующие команды
    $teams = $connection->fetchAllAssociative('SELECT id, name FROM kimai2_teams');
    
    foreach ($newUserIds as $userId) {
        // Каждый пользователь попадает в 1-2 команды
        $userTeams = $faker->randomElements($teams, $faker->numberBetween(1, 2));
        
        foreach ($userTeams as $team) {
            $connection->executeStatement(
                'INSERT IGNORE INTO kimai2_users_teams (user_id, team_id, teamlead) VALUES (?, ?, ?)',
                [$userId, $team['id'], 0] // обычные участники
            );
        }
    }
    
    echo "🔄 Создание индивидуальных тарифов для новых пользователей...\n";
    
    // Создаем тарифы для новых пользователей
    $customers = $connection->fetchAllAssociative('SELECT id FROM kimai2_customers');
    $projects = $connection->fetchAllAssociative('SELECT id FROM kimai2_projects');
    $activities = $connection->fetchAllAssociative('SELECT id FROM kimai2_activities');
    
    foreach ($newUserIds as $userId) {
        // Тарифы клиентов (2-4 на пользователя)
        $userCustomers = $faker->randomElements($customers, $faker->numberBetween(2, 4));
        foreach ($userCustomers as $customer) {
            $connection->executeStatement(
                'INSERT IGNORE INTO kimai2_customers_rates (user_id, customer_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
                [$userId, $customer['id'], $faker->numberBetween(1000, 4500), $faker->numberBetween(500, 1800), $faker->boolean(20) ? 1 : 0]
            );
        }
        
        // Тарифы проектов (3-6 на пользователя)
        $userProjects = $faker->randomElements($projects, $faker->numberBetween(3, 6));
        foreach ($userProjects as $project) {
            $connection->executeStatement(
                'INSERT IGNORE INTO kimai2_projects_rates (user_id, project_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
                [$userId, $project['id'], $faker->numberBetween(800, 4000), $faker->numberBetween(400, 1500), $faker->boolean(15) ? 1 : 0]
            );
        }
        
        // Тарифы активностей (5-10 на пользователя)
        $userActivities = $faker->randomElements($activities, $faker->numberBetween(5, 10));
        foreach ($userActivities as $activity) {
            $connection->executeStatement(
                'INSERT IGNORE INTO kimai2_activities_rates (user_id, activity_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
                [$userId, $activity['id'], $faker->numberBetween(600, 3500), $faker->numberBetween(300, 1200), $faker->boolean(10) ? 1 : 0]
            );
        }
    }
    
    echo "📅 Создание рабочих графиков для новых пользователей...\n";
    
    // Создаем рабочие графики для новых пользователей
    $startDate = new DateTime('-2 months');
    $endDate = new DateTime('+2 months');
    
    foreach ($newUserIds as $userId) {
        $currentDate = clone $startDate;
        
        while ($currentDate <= $endDate) {
            $dayOfWeek = (int) $currentDate->format('N');
            
            // Только рабочие дни
            if (in_array($dayOfWeek, $patterns['working_days'])) {
                // Пропускаем праздники
                if (!in_array($currentDate->format('Y-m-d'), $patterns['holidays_2024'])) {
                    $hours = $faker->randomElement($patterns['work_hours']['full_day_hours']);
                    
                    $connection->executeStatement(
                        'INSERT INTO kimai2_working_times (user_id, date, expected, actual) VALUES (?, ?, ?, ?)',
                        [$userId, $currentDate->format('Y-m-d'), $hours * 3600, $hours * 3600]
                    );
                }
            }
            
            $currentDate->modify('+1 day');
        }
    }
    
    echo "⏰ Создание записей времени для новых пользователей...\n";
    
    // Создаем записи времени для новых пользователей
    $timesheetStartDate = new DateTime('-2 months');
    $timesheetEndDate = new DateTime('now');
    
    foreach ($newUserIds as $userId) {
        $currentDate = clone $timesheetStartDate;
        
        while ($currentDate <= $timesheetEndDate) {
            $dayOfWeek = (int) $currentDate->format('N');
            
            // Генерируем записи только для рабочих дней
            if (in_array($dayOfWeek, $patterns['working_days'])) {
                // Пропускаем праздники
                if (!in_array($currentDate->format('Y-m-d'), $patterns['holidays_2024'])) {
                    
                    // Вероятность работы в день 75% (немного меньше для новых сотрудников)
                    if ($faker->boolean(75)) {
                        $entriesCount = $faker->numberBetween(1, 3);
                        $totalDayMinutes = $faker->numberBetween(360, 540);
                        
                        for ($e = 0; $e < $entriesCount; $e++) {
                            $projectId = $faker->randomElement($projects)['id'];
                            $activityId = $faker->randomElement($activities)['id'];
                            
                            $entryMinutes = intval($totalDayMinutes / $entriesCount) + $faker->numberBetween(-40, 40);
                            $entryMinutes = max(15, min(480, $entryMinutes));
                            
                            $startHour = $faker->numberBetween(8, 16);
                            $startMinute = $faker->numberBetween(0, 59);
                            $begin = clone $currentDate;
                            $begin->setTime($startHour, $startMinute);
                            
                            $end = clone $begin;
                            $end->add(new DateInterval("PT{$entryMinutes}M"));
                            
                            $descriptions = $patterns['task_descriptions']['IT-разработка'];
                            $description = $faker->randomElement($descriptions);
                            
                            // Получаем часовую ставку пользователя
                            $userRate = $connection->fetchOne(
                                'SELECT value FROM kimai2_user_preferences WHERE user_id = ? AND name = ?',
                                [$userId, 'hourly_rate']
                            );
                            $hourlyRate = $userRate ? (float)$userRate : 1500;
                            $rate = ($entryMinutes / 60) * $hourlyRate;
                            
                            $connection->executeStatement(
                                'INSERT INTO kimai2_timesheet (user, project_id, activity_id, start_time, end_time, duration, description, rate, hourly_rate, internal_rate, billable, category, date_tz, timezone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                [
                                    $userId,
                                    $projectId,
                                    $activityId,
                                    $begin->format('Y-m-d H:i:s'),
                                    $end->format('Y-m-d H:i:s'),
                                    $entryMinutes * 60,
                                    $description,
                                    $rate,
                                    $hourlyRate,
                                    $hourlyRate * 0.75,
                                    $faker->boolean(85) ? 1 : 0,
                                    'work',
                                    $currentDate->format('Y-m-d'),
                                    'Europe/Moscow'
                                ]
                            );
                            
                            // Добавляем 1-3 случайных тега к записи времени
                            $timesheetId = $connection->lastInsertId();
                            $tagsCount = $faker->numberBetween(1, 3);
                            $allTagIds = $connection->fetchAllAssociative('SELECT id FROM kimai2_tags ORDER BY RAND() LIMIT ' . $tagsCount);
                            
                            foreach ($allTagIds as $tagData) {
                                $connection->executeStatement(
                                    'INSERT IGNORE INTO kimai2_timesheet_tags (timesheet_id, tag_id) VALUES (?, ?)',
                                    [$timesheetId, $tagData['id']]
                                );
                            }
                        }
                    }
                }
            }
            
            $currentDate->modify('+1 day');
        }
    }
    
    // Финальная статистика
    $finalUsersCount = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_users');
    $teamMembers = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_users_teams');
    $customerRates = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_customers_rates');
    $projectRates = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_projects_rates');
    $activityRates = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_activities_rates');
    $workingTimes = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_working_times');
    $timesheet = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_timesheet');
    
    // Статистика по ролям
    $roleStats = $connection->fetchAllAssociative('
        SELECT 
            SUBSTRING_INDEX(SUBSTRING_INDEX(roles, \'"\', 4), \'"\', -1) as role_name,
            COUNT(*) as count 
        FROM kimai2_users 
        WHERE roles != \'a:0:{}\' 
        GROUP BY role_name
    ');
    
    echo "\n✅ Расширение пользователей завершено!\n";
    echo "\n=== ИТОГОВАЯ СТАТИСТИКА ===\n";
    echo "Общее количество пользователей: $finalUsersCount\n";
    echo "Создано новых пользователей: $usersToCreate\n\n";
    
    echo "Распределение по ролям:\n";
    foreach ($roleStats as $stat) {
        echo "  - {$stat['role_name']}: {$stat['count']} человек\n";
    }
    
    echo "\nСвязанные данные:\n";
    echo "  - Участников команд: $teamMembers\n";
    echo "  - Тарифы клиентов: $customerRates\n";
    echo "  - Тарифы проектов: $projectRates\n";
    echo "  - Тарифы активностей: $activityRates\n";
    echo "  - Рабочих дней: $workingTimes\n";
    echo "  - Записей времени: $timesheet\n";
    
    // Примеры новых пользователей
    echo "\n=== ПРИМЕРЫ НОВЫХ ПОЛЬЗОВАТЕЛЕЙ ===\n";
    $newUsers = $connection->fetchAllAssociative('
        SELECT u.username, u.alias, up.value as rate 
        FROM kimai2_users u 
        LEFT JOIN kimai2_user_preferences up ON u.id = up.user_id AND up.name = "hourly_rate"
        ORDER BY u.id DESC 
        LIMIT 5
    ');
    
    foreach ($newUsers as $user) {
        echo "  - {$user['username']} ({$user['alias']}) - {$user['rate']}₽/ч\n";
    }
    
    // Общие итоги работы
    $totalHours = $connection->fetchOne('SELECT SUM(duration)/3600 FROM kimai2_timesheet');
    $totalRevenue = $connection->fetchOne('SELECT SUM(rate) FROM kimai2_timesheet');
    
    echo "\n=== ОБЩИЕ ИТОГИ РАБОТЫ ===\n";
    echo sprintf("Общее время всех сотрудников: %.1f часов\n", $totalHours);
    echo sprintf("Общая выручка: %.0f ₽\n", $totalRevenue);
    echo sprintf("Средняя выручка на сотрудника: %.0f ₽\n", $totalRevenue / $finalUsersCount);
    
    echo "\n🎉 Команда расширена до $finalUsersCount человек!\n";
    echo "💡 Все новые сотрудники имеют полный набор данных для реалистичной работы.\n";
    echo "🔑 Логин/пароль для всех: username/password\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}
