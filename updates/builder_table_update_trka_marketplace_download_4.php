<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceDownload4 extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->string('repository_provider', 128)->nullable();
            $table->string('repository_url', 128)->nullable();
            $table->integer('user_id')->default(null)->change();
            $table->integer('type_id')->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->dropColumn('repository_provider');
            $table->dropColumn('repository_url');
            $table->integer('user_id')->default(NULL)->change();
            $table->integer('type_id')->default(NULL)->change();
        });
    }
}
