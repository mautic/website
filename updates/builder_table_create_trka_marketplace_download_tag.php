<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateTrkaMarketplaceDownloadTag extends Migration
{
    public function up()
    {
        Schema::create('trka_marketplace_download_tag', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('download_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->primary(['download_id','tag_id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('trka_marketplace_download_tag');
    }
}
