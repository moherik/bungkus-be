<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Model
{
    use HasApiTokens, Authenticatable, HasFactory;

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
