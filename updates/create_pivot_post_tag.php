<?php namespace trka\Badges\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class create_pivot_post_tag extends Migration
{
    public function up()
    {
        Schema::create('post_tag', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('post_id')->unsigned();
            $table->integer('tag_id')->unsigned();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('post_tag');
    }
}
