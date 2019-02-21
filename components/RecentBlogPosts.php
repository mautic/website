<?php namespace trka\MauticdotorgExtensions\Components;

use Cms\Classes\ComponentBase;
use RainLab\Blog\Models\Post;
use RainLab\Forum\Models\Topic;

class RecentBlogPosts extends ComponentBase
{
    public $count;
    public $posts;

    public function componentDetails()
    {
        return [
            'name' => 'Recent Posts',
            'description' => 'Display most recent blog posts',
        ];
    }

    public function defineProperties()
    {
        return [
            'count' => [
                'title' => 'Count',
                'description' => "Number of posts to fetch"
            ]
        ];
    }

    public function onRun()
    {
        $this->count = (int)$this->property('count', '10');
        $this->posts = $this->loadBlogPosts();
    }

    public function loadBlogPosts()
    {
        $posts = Post::where('published', 1)
            ->orderBy('published_at', 'desc')
            ->take($this->count)
            ->get();
        return $posts;
    }

}