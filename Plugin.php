<?php namespace trka\Marketplace;

use System\Classes\PluginBase;
use RainLab\User\Models\User as UserModel;

class Plugin extends PluginBase
{
    public function boot()
    {
        UserModel::extend(function ($model) {
            $model->hasMany['downloads'] = [
                \trka\Marketplace\Models\Downloads::class,
            ];
        });
    }

    public function registerComponents()
    {
        return [
            'trka\Marketplace\Components\SingleDownload' => 'singleDownload',
            'trka\Marketplace\Components\DownloadListing' => 'downloadListing',
            'trka\Marketplace\Components\AddNewExtension' => 'addNewExtension',
        ];
    }

    public function registerSettings()
    {
    }
}
