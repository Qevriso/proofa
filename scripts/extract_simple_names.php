<?php

/**
 * Извлечение простых массивов названий проектов и активностей
 * из подготовленных LLM данных для использования в CustomerFixtures
 */

class SimpleNamesExtractor
{
    private const PROJECTS_FILE = 'src/DataFixtures/Data/projects.php';
    private const TASKS_FILE = 'src/DataFixtures/Data/tasks.php';
    private const OUTPUT_FILE = 'src/DataFixtures/Data/simple_names.php';

    public function extract(): void
    {
        echo "Извлечение простых названий для CustomerFixtures...\n";

        $projectNames = $this->extractProjectNames();
        $activityNames = $this->extractActivityNames();

        $this->saveSimpleNames($projectNames, $activityNames);
        $this->printStatistics($projectNames, $activityNames);

        echo "✅ Готовые данные сохранены в: " . self::OUTPUT_FILE . "\n";
    }

    private function extractProjectNames(): array
    {
        $projectsData = require self::PROJECTS_FILE;
        $names = [];

        foreach ($projectsData as $sphere => $projects) {
            foreach ($projects as $project) {
                $names[] = $project['name'];
            }
        }

        return array_values(array_unique($names));
    }

    private function extractActivityNames(): array
    {
        $tasksData = require self::TASKS_FILE;
        $names = [];

        foreach ($tasksData as $task) {
            $names[] = $task['name'];
        }

        return array_values(array_unique($names));
    }

    private function saveSimpleNames(array $projects, array $activities): void
    {
        $tags = [
            'frontend', 'backend', 'database', 'testing', 'deployment',
            'security', 'performance', 'mobile', 'api', 'integration',
            'analytics', 'monitoring', 'documentation', 'training', 'planning',
            'design', 'research', 'optimization', 'migration', 'automation',
            'maintenance', 'support', 'review', 'audit', 'compliance',
            'infrastructure', 'architecture', 'refactoring', 'scaling', 'urgent'
        ];

        $data = [
            'projects' => $projects,
            'activities' => $activities,
            'tags' => $tags
        ];

        $content = "<?php\n\n";
        $content .= "/**\n";
        $content .= " * Простые массивы названий для CustomerFixtures\n";
        $content .= " * Извлечено из LLM данных\n";
        $content .= " * Дата: " . date('Y-m-d H:i:s') . "\n";
        $content .= " */\n\n";
        $content .= "return " . $this->formatArray($data) . ";\n";

        file_put_contents(self::OUTPUT_FILE, $content);
    }

    private function formatArray(array $data): string
    {
        $export = var_export($data, true);
        
        // Форматирование для читаемости
        $export = preg_replace('/\d+ => /', '', $export);
        $export = preg_replace('/array \(/', '[', $export);
        $export = preg_replace('/\)/', ']', $export);
        $export = preg_replace('/,\s*\]/', "\n  ]", $export);
        
        return $export;
    }

    private function printStatistics(array $projects, array $activities): void
    {
        echo "\n=== СТАТИСТИКА ===\n";
        echo "Названий проектов: " . count($projects) . "\n";
        echo "Названий активностей: " . count($activities) . "\n";
        echo "Английских тегов: 30\n";
        
        echo "\nПримеры проектов:\n";
        for ($i = 0; $i < min(3, count($projects)); $i++) {
            echo "  - " . $projects[$i] . "\n";
        }
        
        echo "\nПримеры активностей:\n";
        for ($i = 0; $i < min(3, count($activities)); $i++) {
            echo "  - " . $activities[$i] . "\n";
        }
        
        echo "\nПримеры тегов:\n";
        echo "  - frontend, backend, database\n";
        echo "  - security, performance, mobile\n";
        echo "  - analytics, monitoring, documentation\n";
    }
}

// Запуск извлечения
try {
    $extractor = new SimpleNamesExtractor();
    $extractor->extract();
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "\n";
    exit(1);
}
