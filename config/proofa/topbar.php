<?php
// config/proofa/topbar.php

return [

    'dashboard' => [
        'title' => 'Дашборд',
        'match' => ['dashboard'],
        'tabs' => [
            ['label' => 'Обзор', 'route' => 'dashboard'],
        ],
    ],

    'activity' => [
        'title' => 'Активность',
        'match' => ['timesheet', 'calendar'], // <-- ключевой момент
        'tabs' => [
            ['label' => 'Мои задачи', 'route' => 'timesheet'],

            [
                'label' => 'Время за неделю',
                'route' => 'timesheet',
                'query' => ['view' => 'week'],
            ],

            ['label' => 'Календарь', 'route' => 'calendar'],
        ],
    ],

    'reporting' => [
        'title' => 'Отчёты',
        'match' => ['reporting'],
        'tabs' => [
            ['label' => 'Общее время', 'route' => 'reporting'],
            [
                'label' => 'Экспорт',
                'route' => 'reporting',
                'query' => ['export' => 1],
            ],
        ],
    ],
];
