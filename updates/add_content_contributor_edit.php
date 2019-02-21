<?php namespace trka\MauticdotorgExtensions\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class add_content_contributor_edit extends Migration
{
    public function up()
    {
        Schema::table('rainlab_blog_posts', function ($table) {
            //-- relate content to frontend user
            $table->integer('contributor_id')
                ->unsigned()
                ->nullable();
            //-- allow suggested edits (jsonable)
            $table->text('edits')->nullable();
        });

    }

    public function down()
    {
        Schema::table('rainlab_blog_posts', function ($table) {
            $table->dropColumn([
                'contributor_id',
                'edits'
            ]);
        });
    }
}
