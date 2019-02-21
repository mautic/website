<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class create_trka_marketplace_download extends Migration
{
    public function up()
    {
        Schema::create('trka_marketplace_download', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('name', 128);
            $table->string('slug', 128)->nullable();
            $table->string('description')->nullable();
            $table->integer('user_id')->nullable()->unsigned();
            $table->integer('type_id')->nullable()->unsigned();
            //--
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('trka_marketplace_download');
    }
}
