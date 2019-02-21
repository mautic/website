<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceDownload6 extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->integer('user_id')->default(null)->change();
            $table->integer('type_id')->default(null)->change();
            $table->string('repository_provider', 128)->default(null)->change();
            $table->string('repository_url', 128)->default(null)->change();
            $table->string('review_status', 64)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->integer('user_id')->default(NULL)->change();
            $table->integer('type_id')->default(NULL)->change();
            $table->string('repository_provider', 128)->default('NULL')->change();
            $table->string('repository_url', 128)->default('NULL')->change();
            $table->string('review_status', 64)->default('NULL')->change();
        });
    }
}
