<?php

/*
 * This file is part of the Kimai time-tracking app.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\DataFixtures;

use App\Entity\Activity;
use App\Entity\ActivityRate;
use App\Entity\Customer;
use App\Entity\CustomerRate;
use App\Entity\Project;
use App\Entity\ProjectRate;
use App\Entity\Tag;
use App\Entity\Team;
use App\Entity\TeamMember;
use App\Entity\Timesheet;
use App\Entity\User;
use App\Entity\WorkingTime;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;

/**
 * Defines the sample data to load in the database when running the unit and
 * functional tests or while development.
 *
 * Execute this command to load the data:
 * bin/console doctrine:fixtures:load
 *
 * @codeCoverageIgnore
 */
final class CustomerFixtures extends Fixture implements DependentFixtureInterface
{
    public const MIN_CUSTOMERS = 5;
    public const MAX_CUSTOMERS = 15;
    public const MIN_BUDGET = 0;
    public const MAX_BUDGET = 100000;
    public const MIN_TIME_BUDGET = 0;
    public const MAX_TIME_BUDGET = 10000000;
    public const MIN_GLOBAL_ACTIVITIES = 5;
    public const MAX_GLOBAL_ACTIVITIES = 30;
    public const MIN_PROJECTS_PER_CUSTOMER = 2;
    public const MAX_PROJECTS_PER_CUSTOMER = 25;
    public const MIN_ACTIVITIES_PER_PROJECT = 0;
    public const MAX_ACTIVITIES_PER_PROJECT = 25;

    private array $projectNames = [];
    private array $activityNames = [];
    private array $projectDescriptions = [];
    private array $tasksData = [];
    private array $timesheetPatterns = [];

    public function __construct()
    {
        $data = require __DIR__ . '/Data/simple_names.php';
        $this->projectNames = $data['projects'];
        $this->activityNames = $data['activities'];
        $this->projectDescriptions = $data['project_descriptions'];
        $this->tasksData = require __DIR__ . '/Data/tasks.php';
        $this->timesheetPatterns = require __DIR__ . '/Data/timesheet_patterns.php';
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            TagFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('ru_RU');

        $amountCustomers = rand(self::MIN_CUSTOMERS, self::MAX_CUSTOMERS);
        for ($c = 1; $c <= $amountCustomers; $c++) {
            $visibleCustomer = 0 !== $c % 5;
            $customer = $this->createCustomer($faker, $visibleCustomer);
            $manager->persist($customer);

            $projectForCustomer = rand(self::MIN_PROJECTS_PER_CUSTOMER, self::MAX_PROJECTS_PER_CUSTOMER);
            for ($p = 1; $p <= $projectForCustomer; $p++) {
                $visibleProject = 0 !== $p % 7;
                $project = $this->createProject($faker, $customer, $visibleProject);
                $manager->persist($project);

                $activityForProject = rand(self::MIN_ACTIVITIES_PER_PROJECT, self::MAX_ACTIVITIES_PER_PROJECT);
                for ($a = 1; $a <= $activityForProject; $a++) {
                    $visibleActivity = 0 !== $a % 6;
                    $activity = $this->createActivity($faker, $project, $visibleActivity);
                    $manager->persist($activity);
                }
            }

            $manager->flush();
            $manager->clear();
        }

        $amountGlobalActivities = rand(self::MIN_GLOBAL_ACTIVITIES, self::MAX_GLOBAL_ACTIVITIES);
        for ($c = 1; $c <= $amountGlobalActivities; $c++) {
            $visibleActivity = 0 !== $c % 4;
            $activity = $this->createActivity($faker, null, $visibleActivity);
            $manager->persist($activity);
        }

        $manager->flush();
        $manager->clear();

        // Генерируем дополнительные данные для реалистичности
        $this->createTeams($manager, $faker);
        $this->createRates($manager, $faker);
        $this->createWorkingTimes($manager, $faker);
        $this->createTimesheetEntries($manager, $faker);

        $manager->flush();
        $manager->clear();
    }

