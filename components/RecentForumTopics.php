<?php namespace trka\MauticdotorgExtensions\Components;

use Cms\Classes\ComponentBase;
use RainLab\Forum\Models\Topic;

class RecentForumTopics extends ComponentBase
{
    public $count;
    public $topics;

    public function componentDetails()
    {
        return [
            'name' => 'Recent Forum Topics',
            'description' => 'Display most recent forum topics',
        ];
    }

    public function defineProperties()
    {
        return [
            'count' => [
                'title' => 'Count',
                'description' => "Number of topics to fetch"
            ]
        ];
    }

    public function onRun()
    {
        $this->count = (int)$this->property('count', '10');
        $this->topics = $this->loadForumTopics();
    }

    public function loadForumTopics()
    {
        $topics = Topic::orderBy('created_at', 'desc')
            ->take($this->count)
            ->get();
        return $topics;
    }

}