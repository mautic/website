<?php namespace trka\MauticdotorgExtensions\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class add_accepted_answer extends Migration
{
    public function up()
    {
        Schema::table('rainlab_forum_posts', function ($table) {
            $table->boolean('mtcorg_acceptedanswer')
                ->default(0)
                ->nullable();
        });
    }

    public function down()
    {
        Schema::table('rainlab_forum_posts', function ($table) {
            $table->dropColumn([
                'mtcorg_acceptedanswer'
            ]);
        });
    }
}
