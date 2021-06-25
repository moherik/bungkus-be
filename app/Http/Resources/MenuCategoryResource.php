<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuCategoryResource extends JsonResource
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
            'order' => $this->order,
            'is_show' => $this->is_show,
            'deleted_at' => $this->deleted_at,
            'menus' => $this->menus()->get()->map->only(
                'id', 'name', 'description', 'price', 'order', 'is_show', 'deleted_at'
            ),

        ];
    }
}
