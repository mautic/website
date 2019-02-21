<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 6/10/18
 * Time: 8:11 AM
 */

namespace trka\MauticdotorgExtensions\Components;

/**
 * Class FilterableChannels
 * @package trka\MauticdotorgExtensions\Components
 *
 * @todo: default fallback, right now, loads a different filter slug. consider: should it instead return a redirect? this might be more semantic.
 */
class FilterableChannels extends \RainLab\Forum\Components\Channels
{
    public $filterSlug;
    public $defaultSlug;

    public function componentDetails()
    {
        return [
            'name' => 'Filterable Channels',
            'description' => 'Extends Rainlan.Forum.Channels to allow filtering channels before render.'
        ];
    }

    public function defineProperties()
    {
        $props = parent::defineProperties();
        $props['filterSlug'] = [
            'title' => 'Show Slug',
            'description' => 'Only show the channel with this slug'
        ];
        $props['defaultSlug'] = [
            'title' => 'Default slug',
            'description' => 'Fallback if filterSlug fails'
        ];
        return $props;
    }

    public function onRun()
    {
        $this->filterSlug = $this->page['filterSlug'] = $this->property('filterSlug');
        $this->defaultSlug = $this->page['defaultSlug'] = $this->property('defaultSlug');
        parent::onRun();
        $this->page['channels'] = $this->listChannels();
    }

    public function onRender()
    {
    }

    public function listChannels()
    {
        // @todo: is there a more efficient way to do this? eg: altering the parent's query, vs. filtering after the fact (what's happening now).
        $channels = parent::listChannels();
        $filteredChannels = $this->filterChannels($this->filterSlug, $channels);
        if (count($filteredChannels) === 0) {
            $filteredChannels = $this->filterChannels($this->defaultSlug, $channels);
        }
        if (count($filteredChannels) === 0) {
            $filteredChannels = parent::listChannels();
        }
        return $filteredChannels;
    }

    protected function filterChannels($needle, $haystack)
    {
        $ret = [];
        foreach ($haystack as $chan) {
            if ($chan->slug === $needle) {
                $ret[] = $chan;
            }
        }
        return $ret;
    }
}