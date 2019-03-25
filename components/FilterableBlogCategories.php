<?php

namespace trka\MauticdotorgExtensions\Components;

use Auth;
use RainLab\Blog\Components\Categories;
use RainLab\Forum\Models\Channel;
use Request;
use Redirect;
use Cms\Classes\Page;
use Cms\Classes\ComponentBase;
use RainLab\Forum\Models\Topic as TopicModel;
use RainLab\Forum\Models\Member as MemberModel;
use RainLab\Forum\Classes\TopicTracker;

/**
 * Topic list component
 *
 * Displays a list of all topics.
 */
class FilterableBlogCategories extends Categories
{
    /**
     * @return array
     */
    protected function loadCategories()
    {
        $categories = parent::loadCategories();
        if (!$this->property('categoryFilter')) {
            return $categories;
        }
        $filtereCategories = [];
        foreach ($categories as $category) {
            if ($this->property('categoryFilter') == $category->slug) {
                $filtereCategories[] = $category;
            }
        }
        return $filtereCategories;
    }
}
