<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuCategory extends Model
{
    use HasFactory;

    public function menus()
    {
        return $this->hasMany(Menu::class)->orderBy('order');
    }
    
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function getIsShowAttribute()
    {
        return $this->attributes['is_show'] > 0;
    }
}
