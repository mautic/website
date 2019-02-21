<?php namespace trka\MauticdotorgExtensions\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class add_user_extra_profile_fields extends Migration
{
    public function up()
    {
        Schema::table('users', function ($table) {
            $table->text('mtcorg_about')->nullable();
            $table->text('mtcorg_location')->nullable();
            $table->text('mtcorg_professional')->nullable();
            $table->json('mtcorg_languages')->nullable();
            $table->json('mtcorg_skills')->nullable();
            $table->json('mtcorg_websites')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function ($table) {
            $table->dropColumn([
                'mtcorg_about',
                'mtcorg_location',
                'mtcorg_professional',
                'mtcorg_languages',
                'mtcorg_skills',
                'mtcorg_websites',
            ]);
        });
    }
}
