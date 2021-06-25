<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 20);
            $table->string('icon');
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->onDelete('CASCADE');
            $table->foreignId('order_type_id')->constrained('order_types');
            $table->integer('quantity')->default(1);
            $table->string('order_note', 100);
            $table->timestamp('order_schedule')->nullable();
            $table->integer('tips')->default(0)->nullable();
            $table->timestamps();
        });

        Schema::create('order_carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('CASCADE');
            $table->foreignId('menu_id')->constrained('menus');
            $table->string('menu_name', 100);
            $table->json('variant_items')->nullable(true);
            $table->string('special_instruction', 100);
            $table->integer('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_type');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_cart');
    }
}
