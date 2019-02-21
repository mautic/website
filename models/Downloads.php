<?php namespace trka\Marketplace\Models;

use Model;
use System\Models\File;

/**
 * Model
 */
class Downloads extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'trka_marketplace_download';

    public $belongsTo = [
        'user' => [
            \RainLab\User\Models\User::class,
        ],
        'type' => [
            \trka\Marketplace\Models\DownloadTypes::class,
        ],
        'category' => [
            \trka\Marketplace\Models\Categrory::class
        ],
    ];

    public $belongsToMany = [
        'tags' => [
            '\trka\Marketplace\Models\DownloadTags',
            'table' => 'trka_marketplace_download_tag',
            'key' => 'download_id',
            'otherKey' => 'tag_id',
        ]
    ];

    public $attachOne = [
        'package_file' => File::class,
        'package_icon' => File::class,
    ];

    public function beforeSave()
    {
        if (!$this->slug) {
            $this->slug = str_slug($this->name);
        }
    }
}
