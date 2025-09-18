<?php

/**
 * Ручная загрузка фикстур с русскоязычными данными
 * Демонстрация всех возможностей обновленных фикстур
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

echo "Загрузка полных русскоязычных фикстур...\n";

try {
    $connection = DriverManager::getConnection($connectionParams);
    $connection->connect();
    
    $faker = Factory::create('ru_RU');
    $data = require __DIR__ . '/../src/DataFixtures/Data/simple_names.php';
    $tasksData = require __DIR__ . '/../src/DataFixtures/Data/tasks.php';
    $patterns = require __DIR__ . '/../src/DataFixtures/Data/timesheet_patterns.php';
    
    // Очищаем таблицы в правильном порядке (от зависимых к независимым)
    $connection->executeStatement('DELETE FROM kimai2_timesheet_tags');
    $connection->executeStatement('DELETE FROM kimai2_timesheet');
    $connection->executeStatement('DELETE FROM kimai2_working_times');
    $connection->executeStatement('DELETE FROM kimai2_activities_rates');
    $connection->executeStatement('DELETE FROM kimai2_projects_rates');
    $connection->executeStatement('DELETE FROM kimai2_customers_rates');
    $connection->executeStatement('DELETE FROM kimai2_users_teams');
    $connection->executeStatement('DELETE FROM kimai2_teams');
    $connection->executeStatement('DELETE FROM kimai2_invoices');
    $connection->executeStatement('DELETE FROM kimai2_invoice_templates');
    $connection->executeStatement('DELETE FROM kimai2_activities');
    $connection->executeStatement('DELETE FROM kimai2_projects');
    $connection->executeStatement('DELETE FROM kimai2_customers');
    $connection->executeStatement('DELETE FROM kimai2_tags');
    
    // Создаем теги (30 осмысленных английских тегов)
    echo "Создание 30 осмысленных тегов...\n";
    foreach ($data['tags'] as $tagName) {
        $connection->executeStatement(
            'INSERT INTO kimai2_tags (name, visible, color) VALUES (?, ?, ?)',
            [$tagName, 1, $faker->hexColor()]
        );
    }
    
    // Создаем клиентов и проекты/активности
    $customerCount = rand(5, 10);
    echo "Создание $customerCount клиентов с проектами и активностями...\n";
    
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
        $projectCount = rand(2, 8);
        for ($p = 1; $p <= $projectCount; $p++) {
            $orderDate = $faker->dateTimeBetween('-6 months', '+1 month');
            $startDate = $faker->dateTimeBetween($orderDate, $orderDate->format('Y-m-d') . ' +2 weeks');
            $endDate = $faker->dateTimeBetween($startDate->format('Y-m-d') . ' +1 month', $startDate->format('Y-m-d') . ' +6 months');
            
            $projectName = $faker->randomElement($data['projects']);
            $projectDescription = $data['project_descriptions'][$projectName] ?? $faker->text(300);
            
            $connection->executeStatement(
                'INSERT INTO kimai2_projects (customer_id, name, comment, order_number, visible, billable, budget, time_budget, order_date, start, end, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                [
                    $customerId,
                    $projectName,
                    $projectDescription,
                    'P-' . $faker->ean8(),
                    $p % 7 !== 0 ? 1 : 0, // visible
                    $faker->boolean(90) ? 1 : 0, // 90% billable
                    rand(10000, 100000),
                    rand(1000000, 10000000),
                    $orderDate->format('Y-m-d'),
                    $startDate->format('Y-m-d'),
                    $endDate->format('Y-m-d'),
                    $faker->hexColor()
                ]
            );
            $projectId = $connection->lastInsertId();
            
            // Создание активностей для проекта
            $activityCount = rand(0, 15);
            for ($a = 1; $a <= $activityCount; $a++) {
                // Используем данные из tasks.php для реалистичных названий и описаний
                $task = $faker->randomElement($tasksData);
                
                $connection->executeStatement(
                    'INSERT INTO kimai2_activities (project_id, name, comment, visible, billable, budget, time_budget, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                    [
                        $projectId,
                        $task['name'],
                        $task['description'],
                        $a % 6 !== 0 ? 1 : 0, // visible  
                        $faker->boolean(80) ? 1 : 0, // 80% billable
                        rand(5000, 50000),
                        rand(100000, 2000000),
                        $faker->hexColor()
                    ]
                );
            }
        }
    }
    
    // Создание глобальных активностей (без проекта)
    $globalActivitiesCount = rand(5, 15);
    echo "Создание $globalActivitiesCount глобальных активностей...\n";
    
    for ($g = 1; $g <= $globalActivitiesCount; $g++) {
        // Для глобальных активностей используем IT-разработка как основу
        $activityDescription = $faker->randomElement($patterns['task_descriptions']['IT-разработка']);
        
        $connection->executeStatement(
            'INSERT INTO kimai2_activities (project_id, name, comment, visible, billable, budget, time_budget, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [
                null, // глобальная активность
                $faker->randomElement($data['activities']),
                $activityDescription,
                $g % 4 !== 0 ? 1 : 0, // visible
                $faker->boolean(80) ? 1 : 0,
                rand(5000, 30000),
                rand(100000, 1000000),
                $faker->hexColor()
            ]
        );
    }
    
    // Создание команд и распределение пользователей
    echo "Создание команд...\n";
    $users = $connection->fetchAllAssociative('SELECT id, username, roles FROM kimai2_users');
    $userIds = [];
    foreach ($users as $user) {
        $userIds[] = $user['id'];
    }
    
    foreach ($patterns['teams'] as $teamData) {
        $connection->executeStatement(
            'INSERT INTO kimai2_teams (name, color) VALUES (?, ?)',
            [$teamData['name'], $teamData['color']]
        );
        $teamId = $connection->lastInsertId();
        
        // Добавляем участников команды
        $teamUserIds = $faker->randomElements($userIds, rand(2, min(4, count($userIds))));
        foreach ($teamUserIds as $userId) {
            $connection->executeStatement(
                'INSERT INTO kimai2_users_teams (user_id, team_id, teamlead) VALUES (?, ?, ?)',
                [$userId, $teamId, 0] // пока все обычные участники
            );
        }
        
        // Связываем команду с клиентами
        $allCustomers = $connection->fetchAllAssociative('SELECT id FROM kimai2_customers');
        if (!empty($allCustomers)) {
            $teamCustomers = $faker->randomElements($allCustomers, rand(1, 3));
            foreach ($teamCustomers as $customer) {
                $connection->executeStatement(
                    'INSERT IGNORE INTO kimai2_customers_teams (customer_id, team_id) VALUES (?, ?)',
                    [$customer['id'], $teamId]
                );
            }
        }
        
        // Связываем команду с проектами
        $allProjects = $connection->fetchAllAssociative('SELECT id FROM kimai2_projects');
        if (!empty($allProjects)) {
            $teamProjects = $faker->randomElements($allProjects, rand(2, 8));
            foreach ($teamProjects as $project) {
                $connection->executeStatement(
                    'INSERT IGNORE INTO kimai2_projects_teams (project_id, team_id) VALUES (?, ?)',
                    [$project['id'], $teamId]
                );
            }
        }
    }
    
    // Создание тарифов
    echo "Создание индивидуальных тарифов...\n";
    $customers = $connection->fetchAllAssociative('SELECT id FROM kimai2_customers');
    $projects = $connection->fetchAllAssociative('SELECT id FROM kimai2_projects');
    $activities = $connection->fetchAllAssociative('SELECT id FROM kimai2_activities');
    
    // Тарифы клиентов
    for ($i = 0; $i < rand(10, 15); $i++) {
        $userId = $faker->randomElement($userIds);
        $customerId = $faker->randomElement($customers)['id'];
        
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_customers_rates (user_id, customer_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
            [$userId, $customerId, $faker->numberBetween(1000, 4000), $faker->numberBetween(500, 1500), $faker->boolean(20) ? 1 : 0]
        );
    }
    
    // Тарифы проектов
    for ($i = 0; $i < rand(20, 30); $i++) {
        $userId = $faker->randomElement($userIds);
        $projectId = $faker->randomElement($projects)['id'];
        
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_projects_rates (user_id, project_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
            [$userId, $projectId, $faker->numberBetween(800, 3500), $faker->numberBetween(400, 1200), $faker->boolean(15) ? 1 : 0]
        );
    }
    
    // Тарифы активностей
    for ($i = 0; $i < rand(50, 100); $i++) {
        $userId = $faker->randomElement($userIds);
        $activityId = $faker->randomElement($activities)['id'];
        
        $connection->executeStatement(
            'INSERT IGNORE INTO kimai2_activities_rates (user_id, activity_id, rate, internal_rate, fixed) VALUES (?, ?, ?, ?, ?)',
            [$userId, $activityId, $faker->numberBetween(600, 3000), $faker->numberBetween(300, 1000), $faker->boolean(10) ? 1 : 0]
        );
    }
    
    // Создание рабочих графиков
    echo "Создание рабочих графиков...\n";
    $startDate = new DateTime('-3 months');
    $endDate = new DateTime('+1 month');
    
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
    
    // Создание записей времени
    echo "Создание записей времени за последние 3 месяца...\n";
    $timesheetStartDate = new DateTime('-3 months');
    $timesheetEndDate = new DateTime('now');
    
    foreach ($userIds as $userId) {
        $currentDate = clone $timesheetStartDate;
        
        while ($currentDate <= $timesheetEndDate) {
            $dayOfWeek = (int) $currentDate->format('N');
            
            // Генерируем записи только для рабочих дней
            if (in_array($dayOfWeek, $patterns['working_days'])) {
                // Пропускаем праздники
                if (!in_array($currentDate->format('Y-m-d'), $patterns['holidays_2024'])) {
                    
                    // Вероятность работы в день 85%
                    if ($faker->boolean(85)) {
                        $entriesCount = $faker->numberBetween(1, 4);
                        $totalDayMinutes = $faker->numberBetween(400, 520);
                        
                        for ($e = 0; $e < $entriesCount; $e++) {
                            $projectId = $faker->randomElement($projects)['id'];
                            $activityId = $faker->randomElement($activities)['id'];
                            
                            $entryMinutes = intval($totalDayMinutes / $entriesCount) + $faker->numberBetween(-30, 30);
                            $entryMinutes = max(15, min(480, $entryMinutes)); // от 15 минут до 8 часов
                            
                            $startHour = $faker->numberBetween(8, 17);
                            $startMinute = $faker->numberBetween(0, 59);
                            $begin = clone $currentDate;
                            $begin->setTime($startHour, $startMinute);
                            
                            $end = clone $begin;
                            $end->add(new DateInterval("PT{$entryMinutes}M"));
                            
                            $descriptions = $patterns['task_descriptions']['IT-разработка'];
                            $description = $faker->randomElement($descriptions);
                            
                            $hourlyRate = $faker->numberBetween(800, 3000);
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
                                    $hourlyRate * 0.7,
                                    $faker->boolean(80) ? 1 : 0,
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
    
    // Создание шаблонов счетов
    echo "Создание шаблонов счетов...\n";
    createInvoiceTemplates($connection, $faker);
    
    // Создание фактических счетов
    echo "Создание фактических счетов на основе timesheet записей...\n";
    createInvoices($connection, $faker);
    
    // Статистика результата
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
    $invoiceTemplates = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_invoice_templates');
    $invoices = $connection->fetchOne('SELECT COUNT(*) FROM kimai2_invoices');
    
    echo "\n✅ Полные фикстуры успешно загружены!\n";
    echo "\n=== ИТОГОВАЯ СТАТИСТИКА ===\n";
    echo "Базовые сущности:\n";
    echo "  - Клиентов: $customers\n";
    echo "  - Проектов: $projects\n";
    echo "  - Активностей: $activities\n";
    echo "  - Тегов: $tags\n";
    echo "\nКоманды и права доступа:\n";
    echo "  - Команд: $teams\n";
    echo "  - Участников команд: $teamMembers\n";
    echo "\nИндивидуальные тарифы:\n";
    echo "  - Тарифы клиентов: $customerRates\n";
    echo "  - Тарифы проектов: $projectRates\n";
    echo "  - Тарифы активностей: $activityRates\n";
    echo "\nРабочее время и записи:\n";
    echo "  - Рабочих дней: $workingTimes\n";
    echo "  - Записей времени: $timesheet\n";
    echo "\nСчета и шаблоны:\n";
    echo "  - Шаблонов счетов: $invoiceTemplates\n";
    echo "  - Фактических счетов: $invoices\n";
    
    // Примеры данных
    echo "\n=== ПРИМЕРЫ РУССКОЯЗЫЧНЫХ ДАННЫХ ===\n";
    
    $customerSample = $connection->fetchAssociative('SELECT name, address, phone FROM kimai2_customers LIMIT 1');
    echo "Клиент: " . $customerSample['name'] . "\n";
    echo "Адрес: " . $customerSample['address'] . "\n";
    echo "Телефон: " . $customerSample['phone'] . "\n\n";
    
    $projectSamples = $connection->fetchAllAssociative('SELECT name, order_date, budget, color FROM kimai2_projects LIMIT 3');
    echo "Проекты:\n";
    foreach ($projectSamples as $project) {
        echo "  - " . $project['name'] . " (бюджет: " . number_format($project['budget']) . " ₽, цвет: " . $project['color'] . ")\n";
    }
    
    $activitySamples = $connection->fetchAllAssociative('SELECT name, budget, color FROM kimai2_activities LIMIT 5');
    echo "\nАктивности:\n";
    foreach ($activitySamples as $activity) {
        echo "  - " . $activity['name'] . " (бюджет: " . number_format($activity['budget']) . " ₽, цвет: " . $activity['color'] . ")\n";
    }
    
    $tagSamples = $connection->fetchAllAssociative('SELECT name FROM kimai2_tags LIMIT 10');
    echo "\nТеги: " . implode(', ', array_column($tagSamples, 'name')) . "\n";
    
    // Примеры записей времени
    $timesheetSamples = $connection->fetchAllAssociative('
        SELECT t.description, t.duration/3600 as hours, t.rate, p.name as project_name, a.name as activity_name 
        FROM kimai2_timesheet t 
        JOIN kimai2_projects p ON t.project_id = p.id 
        JOIN kimai2_activities a ON t.activity_id = a.id 
        LIMIT 5
    ');
    
    echo "\nПримеры записей времени:\n";
    foreach ($timesheetSamples as $entry) {
        echo sprintf("  - %s (%s → %s): %.1f ч, %.0f ₽\n", 
            $entry['description'], 
            $entry['project_name'], 
            $entry['activity_name'], 
            $entry['hours'], 
            $entry['rate']
        );
    }
    
    // Статистика записей времени
    $totalHours = $connection->fetchOne('SELECT SUM(duration)/3600 FROM kimai2_timesheet');
    $totalRevenue = $connection->fetchOne('SELECT SUM(rate) FROM kimai2_timesheet');
    
    echo "\n=== ИТОГИ РАБОТЫ ===\n";
    echo sprintf("Общее время: %.1f часов\n", $totalHours);
    echo sprintf("Общая выручка: %.0f ₽\n", $totalRevenue);
    
    echo "\n🎉 Все этапы создания реалистичной системы учета времени завершены!\n";
    echo "💡 Система содержит полную историю работы за 3 месяца с командами, тарифами и графиками.\n";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
}

/**
 * Создание шаблонов счетов
 */
