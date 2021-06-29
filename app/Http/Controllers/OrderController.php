<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStoreRequest;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    
    public function store(OrderStoreRequest $request)
    {
        return $request->all();
    }

}
