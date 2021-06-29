<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth

use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/', [StoreController::class, 'index'])->name('dashboard')->middleware('auth');

// Users
Route::group(['middleware' => ['auth'], 'prefix' => 'users', 'as' => 'users.'], function() {
    Route::get('/', [UsersController::class, 'index'])->name('index')->middleware('remember');
    Route::post('/', [UsersController::class, 'store'])->name('store');
    Route::put('/{user}', [UsersController::class, 'update'])->name('update');
    Route::delete('/{user}', [UsersController::class, 'destroy'])->name('destroy');
    Route::put('/{user}/restore', [UsersController::class, 'restore'])->name('restore');
});

// Stores
Route::group(['middleware' => ['auth'], 'prefix' => 'stores', 'as' => 'stores.'], function() {
    Route::get('/', [StoreController::class, 'index'])->name('index');
    Route::post('/', [StoreController::class, 'store'])->name('store');
    Route::get('/{store}', [StoreController::class, 'detail'])->name('detail');
    Route::put('/{store}', [StoreController::class, 'update'])->name('update');
    Route::delete('/{store}', [StoreController::class, 'destroy'])->name('destroy');
    Route::put('/{store}/restore', [StoreController::class, 'restore'])->name('restore');
    Route::put('/{store}/update/{status}', [StoreController::class, 'updateStatus'])->name('update-status');
});

// Menu
Route::group(['middleware' => ['auth'], 'prefix' => 'menus', 'as' => 'menus.'], function() {
    Route::put('/category/reorder', [MenuController::class, 'reorderCategory'])->name('reorder-category');
    Route::post('/{store}/category/create', [MenuController::class, 'storeCategory'])->name('store-category');
    Route::put('/category/{id}/update', [MenuController::class, 'updateCategory'])->name('update-category');
    Route::delete('/category/{id}/delete', [MenuController::class, 'destroyCategory'])->name('destroy-category');

    Route::put('/menu/reorder', [MenuController::class, 'reorderMenu'])->name('reorder-menu');
    Route::post('/{categoryId}/menu/create', [MenuController::class, 'storeMenu'])->name('store-menu');
    Route::put('/{menu}/update', [MenuController::class, 'updateMenu'])->name('update-menu');
    Route::delete('/{menu}/delete', [MenuController::class, 'destroyMenu'])->name('destroy-menu');
    Route::put('/{menu}/{status}', [MenuController::class, 'updateStatusMenu'])->name('update-status');
});

// Order
Route::group(['middleware' => ['auth'], 'prefix' => 'orders', 'as' => 'orders.'], function() {
    Route::post('/', [OrderController::class, 'store'])->name('store');
});
