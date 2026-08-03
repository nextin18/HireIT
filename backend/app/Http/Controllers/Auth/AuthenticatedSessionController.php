<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try {
            // Perform authentication logic defined in LoginRequest
            $request->authenticate();

            /** @var \App\Models\User $user */
            $user = Auth::user();

            // Fetch user primary Spatie role (e.g., 'Candidate', 'Company', 'Admin')
            $role = $user->getRoleNames()->first();

            // Generate Sanctum Bearer token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone_number' => $user->phone_number,
                        'role' => $role,
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer',
                ],
            ], 200)->cookie(
                'access_token',
                $token,
                60 * 24 * 7  // 7 days duration
            );
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Rethrow validation exceptions so standard 422 JSON response is returned
            throw $e;
        } catch (\Throwable $e) {
            Log::error('Login Controller Error: ' . $e->getMessage(), [
                'login_input' => $request->input('login'),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred during login. Please try again.',
            ], 500);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        try {
            // Revoke currently active token
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully.',
            ], 200)->withoutCookie('access_token');
        } catch (\Throwable $e) {
            Log::error('Logout Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id ?? null,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to logout.',
            ], 500);
        }
    }
}
