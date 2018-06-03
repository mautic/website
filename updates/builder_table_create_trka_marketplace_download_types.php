<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateTrkaMarketplaceDownloadTypes extends Migration
{
    public function up()
    {
        Schema::create('trka_marketplace_download_types', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('id')->unsigned();
            $table->string('label', 128);
            $table->primary(['id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('trka_marketplace_download_types');
    }
}
