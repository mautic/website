<?php namespace trka\Badges\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class create_pivot_download_tags extends Migration
{
    public function up()
    {
        Schema::create('downloads_tag', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('download_id')->unsigned();
            $table->integer('tag_id')->unsigned();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('downloads_tag');
    }
}
