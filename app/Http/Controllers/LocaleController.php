<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;

class LocaleController extends Controller
{
    public function update(string $locale): RedirectResponse
    {
        return back()->withCookie(cookie('locale', $locale, 60 * 24 * 365));
    }
}
