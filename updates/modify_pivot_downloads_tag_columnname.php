<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 7/15/18
 * Time: 9:27 AM
 */

namespace trka\MauticdotorgExtensions\Updates;

use October\Rain\Database\Updates\Migration;
use Schema;

class modify_pivot_downloads_tag_columnname extends Migration
{
    public function up()
    {
        Schema::table('downloads_tag', function ($table) {
            $table->integer('downloads_id')->unsigned();
            $table->dropColumn('download_id');
        });
    }

    public function down()
    {
        Schema::table('download_tag', function ($table) {
            $table->dropColumn('downloads_id');
        });
    }
}