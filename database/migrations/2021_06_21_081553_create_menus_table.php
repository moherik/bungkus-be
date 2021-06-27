<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->onDelete('CASCADE');
            $table->string('name', 100);
            $table->integer('order')->default(0);
            $table->boolean('is_show')->default(true);
            $table->timestamps();
        });

        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_category_id')->nullable()->constrained('menu_categories')->onDelete('CASCADE');
            $table->string('name', 100);
            $table->string('description', 200)->nullable();
            $table->string('image')->nullable();
            $table->integer('price');
            $table->integer('order')->default(0);
            $table->boolean('is_show')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_categories');
        Schema::dropIfExists('menus');
    }
}
