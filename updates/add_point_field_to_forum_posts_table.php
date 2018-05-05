<?php namespace trka\MauticdotorgExtensions\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class AddPointFieldToForumPostsTable extends Migration
{
    public function up()
    {
        Schema::table('rainlab_forum_posts', function ($table) {
            $table->mediumInteger('mtcorg_points')
                ->default(0)
                ->unsigned()
                ->nullable();
        });
    }

    public function down()
    {
        Schema::table('rainlab_forum_posts', function ($table) {
            $table->dropColumn([
                'mtcorg_points'
            ]);
        });
    }
}
