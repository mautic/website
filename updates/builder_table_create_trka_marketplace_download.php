<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateTrkaMarketplaceDownload extends Migration
{
    public function up()
    {
        Schema::create('trka_marketplace_download', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('id')->unsigned();
            $table->string('name', 128);
            $table->string('description');
            $table->primary(['id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('trka_marketplace_download');
    }
}
