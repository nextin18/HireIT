<?php

use App\Http\Controllers\Api\CandidateProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Candidate Protected Routes
Route::middleware(['auth:sanctum', 'role:Candidate'])->group(function () {
    Route::get('/candidate/profile', [CandidateProfileController::class, 'show']);
    Route::post('/candidate/profile', [CandidateProfileController::class, 'update']);
});
