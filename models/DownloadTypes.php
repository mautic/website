<?php namespace trka\Marketplace\Models;

use Model;

/**
 * Model
 */
class DownloadTypes extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'label', 'slug'
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'trka_marketplace_download_types';

    public $hasMany = [
        'downloads' => '\trka\Marketplace\Models\Downloads'
    ];
}
