<?php namespace trka\MauticdotorgExtensions\Components;

use Auth;
use Cms\Classes\ComponentBase;
use RainLab\Forum\Models\Post;
use RainLab\User\Models\User;
use trka\Marketplace\Classes\GhRepoClient;

class UserProfile extends ComponentBase
{
    public $profile;

    public $forumprofile;

    public function componentDetails()
    {
        return [
            'name'        => 'User Profile',
            'description' => 'Display public user profile page',
        ];
    }

    public function defineProperties()
    {
        return [
            'username' => [
                'title'       => 'Username',
                'description' => "Show username",
            ],
        ];
    }

    public function onRun()
    {
        $me                 = Auth::getUser();
        $isSelf             = false;
        $_profile           = null;
        $_userforummessages = null;
        $messagesCount      = null;

        $username = $this->property('username', '');
        $_profile = User::where('username', $username)
            ->first();

        if ($me && $me->username === $username) {
            $isSelf = true;
        }

        if ($_profile) {
            $_userforummessages = $_profile->forum_member->posts->take(25);
            $messagesCount      = $_profile->forum_member->posts->count();
        }

        $this->processDownloads($_profile);

        $this->profile               = $this->page['profile'] = $_profile;
        $this->page['messages']      = $_userforummessages;
        $this->page['messagesCount'] = $messagesCount;
        $this->page['isOwnProfile']  = $isSelf;
    }

    public function onUpdateProfile()
    {
        $fields = \Input::all();

        $validator = \Validator::make(
            $fields,
            [
                'name'         => ['min:3'],
                'surname'      => ['min:3'],
                'location'     => ['min:8'],
                'about'        => ['min:8'],
                'professional' => ['min:8'],
            ]
        );

        if ($validator->fails()) {
            throw new \AjaxException(
                [
                    'error'    => 'Invalid Fields',
                    'messages' => $validator->messages()->all(),
                    'fields'   => $validator->messages(),
                ]
            );

            return;
        }

        $me                  = Auth::getUser();
        $me->name            = $fields['name'];
        $me->surname         = $fields['surname'];
        $me->mtcorg_location = $fields['location'];
        //--
        $me->mtcorg_about        = $fields['about'];
        $me->mtcorg_professional = $fields['professional'];
        //--
        $me->save();

        /*return [
            'status' => 'ok',
            'data' => $fields
        ];*/

        return \Redirect::to('mauticians/profile-single/'.$me->username);
    }

    /**
     * @param $profile
     */
    private function processDownloads(&$profile)
    {
        if (!empty($profile['downloads'])) {

            $downloads = $profile['downloads'];
            foreach ($downloads as $key => $download) {
                $profile['downloads'][$key]['extension'] = $this->hydrateFromRemote(
                    $download->repository_provider,
                    $download->repository_url
                );
            }
        }
    }

    private function hydrateFromRemote($provider, $remoteUrl)
    {
        $hydratedRepo = '';
        switch ($provider) {
            case "github.com":
                $path         = str_replace("https://github.com/", "", $remoteUrl);
                $hydratedRepo = new GhRepoClient($path);
                break;
            default;
        }

        return $hydratedRepo;
    }
}