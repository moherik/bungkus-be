<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStoreRequest;
use App\Models\OrderCart;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    
    public function store(OrderStoreRequest $request)
    {
        $data = $request->validated();

        $store = Store::where('id', $data['store_id'])->firstOrFail();

        $order = Auth::user()->orders()->create([
            'store_id' => $store->id,
            'order_type' => $request->order_type,
            'order_note' => $request->order_note,
            'order_schedule' => $request->order_schedule,
            'tips' => $request->tips,
        ]);

        foreach($request->order_carts as $cart) {
            $order->carts()->create($cart);
        }

        return response()->json([
            'success' => 'Sukses menambahkan order',
        ]);
    }

}
