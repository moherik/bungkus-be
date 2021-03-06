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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores');
            $table->foreignId('customer_id')->constrained('customers')->onDelete('CASCADE');
            $table->enum('order_type', ['PICKUP','DINEIN', 'DELIVERY'])->default('PICKUP');
            $table->enum('status', ['PENDING', 'PROCESS', 'CANCEL', 'SUCCESS'])->default('PENDING');
            $table->timestamp('order_schedule')->nullable();
            $table->string('order_note', 100)->nullable();
            $table->integer('tips')->default(0)->nullable();
            $table->timestamps();
        });

        Schema::create('order_carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('CASCADE');
            $table->foreignId('menu_id')->constrained('menus');
            $table->string('menu_name', 100);
            $table->integer('price');
            $table->json('variant_items')->nullable(true);
            $table->string('special_instruction', 100)->nullable();
            $table->integer('quantity')->default(1);
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
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_cart');
    }
}
