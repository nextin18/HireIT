<?php

use App\Http\Controllers\Api\CandidateProfileController;
use App\Http\Controllers\Api\CandidateExperienceController;
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
    // Profile - Show
    Route::get('/candidate/profile', [CandidateProfileController::class, 'show']);
    // Profile - Update
    Route::post('/candidate/profile', [CandidateProfileController::class, 'update']);

    // Experience - Index
    Route::get('/candidate/experiences', [CandidateExperienceController::class, 'index']);
    // Experience - Create
    Route::post('/candidate/experiences', [CandidateExperienceController::class, 'store']);
    // Experience - Update
    Route::put('/candidate/experiences/{id}', [CandidateExperienceController::class, 'update']);
    // Experience - Delete
    Route::delete('/candidate/experiences/{id}', [CandidateExperienceController::class, 'destroy']);
});