function createInvoiceTemplates($connection, $faker): void 
{
    // Русские условия оплаты
    $paymentTerms_ru = 'Благодарим за доверие к нашей компании! Мы всегда готовы оказать вам качественные услуги.' . PHP_EOL .
        'Просим перевести общую сумму в течение 14 дней на указанный счёт. В назначении платежа обязательно укажите номер данного счёта.';
    
    $paymentTerms_alt_ru = 'Спасибо за сотрудничество! Мы высоко ценим наши деловые отношения.' . PHP_EOL .
        'Просим произвести оплату до указанной даты. Надеемся на дальнейшее плодотворное сотрудничество.';
    
    // Русские компании
    $russianCompanies = ['ООО "ТехСервис"', 'ИП Сидоров А.В.', 'ООО "РосРазработка"', 'ЗАО "СтройИнвест"'];
    
    // Шаблоны счетов
    $templates = [
        ['Основной (PDF)', 'Счёт', 'default', 'default', 'default', $faker->randomElement($russianCompanies), 20, 10, $paymentTerms_ru],
        ['Счёт-фактура (HTML)', 'Компания', 'invoice', 'default', 'default', $faker->randomElement($russianCompanies), 20, 30, $paymentTerms_ru],
        ['По дате услуги (PDF)', 'Счёт', 'service-date', 'short', 'default', $faker->randomElement($russianCompanies), 20, 14, $paymentTerms_alt_ru],
        ['Табель времени (HTML)', 'Табель', 'timesheet', 'default', 'default', $faker->randomElement($russianCompanies), 20, 7, $paymentTerms_alt_ru],
    ];
    
    foreach ($templates as $template) {
        // Генерация русских банковских реквизитов
        $russianBanks = ['ПАО Сбербанк', 'Банк ВТБ (ПАО)', 'АО "Альфа-Банк"', 'Банк ГПБ (АО)'];
        $paymentDetails = $faker->randomElement($russianBanks) . PHP_EOL .
            'БИК: ' . $faker->numerify('04########') . PHP_EOL .
            'Корр. счёт: ' . $faker->numerify('301##810#########') . PHP_EOL .
            'Расч. счёт: ' . $faker->numerify('407##810#########');
        
        $contact = 'Телефон: ' . $faker->phoneNumber() . PHP_EOL .
            'Email: ' . $faker->safeEmail() . PHP_EOL .
            'Сайт: www.' . $faker->domainName();
        
        $address = $faker->streetAddress() . PHP_EOL . $faker->postcode() . ' ' . $faker->city() . ', Россия';
        
        $connection->executeStatement(
            'INSERT INTO kimai2_invoice_templates (name, title, renderer, calculator, number_generator, company, vat, due_days, payment_terms, language, address, contact, payment_details, vat_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $template[0], $template[1], $template[2], $template[3], $template[4], 
                $template[5], $template[6], $template[7], $template[8], 'ru',
                $address, $contact, $paymentDetails, $faker->numerify('############')
            ]
        );
    }
}

