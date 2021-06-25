<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variant_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained('menus')->onDelete('CASCADE');
            $table->string('name', 20);
            $table->boolean('is_required')->default(false);
            $table->boolean('is_multiple_choice')->default(true);
            $table->boolean('is_show')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
 
        Schema::create('variant_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variant_group_id')->constrained('variant_groups')->onDelete('CASCADE');
            $table->string('name', 20);
            $table->integer('price');
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
        Schema::dropIfExists('variant_grpups');
        Schema::dropIfExists('variant_items');
    }
}
