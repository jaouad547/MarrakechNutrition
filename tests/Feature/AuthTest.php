<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $response = $this->post('/register', [
            'name'                  => 'Ahmed Alami',
            'email'                 => 'ahmed@example.com',
            'phone'                 => '0600000000',
            'address'               => '123 Rue de la Medina, Marrakech',
            'password'              => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertRedirect(route('home'));
        $this->assertDatabaseHas('users', [
            'email' => 'ahmed@example.com',
            'role'  => 'client',
        ]);
        $this->assertAuthenticated();
    }

    public function test_registration_fails_with_duplicate_email()
    {
        User::factory()->create(['email' => 'ahmed@example.com']);

        $response = $this->post('/register', [
            'name'                  => 'Ahmed Alami',
            'email'                 => 'ahmed@example.com',
            'phone'                 => '0600000000',
            'address'               => '123 Rue de la Medina, Marrakech',
            'password'              => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_registration_fails_with_missing_required_fields()
    {
        $response = $this->post('/register', [
            'name'     => '',
            'email'    => '',
            'password' => '',
        ]);

        $response->assertSessionHasErrors(['name', 'email', 'password']);
    }

    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email'    => 'ahmed@example.com',
            'password' => bcrypt('Password123!'),
        ]);

        $response = $this->post('/login', [
            'email'    => 'ahmed@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertRedirect();
        $this->assertAuthenticatedAs($user);
    }

    public function test_login_fails_with_wrong_password()
    {
        User::factory()->create([
            'email'    => 'ahmed@example.com',
            'password' => bcrypt('Password123!'),
        ]);

        $response = $this->post('/login', [
            'email'    => 'ahmed@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_login_fails_with_unknown_email()
    {
        $response = $this->post('/login', [
            'email'    => 'nobody@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_authenticated_user_can_logout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect();
        $this->assertGuest();
    }
}
