<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companiesData = [
            [
                'user' => [
                    'name' => 'Acme Corp HR',
                    'email' => 'hr@acmecorp.com',
                    'password' => Hash::make('Raza@HireIT'),
                    'phone_number' => '+919876543210',
                ],
                'company' => [
                    'company_name' => 'Acme Corp',
                    'slug' => Str::slug('Acme Corp'),
                    'tagline' => 'Innovating the future of cloud software',
                    'website' => 'https://acmecorp.com',
                    'industry' => 'Information Technology',
                    'company_size' => '50-200',
                    'company_type' => 'Private',
                    'founded_year' => 2018,
                    'about' => 'Acme Corp is a leading software enterprise specializing in scalable cloud applications.',
                    'is_verified' => true,
                    'status' => 'active',
                ],
                'locations' => [
                    [
                        'office_name' => 'Headquarters',
                        'address_line1' => '123 Tech Park, Outer Ring Road',
                        'address_line2' => 'Building 4B, 3rd Floor',
                        'city' => 'Bangalore',
                        'state' => 'Karnataka',
                        'country' => 'India',
                        'postal_code' => '560103',
                        'latitude' => 12.9226,
                        'longitude' => 77.6174,
                        'is_headquarters' => true,
                    ],
                    [
                        'office_name' => 'Mumbai Regional Office',
                        'address_line1' => 'BKC Financial Center',
                        'address_line2' => 'Tower A',
                        'city' => 'Mumbai',
                        'state' => 'Maharashtra',
                        'country' => 'India',
                        'postal_code' => '400051',
                        'latitude' => 19.0657,
                        'longitude' => 72.8686,
                        'is_headquarters' => false,
                    ],
                ],
                'socials' => [
                    ['platform' => 'linkedin', 'url' => 'https://linkedin.com/company/acmecorp'],
                    ['platform' => 'twitter', 'url' => 'https://twitter.com/acmecorp'],
                    ['platform' => 'github', 'url' => 'https://github.com/acmecorp'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Dev Studio Recruiter',
                    'email' => 'careers@devstudio.io',
                    'password' => Hash::make('Raza@HireIT'),
                    'phone_number' => '+919811223344',
                ],
                'company' => [
                    'company_name' => 'Dev Studio',
                    'slug' => Str::slug('Dev Studio'),
                    'tagline' => 'Crafting beautiful digital experiences',
                    'website' => 'https://devstudio.io',
                    'industry' => 'Design & Software',
                    'company_size' => '11-50',
                    'company_type' => 'Startup',
                    'founded_year' => 2021,
                    'about' => 'A boutique design and tech engineering agency for modern startups.',
                    'is_verified' => true,
                    'status' => 'active',
                ],
                'locations' => [
                    [
                        'office_name' => 'Main Hub',
                        'address_line1' => 'Connaught Place',
                        'city' => 'New Delhi',
                        'state' => 'Delhi',
                        'country' => 'India',
                        'postal_code' => '110001',
                        'latitude' => 28.6315,
                        'longitude' => 77.2167,
                        'is_headquarters' => true,
                    ],
                ],
                'socials' => [
                    ['platform' => 'linkedin', 'url' => 'https://linkedin.com/company/devstudio'],
                    ['platform' => 'instagram', 'url' => 'https://instagram.com/devstudio'],
                ],
            ],
        ];

        foreach ($companiesData as $data) {
            // 1. Create or Find User
            $user = User::firstOrCreate(
                ['email' => $data['user']['email']],
                $data['user']
            );

            // Assign Spatie Role
            if (!$user->hasRole('Company')) {
                $user->assignRole('Company');
            }

            // 2. Create or Find Company Profile
            $company = Company::firstOrCreate(
                ['user_id' => $user->id],
                $data['company']
            );

            // 3. Attach Locations
            foreach ($data['locations'] as $location) {
                $company->locations()->firstOrCreate(
                    [
                        'office_name' => $location['office_name'],
                        'city' => $location['city'],
                    ],
                    $location
                );
            }

            // 4. Attach Social Links
            foreach ($data['socials'] as $social) {
                $company->socialLinks()->firstOrCreate(
                    ['platform' => $social['platform']],
                    $social
                );
            }
        }
    }
}
