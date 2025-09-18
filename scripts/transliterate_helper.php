<?php

/**
 * Вспомогательная функция для транслитерации русских имен в латиницу
 * Используется для создания реалистичных username из русских ФИО
 */

function transliterate(string $text): string
{
    $transliterationMap = [
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'е' => 'e', 'ё' => 'yo', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
        'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
        'у' => 'u', 'ф' => 'f', 'х' => 'kh', 'ц' => 'ts', 'ч' => 'ch',
        'ш' => 'sh', 'щ' => 'shch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
        
        'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D',
        'Е' => 'E', 'Ё' => 'Yo', 'Ж' => 'Zh', 'З' => 'Z', 'И' => 'I',
        'Й' => 'Y', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N',
        'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T',
        'У' => 'U', 'Ф' => 'F', 'Х' => 'Kh', 'Ц' => 'Ts', 'Ч' => 'Ch',
        'Ш' => 'Sh', 'Щ' => 'Shch', 'Ъ' => '', 'Ы' => 'Y', 'Ь' => '',
        'Э' => 'E', 'Ю' => 'Yu', 'Я' => 'Ya'
    ];

    return strtr($text, $transliterationMap);
}

function generateRealisticUsername(string $firstName, string $lastName): string
{
    $firstName = transliterate($firstName);
    $lastName = transliterate($lastName);
    
    // Удаляем пробелы и приводим к нижнему регистру
    $username = strtolower(trim($firstName . '.' . $lastName));
    
    // Удаляем недопустимые символы
    $username = preg_replace('/[^a-z0-9._-]/', '', $username);
    
    return $username;
}

function generateRealisticEmail(string $username): string
{
    $domains = [
        'gmail.com',
        'yandex.ru', 
        'mail.ru',
        'rambler.ru',
        'outlook.com',
        'ya.ru'
    ];
    
    return $username . '@' . $domains[array_rand($domains)];
}
