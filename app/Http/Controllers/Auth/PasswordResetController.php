<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * Handle an incoming password reset link request (Simulated).
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // Simulate sending an email by logging it
        Log::info('Simulated Password Reset Email Sent to: ' . $request->email);

        return back()->with('status', 'Un lien de réinitialisation a été envoyé (simulé) à votre adresse e-mail.');
    }
}
