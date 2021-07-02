<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CustomerController extends Controller
{
    
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'device_id' => 'required',
        ]);

        $customer = Customer::create([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        $token = $customer->createToken($request->device_id)->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'device_id' => 'required',
        ]);

        $customer = Customer::where('phone', $request->phone)->first();

        if(!$customer) {
            throw ValidationException::withMessages([
                'customer' => 'Customer tidak ditemukan'
            ]);
        }

        $customer->tokens()->delete();

        $token = $customer->createToken($request->device_id)->plainTextToken;

        return response()->json(['token' => $token]);
    }


}