    private function createCustomer(Generator $faker, bool $visible): Customer
    {
        $entry = new Customer($faker->company());
        $entry->setCurrency($faker->currencyCode());
        $entry->setAddress($faker->address());
        $entry->setEmail($faker->safeEmail());
        $entry->setComment($faker->text());
        $entry->setNumber('C-' . $faker->ean8());
        $entry->setCountry($faker->countryCode());
        $entry->setTimezone($faker->timezone());
        $entry->setVisible($visible);
        $entry->setVatId($faker->creditCardNumber());

        if (rand(0, 3) % 3) {
            $entry->setBudget(rand(self::MIN_BUDGET, self::MAX_BUDGET));
        }

        if (rand(0, 3) % 3) {
            $entry->setTimeBudget(rand(self::MIN_TIME_BUDGET, self::MAX_TIME_BUDGET));
        }

        return $entry;
    }

    private function createProject(Generator $faker, Customer $customer, bool $visible): Project
    {
        $entry = new Project();

        // Осмысленное название проекта
        $projectName = $faker->randomElement($this->projectNames);
        $entry->setName($projectName);

        // Реалистичное описание проекта
        $description = $this->projectDescriptions[$projectName] ?? $faker->text();
        $entry->setComment($description);
        $entry->setCustomer($customer);
        $entry->setOrderNumber('P-' . $faker->ean8());
        $entry->setVisible($visible);

        // Заполнение всех полей по максимуму
            $entry->setBudget(rand(self::MIN_BUDGET, self::MAX_BUDGET));
        $entry->setTimeBudget(rand(self::MIN_TIME_BUDGET, self::MAX_TIME_BUDGET));
        
        // Даты проекта
        $orderDate = $faker->dateTimeBetween('-6 months', '+1 month');
        $startDate = $faker->dateTimeBetween($orderDate, $orderDate->format('Y-m-d') . ' +2 weeks');
        $endDate = $faker->dateTimeBetween($startDate->format('Y-m-d') . ' +1 month', $startDate->format('Y-m-d') . ' +6 months');
        
        $entry->setOrderDate($orderDate);
        $entry->setStart($startDate);
        $entry->setEnd($endDate);
        
        // Цвет и billable
        $entry->setColor($faker->hexColor());
        $entry->setBillable($faker->boolean(90)); // 90% проектов billable

        return $entry;
    }

    private function createActivity(Generator $faker, ?Project $project, bool $visible): Activity
    {
        $entry = new Activity();
        
        // Используем данные из tasks.php для реалистичных названий и описаний
        $task = $faker->randomElement($this->tasksData);
        $entry->setName($task['name']);
        $entry->setComment($task['description']);
        $entry->setProject($project);
        $entry->setVisible($visible);

        // Заполнение всех полей по максимуму
            $entry->setBudget(rand(self::MIN_BUDGET, self::MAX_BUDGET));
        $entry->setTimeBudget(rand(self::MIN_TIME_BUDGET, self::MAX_TIME_BUDGET));
        
        // Цвет и billable
        $entry->setColor($faker->hexColor());
        $entry->setBillable($faker->boolean(80)); // 80% активностей billable

        return $entry;
    }

