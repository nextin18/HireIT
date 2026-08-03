<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Cache reset
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ===== BASE PERMISSIONS =====
        Permission::firstOrCreate(['name' => 'Dashboard']);
        Permission::firstOrCreate(['name' => 'Manage Jobs']);
        Permission::firstOrCreate(['name' => 'Apply Jobs']);

        // ===== ROLES =======
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $candidate = Role::firstOrCreate(['name' => 'Candidate']);
        $company = Role::firstOrCreate(['name' => 'Company']);

        // Super Admin — all permissions
        $permissions = Permission::all();
        $superAdmin->syncPermissions($permissions);

        // Admin - view dashboard and manage platforms
        $admin->syncPermissions(['Dashboard']);

        // Candidate - view dashboard and apply for jobs
        $candidate->syncPermissions(['Apply Jobs']);

        // Company - view dashboard and post/manage jobs
        $company->syncPermissions(['Manage Jobs']);
    }
}
