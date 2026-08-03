<?php

use App\Http\Controllers\Api\CandidateProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->group(function () {
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
    Route::get('/candidate/profile', [CandidateProfileController::class, 'show']);
    Route::post('/candidate/profile', [CandidateProfileController::class, 'update']);
});
