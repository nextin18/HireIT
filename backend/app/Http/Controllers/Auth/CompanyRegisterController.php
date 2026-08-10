<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;

class CompanyRegisterController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validate request payload
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'phone_number' => ['nullable', 'string', 'max:20', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 2. Wrap database changes in transaction
        DB::beginTransaction();

        try {
            // Create root user entry
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'phone_number' => $validatedData['phone_number'] ?? null,
                'password' => Hash::make($validatedData['password']),
            ]);

            // Assign Spatie Company role
            $user->assignRole('Company');

            // Create default/initial Company Profile record
            $company = $user->company()->create([
                'company_name' => $validatedData['name'],
                'slug' => Str::slug($validatedData['name']) . '-' . Str::random(5),
                'status' => 'active',
                'is_verified' => false,
            ]);

            // Dispatch user registered event for email verification
            event(new Registered($user));

            // Generate Sanctum Bearer Token
            $token = $user->createToken('company_auth_token')->plainTextToken;

            // Commit database transaction
            DB::commit();

            // Return success JSON response
            return response()->json([
                'success' => true,
                'message' => 'Company registration successful.',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone_number' => $user->phone_number,
                        'role' => 'Company',
                    ],
                    'company' => [
                        'id' => $company->id,
                        'company_name' => $company->company_name ?? $user->name,
                        'slug' => $company->slug,
                        'status' => $company->status,
                        'is_verified' => $company->is_verified,
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer',
                ],
            ], 201)->cookie('access_token', $token, 60 * 24 * 7);
        } catch (\Throwable $e) {
            // Rollback database changes on failure
            DB::rollBack();

            // Log exception details
            Log::error('Company Registration Error: ' . $e->getMessage(), [
                'email' => $request->email,
                'trace' => $e->getTraceAsString(),
            ]);

            // Return standardized failure response
            return response()->json([
                'success' => false,
                'message' => 'Unable to register company right now. Please try again later.',
            ], 500);
        }
    }
}
