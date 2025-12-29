<?php

/**
 * Скрипт для обработки CSV данных проектов и задач от LLM
 * Этап 1: Парсинг, дедупликация и создание PHP массивов
 */

class LLMDataProcessor
{
    private const CSV_FILE = 'data/проекты_с_задачами_2500.csv';
    private const OUTPUT_DIR = 'src/DataFixtures/Data/';

    private array $spheres = [];
    private array $projects = [];
    private array $tasks = [];
    private array $projectTasks = [];
    private array $rawData = [];
    private array $processedData = [];

    public function process(): void
    {
        echo "Обработка CSV данных от LLM...\n";
        
        $this->createOutputDirectory();
        $this->parseCsvFile();
        $this->deduplicateProjects();
        $this->categorizeData();
        $this->savePhpArrays();
        $this->printStatistics();
    }

    private function createOutputDirectory(): void
    {
        if (!file_exists(self::OUTPUT_DIR)) {
            mkdir(self::OUTPUT_DIR, 0755, true);
            echo "Создана директория: " . self::OUTPUT_DIR . "\n";
        }
    }

    private function parseCsvFile(): void
    {
        if (!file_exists(self::CSV_FILE)) {
            throw new Exception("CSV файл не найден: " . self::CSV_FILE);
        }

        $handle = fopen(self::CSV_FILE, 'r');
        if (!$handle) {
            throw new Exception("Не удалось открыть файл: " . self::CSV_FILE);
        }

        // Пропускаем заголовок
        fgetcsv($handle);

        $rawData = [];
        while (($row = fgetcsv($handle)) !== false) {
            if (count($row) >= 5) {
                $rawData[] = [
                    'sphere' => trim($row[0]),
                    'project_name' => trim($row[1]),
                    'project_description' => trim($row[2]),
                    'task_name' => trim($row[3]),
                    'task_description' => trim($row[4])
                ];
            }
        }
        fclose($handle);

        echo "Прочитано " . count($rawData) . " записей из CSV\n";
        $this->rawData = $rawData;
    }

    private function deduplicateProjects(): void
    {
        $uniqueProjects = [];
        $projectKey = function($item) {
            return md5($item['project_name'] . '|' . $item['project_description']);
        };

        foreach ($this->rawData as $item) {
            $key = $projectKey($item);
            
            if (!isset($uniqueProjects[$key])) {
                $uniqueProjects[$key] = [
                    'sphere' => $item['sphere'],
                    'name' => $item['project_name'],
                    'description' => $item['project_description'],
                    'tasks' => []
                ];
            }

            // Добавляем задачу к проекту
            $uniqueProjects[$key]['tasks'][] = [
                'name' => $item['task_name'],
                'description' => $item['task_description']
            ];
        }

        $this->processedData = array_values($uniqueProjects);
        echo "Найдено " . count($this->processedData) . " уникальных проектов\n";
    }

    private function categorizeData(): void
    {
        foreach ($this->processedData as $item) {
            $sphere = $item['sphere'];
            
            // Собираем сферы
            if (!in_array($sphere, $this->spheres)) {
                $this->spheres[] = $sphere;
            }

            // Группируем проекты по сферам
            if (!isset($this->projects[$sphere])) {
                $this->projects[$sphere] = [];
            }

            $projectData = [
                'name' => $item['name'],
                'description' => $item['description']
            ];

            $this->projects[$sphere][] = $projectData;

            // Собираем все задачи
            foreach ($item['tasks'] as $task) {
                $this->tasks[] = [
                    'name' => $task['name'],
                    'description' => $task['description'],
                    'sphere' => $sphere
                ];
            }

            // Связываем задачи с проектами
            $projectKey = $item['name'];
            if (!isset($this->projectTasks[$projectKey])) {
                $this->projectTasks[$projectKey] = [];
            }
            
            foreach ($item['tasks'] as $task) {
                $this->projectTasks[$projectKey][] = $task;
            }
        }
    }

