<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceCategories extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_categories', function($table)
        {
            $table->increments('id')->change();
            $table->string('label', 128)->default(null)->change();
            $table->string('slug', 128)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_categories', function($table)
        {
            $table->integer('id')->change();
            $table->string('label', 128)->default('NULL')->change();
            $table->string('slug', 128)->default('NULL')->change();
        });
    }
}
