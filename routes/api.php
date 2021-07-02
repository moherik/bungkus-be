<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'auth', 'as' => 'auth.'], function() {
    Route::post('register', [CustomerController::class, 'register'])->name('register');
    Route::post('login', [CustomerController::class, 'login'])->name('login');
});

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::post('order', [OrderController::class, 'store'])->name('order.store');
});