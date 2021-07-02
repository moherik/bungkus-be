<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderCart extends Model
{
    use HasFactory;

    public function menu()
    {
        return $this->hasOne(Menu::class);
    }

    public function orders()
    {
        return $this->belongsTo(Order::class);
    }
}
