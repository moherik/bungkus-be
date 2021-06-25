<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Organization;
use App\Models\Store;
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

        $stores = Store::factory()->count(5)->create([
            'user_id' => $user->id,
        ]);

        $menuCategory = MenuCategory::create([
            'store_id' => $stores->random()->id,
            'name' => 'Makan Siang',
        ]);

        Menu::factory()->count(10)->create([
            'menu_category_id' => $menuCategory->id
        ]);

        // User::factory()->count(5)->create([
        //     'account_id' => $account->id
        // ]);

        // $organizations = Organization::factory()->count(100)->create([
        //     'account_id' => $account->id
        // ]);

        // Contact::factory()->count(100)->create([
        //     'account_id' => $account->id
        // ])
        //     ->each(function (Contact  $contact) use ($organizations) {
        //         $contact->update(['organization_id' => $organizations->random()->id]);
        //     });
    }
}
