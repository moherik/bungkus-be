<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'coordinate' => $this->coordinate,
            'brand_img' => $this->brand_img,
            'banner_img' => $this->banner_img,
            'is_open' => $this->is_open,
            'deleted_at' => $this->deleted_at,
            'menu_categories' => $this->menuCategories()->orderBy('order')->get(),
        ];
    }
}