    /**
     * Создание команд и распределение пользователей
     */
    private function createTeams(ObjectManager $manager, Generator $faker): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        
        foreach ($this->timesheetPatterns['teams'] as $teamData) {
            $team = new Team($teamData['name']);
            $team->setColor($teamData['color']);
            $manager->persist($team);
            
            // Добавляем участников команды
            $teamUsers = $faker->randomElements($users, rand(2, min(4, count($users))));
            $teamleadAssigned = false;
            
            foreach ($teamUsers as $user) {
                $member = new TeamMember();
                $member->setUser($user);
                $member->setTeam($team);
                
                // Назначаем тимлида если у пользователя подходящая роль
                if (!$teamleadAssigned && in_array('ROLE_TEAMLEAD', $user->getRoles())) {
                    $member->setTeamlead(true);
                    $teamleadAssigned = true;
                }
                
                $manager->persist($member);
            }
            
            // Привязываем клиентов и проекты к командам
            $customers = $manager->getRepository(Customer::class)->findBy([], null, rand(1, 3));
            foreach ($customers as $customer) {
                $team->addCustomer($customer);
            }
            
            $projects = $manager->getRepository(Project::class)->findBy([], null, rand(2, 8));
            foreach ($projects as $project) {
                $team->addProject($project);
            }
        }
    }

    /**
     * Создание индивидуальных тарифов
     */
    private function createRates(ObjectManager $manager, Generator $faker): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $customers = $manager->getRepository(Customer::class)->findAll();
        $projects = $manager->getRepository(Project::class)->findAll();
        $activities = $manager->getRepository(Activity::class)->findAll();

        // Тарифы клиентов (10-15 записей)
        for ($i = 0; $i < rand(10, 15); $i++) {
            $user = $faker->randomElement($users);
            $customer = $faker->randomElement($customers);
            
            // Проверяем, что такой тариф еще не существует
            $existingRate = $manager->getRepository(CustomerRate::class)
                ->findOneBy(['user' => $user, 'customer' => $customer]);
            
            if (!$existingRate) {
                $rate = new CustomerRate();
                $rate->setUser($user);
                $rate->setCustomer($customer);
                $rate->setRate($faker->numberBetween(1000, 4000));
                $rate->setInternalRate($faker->numberBetween(500, 1500));
                $rate->setFixed($faker->boolean(20)); // 20% фиксированные тарифы
                $manager->persist($rate);
            }
        }

        // Тарифы проектов (20-30 записей)
        for ($i = 0; $i < rand(20, 30); $i++) {
            $user = $faker->randomElement($users);
            $project = $faker->randomElement($projects);
            
            $existingRate = $manager->getRepository(ProjectRate::class)
                ->findOneBy(['user' => $user, 'project' => $project]);
            
            if (!$existingRate) {
                $rate = new ProjectRate();
                $rate->setUser($user);
                $rate->setProject($project);
                $rate->setRate($faker->numberBetween(800, 3500));
                $rate->setInternalRate($faker->numberBetween(400, 1200));
                $rate->setFixed($faker->boolean(15));
                $manager->persist($rate);
            }
        }

        // Тарифы активностей (50-100 записей)
        for ($i = 0; $i < rand(50, 100); $i++) {
            $user = $faker->randomElement($users);
            $activity = $faker->randomElement($activities);
            
            $existingRate = $manager->getRepository(ActivityRate::class)
                ->findOneBy(['user' => $user, 'activity' => $activity]);
            
            if (!$existingRate) {
                $rate = new ActivityRate();
                $rate->setUser($user);
                $rate->setActivity($activity);
                $rate->setRate($faker->numberBetween(600, 3000));
                $rate->setInternalRate($faker->numberBetween(300, 1000));
                $rate->setFixed($faker->boolean(10));
                $manager->persist($rate);
            }
        }
    }

    /**
     * Создание рабочих графиков
     */
    private function createWorkingTimes(ObjectManager $manager, Generator $faker): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $startDate = new \DateTime('-3 months');
        $endDate = new \DateTime('+1 month');
        
        foreach ($users as $user) {
            $currentDate = clone $startDate;
            
            while ($currentDate <= $endDate) {
                $dayOfWeek = (int) $currentDate->format('N'); // 1=понедельник, 7=воскресенье
                
                // Только рабочие дни
                if (in_array($dayOfWeek, $this->timesheetPatterns['working_days'])) {
                    // Пропускаем праздники
                    if (!in_array($currentDate->format('Y-m-d'), $this->timesheetPatterns['holidays_2024'])) {
                        $workingTime = new WorkingTime();
                        $workingTime->setUser($user);
                        $workingTime->setDate(\DateTimeImmutable::createFromMutable($currentDate));
                        
                        // Рабочий день 7-9 часов (в секундах)
                        $hours = $faker->randomElement($this->timesheetPatterns['work_hours']['full_day_hours']);
                        $workingTime->setExpected($hours * 3600);
                        $workingTime->setActual($hours * 3600);
                        
                        $manager->persist($workingTime);
                    }
                }
                
                $currentDate->modify('+1 day');
            }
        }
    }

    /**
     * Создание записей времени
     */
    private function createTimesheetEntries(ObjectManager $manager, Generator $faker): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $projects = $manager->getRepository(Project::class)->findAll();
        $activities = $manager->getRepository(Activity::class)->findAll();
        $tags = $manager->getRepository(Tag::class)->findAll();
        
        $startDate = new \DateTime('-3 months');
        $endDate = new \DateTime('now');
        
        foreach ($users as $user) {
            $currentDate = clone $startDate;
            
            while ($currentDate <= $endDate) {
                $dayOfWeek = (int) $currentDate->format('N');
                
                // Генерируем записи только для рабочих дней
                if (in_array($dayOfWeek, $this->timesheetPatterns['working_days'])) {
                    // Пропускаем праздники
                    if (!in_array($currentDate->format('Y-m-d'), $this->timesheetPatterns['holidays_2024'])) {
                        
                        // Вероятность работы в день 85%
                        if ($faker->boolean(85)) {
                            $this->createDayTimesheetEntries($manager, $faker, $user, $currentDate, $projects, $activities, $tags);
                        }
                    }
                }
                
                $currentDate->modify('+1 day');
            }
        }
    }

    /**
     * Создание записей времени за один день
     */
    private function createDayTimesheetEntries(ObjectManager $manager, Generator $faker, User $user, \DateTime $date, array $projects, array $activities, array $tags): void
    {
        $workHours = $this->timesheetPatterns['work_hours'];
        $taskDescriptions = $this->timesheetPatterns['task_descriptions'];
        
        // Количество записей в день (1-4)
        $entriesCount = $faker->numberBetween(1, 4);
        $totalDayMinutes = $faker->numberBetween(400, 520); // 6.5-8.5 часов в минутах
        
        for ($i = 0; $i < $entriesCount; $i++) {
            $timesheet = new Timesheet();
            
            // Пользователь, проект и активность
            $timesheet->setUser($user);
            $project = $faker->randomElement($projects);
            $timesheet->setProject($project);
            
            // Выбираем активность (либо из проекта, либо глобальную)
            $projectActivities = array_filter($activities, fn($a) => $a->getProject() === $project);
            if (!empty($projectActivities)) {
                $activity = $faker->randomElement($projectActivities);
            } else {
                $activity = $faker->randomElement($activities);
            }
            $timesheet->setActivity($activity);
            
            // Время работы
            $entryMinutes = $totalDayMinutes / $entriesCount + $faker->numberBetween(-30, 30);
            $entryMinutes = max(15, $entryMinutes); // минимум 15 минут
            
            // Начало и конец
            $startHour = $faker->numberBetween(8, 17);
            $startMinute = $faker->numberBetween(0, 59);
            $begin = clone $date;
            $begin->setTime($startHour, $startMinute);
            
            $end = clone $begin;
            $end->modify("+{$entryMinutes} minutes");
            
            $timesheet->setBegin($begin);
            $timesheet->setEnd($end);
            $timesheet->setDuration($entryMinutes * 60); // в секундах
            
            // Описание задачи
            $sphere = $project->getCustomer()->getName();
            $sphereKey = 'default';
            foreach (array_keys($taskDescriptions) as $key) {
                if (mb_strpos($sphere, mb_substr($key, 0, 5)) !== false) {
                    $sphereKey = $key;
                    break;
                }
            }
            
            $descriptions = $taskDescriptions[$sphereKey] ?? $taskDescriptions['IT-разработка'];
            $timesheet->setDescription($faker->randomElement($descriptions));
            
            // Категория работы
            $categories = $this->timesheetPatterns['categories'];
            $category = $faker->randomElement(array_keys($categories));
            $timesheet->setCategory($category);
            
            // Billable статус
            $billableProbability = $this->timesheetPatterns['billable_probability'][$sphereKey] ?? 80;
            $timesheet->setBillable($faker->boolean($billableProbability));
            
            // Тарифы
            $userPrefs = $user->getPreferences();
            $hourlyRate = 1500; // значение по умолчанию
            foreach ($userPrefs as $pref) {
                if ($pref->getName() === 'hourly_rate') {
                    $hourlyRate = (float) $pref->getValue();
                    break;
                }
            }
            
            $timesheet->setHourlyRate($hourlyRate);
            $timesheet->setRate(($entryMinutes / 60) * $hourlyRate);
            $timesheet->setInternalRate($hourlyRate * 0.7); // внутренняя ставка 70%
            
            // Добавляем 1-3 случайных тега к записи времени
            if (!empty($tags)) {
                $tagsCount = $faker->numberBetween(1, 3);
                $selectedTags = $faker->randomElements($tags, $tagsCount);
                foreach ($selectedTags as $tag) {
                    $timesheet->addTag($tag);
                }
            }
            
            $manager->persist($timesheet);
        }
    }
}
