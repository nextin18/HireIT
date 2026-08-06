<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            // Core Languages
            'PHP',
            'JavaScript',
            'TypeScript',
            'Python',
            'Java',
            'C++',
            'C#',
            'Go',
            'Rust',
            'Ruby',
            'SQL',
            'HTML5',
            'CSS3',
            // Frontend Frameworks & Libraries
            'React.js',
            'Next.js',
            'Vue.js',
            'Angular',
            'Svelte',
            'Tailwind CSS',
            'Bootstrap',
            'Redux',
            'GraphQL',
            // Backend Frameworks
            'Laravel',
            'Node.js',
            'Express.js',
            'Django',
            'Spring Boot',
            'ASP.NET Core',
            'FastAPI',
            'NestJS',
            // Databases
            'PostgreSQL',
            'MySQL',
            'MongoDB',
            'Redis',
            'SQLite',
            'Firebase',
            'Elasticsearch',
            // DevOps, Cloud & Tools
            'Docker',
            'Kubernetes',
            'AWS',
            'Google Cloud Platform',
            'Azure',
            'Git',
            'GitHub Actions',
            'CI/CD',
            'Linux',
            'Nginx',
            // Mobile & Testing
            'React Native',
            'Flutter',
            'Android Development',
            'iOS Development',
            'Jest',
            'Cypress',
            'PHPUnit',
            // Design & Management
            'Figma',
            'UI/UX Design',
            'RESTful API',
            'Microservices',
            'System Design',
            'Agile/Scrum',
        ];

        foreach ($skills as $skillName) {
            $slug = Str::slug($skillName);

            Skill::firstOrCreate(
                ['slug' => $slug],
                ['name' => $skillName]
            );
        }
    }
}
