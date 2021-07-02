<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'store_id' => 'required',
            'order_type' => 'required',
            'order_schedule' => 'nullable',
            'order_note' => 'nullable',
            'tips' => 'nullable',
            'order_carts' => 'required|array',
            'order_carts.*.menu_id' => 'required',
            'order_carts.*.menu_name' => 'required|required:100',
            'order_carts.*.variant_items' => 'nullable',
            'order_carts.*.special_instruction' => 'nullable|max:100',
            'order_carts.*.price' => 'required',
            'order_carts.*.quantity' => 'required',
        ];
    }
}
