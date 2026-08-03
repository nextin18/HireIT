<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     */
    public function store(Request $request): JsonResponse
    {
        // 1. Input Validation
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // 2. Database Transaction
        DB::beginTransaction();

        try {
            // We will send the password reset link to this user.
            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status !== Password::RESET_LINK_SENT) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => __($status),
                ], 400);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => __($status),
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Password Reset Link Request Failed: ' . $e->getMessage(), [
                'email' => $request->email,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while sending the password reset link. Please try again.',
            ], 500);
        }
    }
}
