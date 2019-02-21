<?php namespace trka\MauticdotorgExtensions\Components;

use Auth;
use Carbon\Carbon;
use Cms\Classes\ComponentBase;
use RainLab\Forum\Models\Member;
use RainLab\Forum\Models\Post;
use RainLab\User\Models\User;
use trka\Marketplace\Models\Downloads;

class UserProfiles extends ComponentBase
{
    public $users;
    public $perPage;
    public $current_page;
    public $query = '';

    //-------------------------------------------------- Definitions
    public function componentDetails()
    {
        return [
            'name' => 'User Profiles',
            'description' => 'Display public user profiles',
        ];
    }


    public function defineProperties()
    {
        return [
            'per_page' => [
                'title' => 'Per Page',
                'description' => 'Pagination size',
                'default' => '50'
            ],
            'page' => [
                'title' => 'Page Number',
                'description' => 'Current pagination page',
                'default' => '1'
            ]
        ];
    }

    //-------------------------------------------------- Lifecycle
    public function onRun()
    {
        $this->perPage = 50;
        $this->current_page = 1;
        if ((int)$this->property('per_page')) {
            $this->perPage = (int)$this->property('per_page');
        }
        if ((int)input('page')) {
            $this->current_page = (int)input('page');
        }
        if (input('q')) {
            $this->query = input('q');
        }

        $this->onUserSearch();
    }

    //-------------------------------------------------- Ajax
    public function onUserSearch()
    {
        //-- set this->query if we're providing one here (ajax)
        if (input('q')) {
            $this->query = input('q');
        }
        $users = $this->queryUsers($this->query)->paginate($this->perPage, $this->current_page);
        if($this->current_page > $users->lastPage() || null == $this->current_page){
            $this->current_page = 1;
            $users = $this->queryUsers($this->query)->paginate($this->perPage, $this->current_page);
        }

        $this->page['users'] = $users;
        $this->page['query'] = $this->query;
    }

    //-------------------------------------------------- Abstractions

    /**
     * Returns query-builder boilerplate
     * @param $q
     * @return mixed
     */
    protected function queryUsers($q = null)
    {
        if (null == $q || '' === $q) {
            // get all
            $select = User::orderBy('id', 'desc');
        } else {
            // get search
            $select = User::where('name', 'like', "%$q%")
                ->orWhere('surname', 'like', "%$q%");
        }

        return $select;
    }

    //-------------------------------------------------- Queries

    /**
     * Get current count of registered and activated users
     * @return mixed
     */
    public function count()
    {
        return User::where('is_activated', 1)->count();
    }

    /**
     * Counts users by last_seen, provided an offset in hours.
     * Human-speak: "How many users have logged-in in the last N hours?"
     * @return mixed
     */
    public function recent($sinceHours = 24)
    {
        $benchmark = Carbon::now()->subHours($sinceHours)->toDateTimeString();
        return User::where('last_seen', '>', $benchmark)->count();
    }
}