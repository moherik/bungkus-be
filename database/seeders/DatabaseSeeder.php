<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $user = User::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
        ]);

        $customer = Customer::create([
            'name' => 'Erik Maulana',
            'phone' => '085157759782'
        ]);

        $store = $user->stores()->create([
            'name' => 'Mie Ayam Cak Lan',
            'address' => 'Jl Raya Kembangbahu',
            'coordinate' => '783478728,8439898',
        ]);

        $menuCategory = $store->menuCategories()->create([
            'name' => 'Makanan'
        ]);

        $menu = $menuCategory->menus()->create([
            'name' => 'Mie Ayam Wumbo',
            'price' => 15000,
            'variant' => [[
                'id' => '1',
                'name' => 'Topping',
                'items' => [[
                    'id' => '1',
                    'name' => 'Ceker',
                    'price' => '5000'
                ]]
            ]]
        ]);
    }
}
