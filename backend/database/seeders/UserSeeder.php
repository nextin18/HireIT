<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\PermissionRegistrar;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 3. Define dummy users for each role
        $users = [
            [
                'name' => 'Md Raza',
                'email' => 'admin@gmail.com',
                'role' => 'Super Admin',
                'phone_number' => '+917477650108',
            ],
            [
                'name' => 'Amir Alam',
                'email' => 'sameer72135@gmail.com',
                'role' => 'Admin',
                'phone_number' => '+919163198477',
            ],
            [
                'name' => 'Taksin Raja',
                'email' => 'taskinraja01@gmail.com',
                'role' => 'Candidate',
                'phone_number' => '+919775360314',
            ],
            [
                'name' => 'Aman Raja',
                'email' => 'amanraja@gmail.com',
                'role' => 'Candidate',
                'phone_number' => '+911646547891',
            ],
            [
                'name' => 'HireIT',
                'email' => 'hireit@gmail.com',
                'role' => 'Company',
                'phone_number' => '+918875468975',
            ],
            [
                'name' => 'BCCL',
                'email' => 'bccl@gmail.com',
                'role' => 'Company',
                'phone_number' => '+911236547891',
            ],
        ];

        // 4. Create or Update Users and Assign Roles
        foreach ($users as $userData) {
            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('Raza@HireIT'),
                    'phone_number' => $userData['phone_number'],
                ]
            );
            $user->syncRoles([$userData['role']]);
        }
    }
}
