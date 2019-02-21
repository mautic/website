<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceDownload5 extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->string('review_status', 64)->nullable();
            $table->integer('user_id')->unsigned()->default(null)->change();
            $table->integer('type_id')->unsigned()->default(null)->change();
            $table->string('repository_provider', 128)->default(null)->change();
            $table->string('repository_url', 128)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->dropColumn('review_status');
            $table->integer('user_id')->unsigned(false)->default(NULL)->change();
            $table->integer('type_id')->unsigned(false)->default(NULL)->change();
            $table->string('repository_provider', 128)->default('NULL')->change();
            $table->string('repository_url', 128)->default('NULL')->change();
        });
    }
}
