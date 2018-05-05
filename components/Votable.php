<?php namespace trka\MauticdotorgExtensions\Components;

use Auth;
use \Rainlab\Forum\Models\Post as ForumPost;

class Votable extends \Cms\Classes\ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'trka.mauticdotorgextensions::lang.votable.votable',
            'description' => 'trka.mauticdotorgextensions::lang.votable.votable_description',
        ];
    }

    /**
     * Up/Downvote an item.
     *
     * Usage: [tbd]
     *      <a data-request="onVote" data-request-data="item:1 vote:'up|down'">up/down-vote</a>
     *
     * Accepted Types:
     * - rainlab.forum.post: Forum Post
     *
     */
    public function onVote()
    {
        $user = Auth::getUser();
        $action = post('vote');
        $item = post('item');
        $itemtype = post('itemtype');
        $mutate = $action === 'up' ? 1 : -1;

        switch ($itemtype) {
            case 'rainlab.forum.post':
                $post = ForumPost::where('id', $item)
                    ->first();
                $post->modVotes(1);
                break;

        }
    }


}