    private function savePhpArrays(): void
    {
        // Сферы деятельности
        $this->saveArray('spheres.php', $this->spheres, 'Сферы деятельности для проектов');

        // Проекты по сферам
        $this->saveArray('projects.php', $this->projects, 'Проекты, сгруппированные по сферам деятельности');

        // Все задачи
        $this->saveArray('tasks.php', $this->tasks, 'Все задачи с привязкой к сферам');

        // Связи проект-задачи
        $this->saveArray('project_tasks.php', $this->projectTasks, 'Задачи, привязанные к конкретным проектам');

        echo "Сохранены PHP массивы в директории: " . self::OUTPUT_DIR . "\n";
    }

    private function saveArray(string $filename, array $data, string $description): void
    {
        $filepath = self::OUTPUT_DIR . $filename;
        
        $content = "<?php\n\n";
        $content .= "/**\n";
        $content .= " * " . $description . "\n";
        $content .= " * Сгенерировано автоматически из LLM данных\n";
        $content .= " * Дата: " . date('Y-m-d H:i:s') . "\n";
        $content .= " */\n\n";
        $content .= "return " . $this->varExportFormatted($data) . ";\n";

        file_put_contents($filepath, $content);
    }

    private function varExportFormatted(array $data): string
    {
        $export = var_export($data, true);
        
        // Форматирование для читаемости
        $export = preg_replace('/\d+ => /', '', $export);
        $export = preg_replace('/array \(/', '[', $export);
        $export = preg_replace('/\)/', ']', $export);
        $export = preg_replace('/,\s*\]/', "\n  ]", $export);
        
        return $export;
    }

    private function printStatistics(): void
    {
        echo "\n=== СТАТИСТИКА ОБРАБОТКИ ===\n";
        echo "Сферы деятельности: " . count($this->spheres) . "\n";
        
        $totalProjects = 0;
        foreach ($this->projects as $sphere => $projects) {
            echo "  {$sphere}: " . count($projects) . " проектов\n";
            $totalProjects += count($projects);
        }
        
        echo "Всего проектов: " . $totalProjects . "\n";
        echo "Всего задач: " . count($this->tasks) . "\n";
        
        echo "\n=== КАЧЕСТВО ДАННЫХ ===\n";
        $this->validateDataQuality();
    }

    private function validateDataQuality(): void
    {
        // Проверка на пустые значения
        $emptyNames = 0;
        $emptyDescriptions = 0;
        
        foreach ($this->tasks as $task) {
            if (empty(trim($task['name']))) $emptyNames++;
            if (empty(trim($task['description']))) $emptyDescriptions++;
        }
        
        echo "Задачи с пустыми названиями: {$emptyNames}\n";
        echo "Задачи с пустыми описаниями: {$emptyDescriptions}\n";
        
        // Проверка длины названий
        $longNames = array_filter($this->tasks, fn($task) => mb_strlen($task['name']) > 100);
        echo "Задачи с названиями >100 символов: " . count($longNames) . "\n";
        
        // Проверка уникальности названий проектов
        $projectNames = [];
        foreach ($this->projects as $sphere => $projects) {
            foreach ($projects as $project) {
                $projectNames[] = $project['name'];
            }
        }
        
        $uniqueNames = array_unique($projectNames);
        $duplicates = count($projectNames) - count($uniqueNames);
        echo "Дубликаты названий проектов: {$duplicates}\n";
        
        if ($emptyNames + $emptyDescriptions + count($longNames) + $duplicates === 0) {
            echo "✅ Данные прошли базовую валидацию\n";
        } else {
            echo "⚠️  Найдены проблемы качества данных\n";
        }
    }
}

// Запуск обработки
try {
    $processor = new LLMDataProcessor();
    $processor->process();
    echo "\n✅ Этап 1 завершен успешно!\n";
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
    exit(1);
}
