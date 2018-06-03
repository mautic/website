<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceDownload extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('description')->change();
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_download', function($table)
        {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
            $table->dropColumn('deleted_at');
            $table->string('description', 191)->change();
        });
    }
}
