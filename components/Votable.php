<?php namespace trka\MauticdotorgExtensions\Components;

use Auth;
use \Rainlab\Forum\Models\Post as ForumPost;
use RainLab\Forum\Models\Post;

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
                $post->modVotes($mutate);

                return \Redirect::refresh();
                break;
        }
    }

    /**
     * Ajax handler to flag provided post as accepted answer in a topic.
     * @return array|bool
     * @todo: this handler is misplaced in Votable. Find a better home for it.
     */
    public function onToggleAccept()
    {
        $item = post('item');
        $post = Post::where('id', $item)->first();
        if (!$post) {
            return false;
        }

        $post->setAccepted(!$post->mtcorg_acceptedanswer);

        //-- stability/less optimistic: rather than assume $post, return a fresh topic->acceptedAnswer
        $accepted = $post->topic->acceptedAnswer();
        if(null === $accepted){
            return $this->page['accepted_answer_id'] = null;
        }
        $this->page['accepted_answer_id'] = $post->topic->acceptedAnswer()->id;
    }
}