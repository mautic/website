<?php namespace trka\Marketplace\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateTrkaMarketplaceCategories extends Migration
{
    public function up()
    {
        Schema::create('trka_marketplace_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('id')->unsigned();
            $table->string('label', 128)->nullable();
            $table->string('slug', 128)->nullable();
            $table->primary(['id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('trka_marketplace_categories');
    }
}
