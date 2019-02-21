<?php namespace trka\Marketplace\Components;

use Cms\Classes\ComponentBase;
use trka\Marketplace\Classes\GhRepoClient;
use trka\Marketplace\Models\Downloads;

class SingleDownload extends ComponentBase
{
    public $download;
    public $extensionRepo;

    public function componentDetails()
    {
        return [
            'name' => 'Single Download',
            'description' => ''
        ];
    }

    public function defineProperties()
    {
        return [
            'slug' => [
                'title' => 'Slug',
                'description' => 'Lookup download by slug'
            ]
        ];
    }

    public function onRun()
    {
        // @todo: the page variables are confusing: download=local entity, extension=github entity. should be download and repository for better understanding
        $slug = $this->property('slug');
        $this->download = $this->page['download'] = Downloads::where('slug', $slug)->first();

        if (null === $this->download) {
            return \Response::make($this->controller->run('404'), 404);
        }

        $this->extensionRepo = $this->hydrateFromRemote($this->download->repository_provider, $this->download->repository_url);
    }

    private function hydrateFromRemote($provider, $remoteUrl)
    {
        $hydratedRepo = '';
        switch ($provider) {
            case "github.com":
                $path = str_replace("https://github.com/", "", $remoteUrl);
                $hydratedRepo = $this->page['extension'] = new GhRepoClient($path);
                break;
            default;
                $path = str_replace("https://github.com/", "", $this->download->repository_url);
                $hydratedRepo = $this->page['extension'] = new GhRepoClient($path);
        }

        return $hydratedRepo;
    }
}