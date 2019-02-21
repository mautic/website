<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceDownloadTypes extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_download_types', function($table)
        {
            $table->increments('id')->change();
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_download_types', function($table)
        {
            $table->integer('id')->change();
        });
    }
}
