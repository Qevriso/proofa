<?php

/**
 * Генерация новых данных без удаления пользователей
 * Очищает все данные кроме пользователей и генерирует новые
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

echo "Генерация новых данных с сохранением пользователей...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    $connection->connect();
    
    $faker = Factory::create('ru_RU');
    $data = require __DIR__ . '/../src/DataFixtures/Data/simple_names.php';
    $patterns = require __DIR__ . '/../src/DataFixtures/Data/timesheet_patterns.php';
    
    // Сохраняем информацию о пользователях
    $users = $connection->fetchAllAssociative('SELECT id, username, alias, roles FROM kimai2_users');
    echo "Найдено пользователей: " . count($users) . "\n";
    foreach ($users as $user) {
        $roles = unserialize($user['roles']);
        $alias = $user['alias'] ? " ({$user['alias']})" : "";
        echo "  - {$user['username']}{$alias} - " . implode(', ', $roles) . "\n";
    }
    
    // Очищаем все таблицы КРОМЕ пользователей (в правильном порядке)
    echo "\nОчистка существующих данных (пользователи сохраняются)...\n";
    $connection->executeStatement('DELETE FROM kimai2_timesheet');
    $connection->executeStatement('DELETE FROM kimai2_working_times');
    $connection->executeStatement('DELETE FROM kimai2_activities_rates');
    $connection->executeStatement('DELETE FROM kimai2_projects_rates');
    $connection->executeStatement('DELETE FROM kimai2_customers_rates');
    $connection->executeStatement('DELETE FROM kimai2_users_teams');
    $connection->executeStatement('DELETE FROM kimai2_teams');
    $connection->executeStatement('DELETE FROM kimai2_activities');
    $connection->executeStatement('DELETE FROM kimai2_projects');
    $connection->executeStatement('DELETE FROM kimai2_customers');
    $connection->executeStatement('DELETE FROM kimai2_tags');
    
    // Создаем новые теги (30 осмысленных английских тегов)
    echo "Создание 30 новых тегов...\n";
    foreach ($data['tags'] as $tagName) {
        $connection->executeStatement(
            'INSERT INTO kimai2_tags (name, visible, color) VALUES (?, ?, ?)',
            [$tagName, 1, $faker->hexColor()]
        );
    }
    
    // Создаем новых клиентов и проекты/активности
    $customerCount = rand(4, 8);
    echo "Создание $customerCount новых клиентов с проектами и активностями...\n";
    
    for ($c = 1; $c <= $customerCount; $c++) {
        // Создание клиента с русскими данными
        $connection->executeStatement(
            'INSERT INTO kimai2_customers (name, currency, address, email, country, timezone, visible, billable, phone, comment, number, vat_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [
                $faker->company(),
                'RUB',
                $faker->address(),
                $faker->email(),
                'RU',
                'Europe/Moscow',
                $c % 5 !== 0 ? 1 : 0, // visible
                1,
                $faker->phoneNumber(),
                $faker->text(200),
                'C-' . $faker->ean8(),
                $faker->numerify('##########')
            ]
        );
        $customerId = $connection->lastInsertId();
        
        // Создание проектов для клиента
        $projectCount = rand(2, 6);
        for ($p = 1; $p <= $projectCount; $p++) {
            $orderDate = $faker->dateTimeBetween('-4 months', '+2 weeks');
            $startDate = $faker->dateTimeBetween($orderDate, $orderDate->format('Y-m-d') . ' +1 week');
            $endDate = $faker->dateTimeBetween($startDate->format('Y-m-d') . ' +1 month', $startDate->format('Y-m-d') . ' +4 months');
            
            $connection->executeStatement(
                'INSERT INTO kimai2_projects (customer_id, name, comment, order_number, visible, billable, budget, time_budget, order_date, start, end, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                [
                    $customerId,
                    $faker->randomElement($data['projects']),
                    $faker->text(300),
                    'P-' . $faker->ean8(),
                    $p % 7 !== 0 ? 1 : 0, // visible
                    $faker->boolean(90) ? 1 : 0, // 90% billable
                    rand(15000, 120000),
                    rand(1500000, 12000000),
                    $orderDate->format('Y-m-d'),
                    $startDate->format('Y-m-d'),
                    $endDate->format('Y-m-d'),
                    $faker->hexColor()
                ]
            );
            $projectId = $connection->lastInsertId();
            
            // Создание активностей для проекта
            $activityCount = rand(1, 12);
            for ($a = 1; $a <= $activityCount; $a++) {
                $connection->executeStatement(
                    'INSERT INTO kimai2_activities (project_id, name, comment, visible, billable, budget, time_budget, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                    [
                        $projectId,
                        $faker->randomElement($data['activities']),
                        $faker->text(200),
                        $a % 6 !== 0 ? 1 : 0, // visible  
                        $faker->boolean(85) ? 1 : 0, // 85% billable
                        rand(8000, 60000),
                        rand(200000, 3000000),
                        $faker->hexColor()
                    ]
                );
            }
        }
    }
    
    // Создание глобальных активностей (без проекта)
    $globalActivitiesCount = rand(8, 20);
    echo "Создание $globalActivitiesCount новых глобальных активностей...\n";
    
    for ($g = 1; $g <= $globalActivitiesCount; $g++) {
        $connection->executeStatement(
            'INSERT INTO kimai2_activities (project_id, name, comment, visible, billable, budget, time_budget, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [
                null, // глобальная активность
                $faker->randomElement($data['activities']),
                $faker->text(200),
                $g % 4 !== 0 ? 1 : 0, // visible
                $faker->boolean(85) ? 1 : 0,
                rand(5000, 40000),
                rand(150000, 1500000),
                $faker->hexColor()
            ]
        );
    }
    
    // Создание команд и распределение пользователей
    echo "Создание новых команд...\n";
    $userIds = array_column($users, 'id');
    
    foreach ($patterns['teams'] as $teamData) {
        $connection->executeStatement(
            'INSERT INTO kimai2_teams (name, color) VALUES (?, ?)',
            [$teamData['name'], $teamData['color']]
        );
        $teamId = $connection->lastInsertId();
        
        // Добавляем участников команды
        $teamUserIds = $faker->randomElements($userIds, rand(2, min(3, count($userIds))));
        foreach ($teamUserIds as $userId) {
            $connection->executeStatement(
                'INSERT INTO kimai2_users_teams (user_id, team_id, teamlead) VALUES (?, ?, ?)',
                [$userId, $teamId, 0] // пока все обычные участники
            );
        }
    }
    
    // Создание новых тарифов
    echo "Создание новых индивидуальных тарифов...\n";
    $customers = $connection->fetchAllAssociative('SELECT id FROM kimai2_customers');
    $projects = $connection->fetchAllAssociative('SELECT id FROM kimai2_projects');
    $activities = $connection->fetchAllAssociative('SELECT id FROM kimai2_activities');
    
    // Тарифы клиентов
    for ($i = 0; $i < rand(12, 20); $i++) {
        $userId = $faker->randomElement($userIds);
        $customerId = $faker->randomElement($customers)['id'];
        
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_customers_rates (user_id, customer_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
            [$userId, $customerId, $faker->numberBetween(1200, 4500), $faker->numberBetween(600, 1800), $faker->boolean(25) ? 1 : 0]
        );
    }
    
    // Тарифы проектов
    for ($i = 0; $i < rand(25, 40); $i++) {
        $userId = $faker->randomElement($userIds);
        $projectId = $faker->randomElement($projects)['id'];
        
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_projects_rates (user_id, project_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
            [$userId, $projectId, $faker->numberBetween(900, 4000), $faker->numberBetween(450, 1400), $faker->boolean(20) ? 1 : 0]
        );
    }
    
    // Тарифы активностей
    for ($i = 0; $i < rand(60, 120); $i++) {
        $userId = $faker->randomElement($userIds);
        $activityId = $faker->randomElement($activities)['id'];
        
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_activities_rates (user_id, activity_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
            [$userId, $activityId, $faker->numberBetween(700, 3500), $faker->numberBetween(350, 1200), $faker->boolean(15) ? 1 : 0]
        );
    }
    
    // Создание новых рабочих графиков
    echo "Создание новых рабочих графиков...\n";
    $startDate = new DateTime('-2 months');
    $endDate = new DateTime('+2 months');
    
    foreach ($userIds as $userId) {
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
    
    // Создание новых записей времени
    echo "Создание новых записей времени за последние 2 месяца...\n";
    $timesheetStartDate = new DateTime('-2 months');
    $timesheetEndDate = new DateTime('now');
    
    foreach ($userIds as $userId) {
        $currentDate = clone $timesheetStartDate;
        
        while ($currentDate <= $timesheetEndDate) {
            $dayOfWeek = (int) $currentDate->format('N');
            
            // Генерируем записи только для рабочих дней
            if (in_array($dayOfWeek, $patterns['working_days'])) {
                // Пропускаем праздники
                if (!in_array($currentDate->format('Y-m-d'), $patterns['holidays_2024'])) {
                    
                    // Вероятность работы в день 80%
                    if ($faker->boolean(80)) {
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
                            
                            $hourlyRate = $faker->numberBetween(800, 3500);
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
                        }
                    }
                }
            }
            
            $currentDate->modify('+1 day');
        }
    }
    
    // Финальная статистика
    $customers = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_customers');
    $projects = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_projects');
    $activities = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_activities');
    $tags = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_tags');
    $teams = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_teams');
    $teamMembers = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_users_teams');
    $customerRates = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_customers_rates');
    $projectRates = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_projects_rates');
    $activityRates = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_activities_rates');
    $workingTimes = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_working_times');
    $timesheet = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_timesheet');
    
    echo "\n✅ Новые данные успешно сгенерированы!\n";
    echo "\n=== ИТОГОВАЯ СТАТИСТИКА НОВЫХ ДАННЫХ ===\n";
    echo "Пользователи: " . count($users) . " (сохранены)\n";
    echo "Новые базовые сущности:\n";
    echo "  - Клиентов: $customers\n";
    echo "  - Проектов: $projects\n";
    echo "  - Активностей: $activities\n";
    echo "  - Тегов: $tags\n";
    echo "\nНовые команды и права доступа:\n";
    echo "  - Команд: $teams\n";
    echo "  - Участников команд: $teamMembers\n";
    echo "\nНовые индивидуальные тарифы:\n";
    echo "  - Тарифы клиентов: $customerRates\n";
    echo "  - Тарифы проектов: $projectRates\n";
    echo "  - Тарифы активностей: $activityRates\n";
    echo "\nНовое рабочее время и записи:\n";
    echo "  - Рабочих дней: $workingTimes\n";
    echo "  - Записей времени: $timesheet\n";
    
    // Примеры новых данных
    echo "\n=== ПРИМЕРЫ НОВЫХ ДАННЫХ ===\n";
    
    $customerSample = $connection->fetchAssociative('SELECT name, phone FROM kimai2_customers LIMIT 1');
    echo "Новый клиент: " . $customerSample['name'] . " (" . $customerSample['phone'] . ")\n";
    
    $projectSamples = $connection->fetchAllAssociative('SELECT name, budget FROM kimai2_projects LIMIT 3');
    echo "\nНовые проекты:\n";
    foreach ($projectSamples as $project) {
        echo "  - " . $project['name'] . " (бюджет: " . number_format($project['budget']) . " ₽)\n";
    }
    
    $timesheetSamples = $connection->fetchAllAssociative('
        SELECT t.description, t.duration/3600 as hours, t.rate 
        FROM kimai2_timesheet t 
        ORDER BY t.start_time DESC
        LIMIT 3
    ');
    
    echo "\nПоследние записи времени:\n";
    foreach ($timesheetSamples as $entry) {
        echo sprintf("  - %s: %.1f ч, %.0f ₽\n", 
            $entry['description'], 
            $entry['hours'], 
            $entry['rate']
        );
    }
    
    // Общие итоги работы
    $totalHours = $connection->fetchOne('SELECT SUM(duration)/3600 FROM kimai2_timesheet');
    $totalRevenue = $connection->fetchOne('SELECT SUM(rate) FROM kimai2_timesheet');
    
    echo "\n=== ОБЩИЕ ИТОГИ РАБОТЫ ===\n";
    echo sprintf("Общее время: %.1f часов\n", $totalHours);
    echo sprintf("Общая выручка: %.0f ₽\n", $totalRevenue);
    
    echo "\n🎉 Новые данные созданы с сохранением всех пользователей!\n";
    echo "💡 Система обновлена свежими данными за последние 2 месяца.\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}
