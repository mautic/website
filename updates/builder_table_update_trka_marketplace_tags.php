<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateTrkaMarketplaceTags extends Migration
{
    public function up()
    {
        Schema::table('trka_marketplace_tags', function($table)
        {
            $table->increments('id')->change();
        });
    }
    
    public function down()
    {
        Schema::table('trka_marketplace_tags', function($table)
        {
            $table->integer('id')->change();
        });
    }
}
