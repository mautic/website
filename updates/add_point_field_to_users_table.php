<?php namespace trka\MauticdotorgExtensions\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class AddPointFieldToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function ($table) {
            $table->mediumInteger('mtcorg_points')
                ->default(0)
                ->unsigned()
                ->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function ($table) {
            $table->dropColumn([
                'mtcorg_points'
            ]);
        });
    }
}
