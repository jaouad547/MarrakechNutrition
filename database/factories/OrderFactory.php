<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    public function definition(): array
    {
        static $dailyCount = 0;
        $dailyCount++;
        $orderNumber = sprintf('ORD-%s-%03d', now()->format('Ymd'), $dailyCount);

        return [
            'user_id'          => User::factory(),
            'customer_name'    => fake()->name(),
            'order_number'     => $orderNumber,
            'total'            => fake()->randomFloat(2, 50, 2000),
            'delivery_address' => fake()->address(),
            'phone'            => '06' . fake()->numerify('########'),
            'status'           => 'Pending payment on delivery',
            'payment_method'   => 'Paiement à la livraison',
        ];
    }
}
