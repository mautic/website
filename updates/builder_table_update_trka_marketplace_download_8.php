<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceDownload8 extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->dropColumn('package_icon');
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->string('package_icon', 128)->nullable()->default(null);
        });
    }
}