/**
 * Создание фактических счетов на основе timesheet записей
 */
function createInvoices($connection, $faker): void 
{
    // Получаем все timesheet записи сгруппированные по клиентам и месяцам
    $timesheetGroups = $connection->fetchAllAssociative("
        SELECT 
            c.id as customer_id,
            c.name as customer_name,
            DATE_FORMAT(t.start_time, '%Y-%m') as month,
            SUM(t.rate) as total_amount,
            COUNT(*) as entries_count,
            MIN(t.start_time) as period_start,
            MAX(t.start_time) as period_end
        FROM kimai2_timesheet t
        JOIN kimai2_activities a ON t.activity_id = a.id  
        JOIN kimai2_projects p ON a.project_id = p.id
        JOIN kimai2_customers c ON p.customer_id = c.id
        WHERE t.rate > 0
        GROUP BY c.id, DATE_FORMAT(t.start_time, '%Y-%m')
        HAVING total_amount > 1000
        ORDER BY c.id, month DESC
    ");
    
    // Получаем пользователей и шаблоны
    $users = $connection->fetchAllAssociative('SELECT id FROM kimai2_users ORDER BY RAND()');
    $templates = $connection->fetchAllAssociative('SELECT id FROM kimai2_invoice_templates LIMIT 1');
    
    if (empty($templates)) {
        echo "⚠️ Нет шаблонов счетов. Создание счетов пропущено.\n";
        return;
    }
    
    $templateId = $templates[0]['id'];
    $invoiceNumber = 1000;
    $statuses = ['new', 'pending', 'paid', 'canceled'];
    $statusWeights = [10, 30, 50, 10]; // Вероятности статусов
    
    foreach ($timesheetGroups as $group) {
        $invoiceNumber++;
        
        // Определяем статус счёта
        $status = $faker->randomElement($statuses);
        
        // Для старых счетов чаще делаем paid
        $monthsAgo = (new DateTime())->diff(new DateTime($group['month'] . '-01'))->m;
        if ($monthsAgo > 2) {
            $status = $faker->boolean(80) ? 'paid' : 'pending';
        }
        
        // Дата создания счёта (в конце месяца)
        $createdAt = new DateTime($group['month'] . '-' . rand(25, 28));
        $createdAt->setTime(rand(9, 17), rand(0, 59));
        
        // Дата оплаты для оплаченных счетов
        $paymentDate = null;
        if ($status === 'paid') {
            $paymentDate = clone $createdAt;
            $paymentDate->modify('+' . rand(1, 14) . ' days');
        }
        
        $connection->executeStatement(
            'INSERT INTO kimai2_invoices (invoice_number, customer_id, user_id, created_at, timezone, total, tax, currency, vat, due_days, status, payment_date, invoice_filename) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                'INV-' . str_pad($invoiceNumber, 6, '0', STR_PAD_LEFT),
                $group['customer_id'],
                $faker->randomElement($users)['id'],
                $createdAt->format('Y-m-d H:i:s'),
                'Europe/Moscow',
                $group['total_amount'],
                round($group['total_amount'] - ($group['total_amount'] / 1.2)), // НДС 20%
                'RUB',
                20.0,
                14,
                $status,
                $paymentDate ? $paymentDate->format('Y-m-d') : null,
                'invoice_' . $invoiceNumber . '.pdf'
            ]
        );
    }
}
