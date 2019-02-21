<?php namespace trka\Marketplace\Components;

use Cms\Classes\ComponentBase;
use trka\Marketplace\Classes\GhRepoClient;
use trka\Marketplace\Models\Downloads;

class DownloadListing extends ComponentBase
{
    public $downloads;

    public function componentDetails()
    {
        return [
            'name' => 'Downloads List',
            'description' => ''
        ];
    }

    public function defineProperties()
    {
        return [
            'category' => [
                'title' => 'Category',
                'description' => ''
            ],
            'tag' => [
                'title' => 'Tag',
                'description' => ''
            ],
            'type' => [
                'title' => 'Type',
                'description' => ''
            ],
        ];
    }

    public function onRun()
    {
        $all = Downloads::where('review_status', '!=', 'rejected');

        if ($this->property('category')) {
            $all = $all->where('category.slug', $this->property('category'));
        } elseif ($this->property('type')) {
            $all = $all->where('type.slug', $this->property('type'));
        } elseif ($this->property('tag')) {
//            $all->where('tag.slug', $this->property('tag'));
        }

        $this->downloads = $this->page['downloads'] = $all->get();
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