<?php namespace trka\Marketplace\Components;

use Cms\Classes\ComponentBase;
use trka\Marketplace\Classes\GhRepoClient;
use trka\Marketplace\Models\Downloads;
use Auth;

class AddNewExtension extends ComponentBase
{
    public $extensionRepo;

    public function onRun()
    {
        $slug = $this->property('slug');
        if ($slug) {
            $this->page['download'] = Downloads::where('slug', $slug)->first();
        }
    }

    public function componentDetails()
    {
        return [
            'name' => 'Upload Extension Handler',
            'description' => ''
        ];
    }

    public function defineProperties()
    {
        return [
        ];
    }

    public function onAddNewMarketplaceDownload()
    {
        $validator = \Validator::make(
            $form = \Input::all(),
            [
                'name' => 'required',
                'type' => 'required',
                'repository_url' => 'required',
            ]
        );
        if ($validator->fails()) {
            throw new \ValidationException($validator);
        }

        $downloadId = (int)$form['downloadid'];
        //-- set remote repo fields
        $repoUrl = $form['repository_url'];
        $repoProvider = '';
        if (strpos($repoUrl, '//github.com/')) {
            $repoProvider = 'github.com';
        } else {
            // @todo: throw unsupported provider error
        }

        $user = \Auth::getUser();
        $model = Downloads::where('id', $downloadId)->first();

        if ($model) {
            $canEdit = $model->userCanEdit();
            if (!$canEdit) {
                // @todo: should return unauthorized.
                \App::abort(403, 'Unauthorized.');
                return false;
            }
        }else {

            $model = new Downloads();
            $model->review_status = 'pending';
        }

        $model->name = $form['name'];
        $model->description = $form['description'];

        $model->repository_provider = $repoProvider;
        $model->repository_url = $repoUrl;
        $model->user = $user;

        //-- if there are empty props, use remote repo to fill them in.
        if ($model->name === '' || $model->description === '') {
            $hydrated = $this->hydrateFromRemote($repoProvider, $repoUrl);

                if ($model->name === '' && method_exists($model, 'name')) {
                    $model->name = $hydrated->name();
                }
                if ($model->description === '' && method_exists($model, 'shortDescription')) {
                    $model->description = $hydrated->shortDescription();
                }
        }

        $model->save();

        $me                  = Auth::getUser();
        return \Redirect::to('mauticians/'.$me->username);


        // @todo return appropriate response.
        return [
            'status' => 'success'
        ];

    }

    private function hydrateFromRemote($provider, $remoteUrl)
    {
        $hydratedRepo = '';
        switch ($provider) {
            case "github.com":
                $path = str_replace("https://github.com/", "", $remoteUrl);
                $hydratedRepo = new GhRepoClient($path);
                break;
            default:
                $path = str_replace("https://github.com/", "", $this->download->repository_url);
                $hydratedRepo = new GhRepoClient($path);
        }

        return $hydratedRepo;
    }

}