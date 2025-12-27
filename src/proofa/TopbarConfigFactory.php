<?php

namespace App\Proofa;

final class TopbarConfigFactory
{
    public function load(string $file): array
    {
        if (!is_file($file)) {
            return [];
        }

        $config = require $file;

        return is_array($config) ? $config : [];
    }
}
