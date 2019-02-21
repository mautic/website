<?php namespace trka\Marketplace\Components;

use Cms\Classes\ComponentBase;
use trka\Marketplace\Classes\GhRepoClient;
use trka\Marketplace\Models\Downloads;

class SingleDownloadCard extends ComponentBase
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
            'id' => [
                'title' => 'Download Id',
                'description' => 'Lookup download by id'
            ]
        ];
    }

    public function onRun()
    {
        $downloadId = $this->property('id', 1);
        $this->download = $this->page['download'] = Downloads::where('id', (int)$downloadId)->first();

        if (null === $this->download) {
            return \Response::make($this->controller->run('404'), 404);
        }

        switch ($this->download->repository_provider) {
            case "github.com":
                $path = str_replace("https://github.com/", "", $this->download->repository_url);
                $this->extensionRepo = $this->page['extension'] = new GhRepoClient($path);
                break;
            default;
                $path = str_replace("https://github.com/", "", $this->download->repository_url);
                $this->extensionRepo = $this->page['extension'] = new GhRepoClient($path);
        }
    }

    public function onAddNewMarketplaceDownload()
    {
        $validator = \Validator::make(
            $form = \Input::all(),
            [
                'name' => 'required',
//                'package_file' => 'required|mimes:zip,rar',
//                'package_icon' => 'required|image',
                'type' => 'required',
                'description' => 'required',
            ]
        );
        if ($validator->fails()) {
            throw new \ValidationException($validator);
        }

        $user = \Auth::getUser();

        $model = new Downloads();
        $model->name = $form['name'];
        $model->description = $form['description'];
        $model->package_file = \Input::file('package_file');
        $model->package_icon = \Input::file('package_icon');

        $model->user = $user;

        $model->save();

        // @todo return appropriate response.
        return [
            'status' => 'success'
        ];

    }
}