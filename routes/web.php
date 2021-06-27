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
use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;

Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

// Users
Route::get('users')->name('users')->uses('UsersController@index')->middleware('remember', 'auth');
Route::get('users/create')->name('users.create')->uses('UsersController@create')->middleware('auth');
Route::post('users')->name('users.store')->uses('UsersController@store')->middleware('auth');
Route::get('users/{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');
Route::put('users/{user}')->name('users.update')->uses('UsersController@update')->middleware('auth');
Route::delete('users/{user}')->name('users.destroy')->uses('UsersController@destroy')->middleware('auth');
Route::put('users/{user}/restore')->name('users.restore')->uses('UsersController@restore')->middleware('auth');

// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// Organizations
Route::get('organizations')->name('organizations')->uses('OrganizationsController@index')->middleware('remember', 'auth');
Route::get('organizations/create')->name('organizations.create')->uses('OrganizationsController@create')->middleware('auth');
Route::post('organizations')->name('organizations.store')->uses('OrganizationsController@store')->middleware('auth');
Route::get('organizations/{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit')->middleware('auth');
Route::put('organizations/{organization}')->name('organizations.update')->uses('OrganizationsController@update')->middleware('auth');
Route::delete('organizations/{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy')->middleware('auth');
Route::put('organizations/{organization}/restore')->name('organizations.restore')->uses('OrganizationsController@restore')->middleware('auth');

// Stores
Route::group(['middleware' => ['auth'], 'prefix' => 'stores', 'as' => 'stores.'], function() {
    Route::get('/', [StoreController::class, 'index'])->name('index');
    Route::get('/create', [StoreController::class, 'create'])->name('create');
    Route::post('/', [StoreController::class, 'store'])->name('store');
    Route::get('/{store}/edit', [StoreController::class, 'edit'])->name('edit');
    Route::put('/{store}', [StoreController::class, 'update'])->name('update');
    Route::put('/{store}/{status}', [StoreController::class, 'updateStatus'])->name('update-status');
    Route::delete('/{store}', [StoreController::class, 'destroy'])->name('destroy');
    Route::put('/{store}/restore', [StoreController::class, 'restore'])->name('restore');
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

// Contacts
Route::get('contacts')->name('contacts')->uses('ContactsController@index')->middleware('remember', 'auth');
Route::get('contacts/create')->name('contacts.create')->uses('ContactsController@create')->middleware('auth');
Route::post('contacts')->name('contacts.store')->uses('ContactsController@store')->middleware('auth');
Route::get('contacts/{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit')->middleware('auth');
Route::put('contacts/{contact}')->name('contacts.update')->uses('ContactsController@update')->middleware('auth');
Route::delete('contacts/{contact}')->name('contacts.destroy')->uses('ContactsController@destroy')->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore')->middleware('auth');

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});
