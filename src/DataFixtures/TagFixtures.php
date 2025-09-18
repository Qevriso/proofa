<?php

/*
 * This file is part of the Kimai time-tracking app.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

/**
 * Defines the sample data to load in the database when running the unit and
 * functional tests or while development.
 *
 * Execute this command to load the data:
 * bin/console doctrine:fixtures:load
 *
 * @codeCoverageIgnore
 */
final class TagFixtures extends Fixture
{
    public const BATCH_SIZE = 100;
    
    private array $tagNames = [];

    public function __construct()
    {
        $data = require __DIR__ . '/Data/simple_names.php';
        $this->tagNames = $data['tags'];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        // Создаем 30 осмысленных английских тегов
        foreach ($this->tagNames as $tagName) {
            $tag = new Tag();
            $tag->setName($tagName);
            $tag->setVisible(true);
            $tag->setColor($faker->hexColor());

            $manager->persist($tag);
        }

        $manager->flush();
        $manager->clear();
    }
}
