<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class create_trka_marketplace_download_types extends Migration
{
    public function up()
    {
        Schema::create('trka_marketplace_download_types', function ($table) {
            $table->engine = 'InnoDB';
            $table->integer('id')->unsigned();
            $table->string('label', 128);
            $table->string('slug', 128)->nullable();
            //--
            $table->timestamp('deleted_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            //--
            $table->primary(['id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('trka_marketplace_download_types');
    }
}
