<?php

use App\Http\Controllers\Api\CandidateEducationController;
use App\Http\Controllers\Api\CandidateExperienceController;
use App\Http\Controllers\Api\CandidateProfileController;
use App\Http\Controllers\Api\CandidateSkillController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\CompanyLocationController;
use App\Http\Controllers\Api\CompanySocialLinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->group(function () {
    // Get Authenticated User
    Route::get('/me', function (Request $request) {
        $user = $request->user();
        $role = $user->getRoleNames()->first();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'role' => $role,
                ],
            ],
        ]);
    });
});

// Candidate Routes
Route::middleware(['auth:sanctum', 'role:Candidate'])->group(function () {
    // Profile - Show, Update
    Route::get('/candidate/profile', [CandidateProfileController::class, 'show']);
    Route::post('/candidate/profile', [CandidateProfileController::class, 'update']);

    // Experience - Index, Store, Update, Delete
    Route::get('/candidate/experiences', [CandidateExperienceController::class, 'index']);
    Route::post('/candidate/experiences', [CandidateExperienceController::class, 'store']);
    Route::put('/candidate/experiences/{id}', [CandidateExperienceController::class, 'update']);
    Route::delete('/candidate/experiences/{id}', [CandidateExperienceController::class, 'destroy']);

    // Education - Index, Store, Update, Delete
    Route::apiResource('candidate/educations', CandidateEducationController::class);
    
    // Skills - Index, Store, Update, Delete
    Route::apiResource('candidate/skills', CandidateSkillController::class)->except(['show']);
});

// Company Routes
Route::middleware(['auth:sanctum', 'role:Company'])->group(function () {
    // Company Profile - Show
    Route::get('/company/profile', [CompanyController::class, 'show']);
    // Company Profile - Update
    Route::post('/company/profile', [CompanyController::class, 'update']);

    // Dedicated Locations CRUD
    Route::get('/company/locations', [CompanyLocationController::class, 'index']);
    Route::post('/company/locations', [CompanyLocationController::class, 'store']);
    Route::put('/company/locations/{id}', [CompanyLocationController::class, 'update']);
    Route::delete('/company/locations/{id}', [CompanyLocationController::class, 'destroy']);

    // Dedicated Social Links CRUD
    Route::get('/company/social-links', [CompanySocialLinkController::class, 'index']);
    Route::post('/company/social-links', [CompanySocialLinkController::class, 'store']);
    Route::delete('/company/social-links/{id}', [CompanySocialLinkController::class, 'destroy']);
});
