<?php namespace trka\Marketplace\Models;

use Model;

/**
 * Model
 */
class DownloadTags extends Model
{
    use \October\Rain\Database\Traits\Validation;

    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'label'
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'trka_marketplace_tags';

    public $belongsToMany = [
        'downloads' => [
            'trka_marketplace_download_tag',
            'table' => 'trka_marketplace_download_tag',
            'key' => 'tag_id',
            'otherKey' => 'download_id',
        ]
    ];
}
