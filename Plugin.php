<?php namespace trka\MauticdotorgExtensions;

use October\Rain\Support\Collection;
use RainLab\Blog\Models\Post;
use System\Classes\PluginBase;
//-- rainlab.blog
use Rainlab\Blog\Models\Post as BlogPostModel;
use Rainlab\Blog\Controllers\Posts as BlogPostsController;
//-- rainlab.user
use RainLab\User\Controllers\Users as UsersController;
use RainLab\User\Models\User as UserModel;
//-- rainlab.forum
use Rainlab\Forum\Models\Post as ForumPostModel;
use Rainlab\Forum\Models\Topic as ForumTopicModel;
//-- trka.marketplace
use trka\Marketplace\Models\Downloads as DownloadsModel;
use trka\Marketplace\Controllers\Downloads as DownloadsController;
//-- trka.taggable
use trka\MauticdotorgExtensions\Components\EditableBlogPost;
use trka\Taggable\Models\Tag as TagModel;

class Plugin extends PluginBase
{

    //--------------------------------------------------------- plugin core
    /**
     * @var array Plugin dependencies
     */
    public $require = [
        // custom extensions
        'trka.Badges',
        'trka.Groups',
        'trka.Marketplace',
        'trka.Taggable',
        // market extensions
        'RainLab.Blog',
        'RainLab.Forum',
        'RainLab.Translate',
        'RainLab.User',
        'Mey.Breadcrumbs',
        'October.Drivers',
        'OFFLINE.SiteSearch',
    ];

    public function boot()
    {
        $this->extendUserFields();
        $this->extendForumFields();
        $this->featureAddTaggable();
        $this->featureAddUserContribContent();
    }

    /**
     * Provide components
     * @return array
     */
    public function registerComponents()
    {
        return [
            '\trka\MauticdotorgExtensions\Components\Votable' => 'votable',
            '\trka\MauticdotorgExtensions\Components\FilterableChannels' => 'filterableForumChannels',
            '\trka\MauticdotorgExtensions\Components\FilterableTopics' => 'filterableTopics',
            '\trka\MauticdotorgExtensions\Components\FilterableBlogCategories' => 'filterableBlogCategories',
            '\trka\MauticdotorgExtensions\Components\UserProfile' => 'userProfile',
            '\trka\MauticdotorgExtensions\Components\UserProfiles' => 'userProfiles',
            '\trka\MauticdotorgExtensions\Components\RecentForumTopics' => 'recentForumTopics',
            '\trka\MauticdotorgExtensions\Components\RecentBlogPosts' => 'recentBlogPosts',
            '\trka\MauticdotorgExtensions\Components\EditableBlogPost' => 'editableBlogPost',
        ];
    }

    /**
     * Add custom twig filters
     * @return array
     */
    public function registerMarkupTags()
    {
        return [
            'filters' => [
                'truncate' => [
                    '\trka\MauticdotorgExtensions\Classes\TwigExtensions', 'truncate'
                ]
            ]
        ];
    }

    /**
     * Plugin config
     * @return array|void
     */
    public function registerSettings()
    {
    }

    //--------------------------------------------------------- features / extends

    /**
     * General extensions to user entity (ext. profile fields, merit, etc)
     */
    protected function extendUserFields()
    {
        UserModel::extend(function ($model) {
            $model->addFillable([
                'mtcorg_points',
                'mtcorg_about',
                'mtcorg_location',
                'mtcorg_professional',
            ]);
            $model->addJsonable([
                'mtcorg_languages',
                'mtcorg_skills',
                'mtcorg_websites',
            ]);
            $model->addDynamicMethod('points', function () use ($model) {
                $pointsCollection = new Collection([]);
                // @todo: add other point sources
                // @todo: rather than rely on user-centric dynamic method, definitely store this in a model field and update it externally. this is better perf, but more importantly - faaaar more flexible.
                $pointsCollection->push($model->forum_member->posts->sum('mtcorg_points'));

                return $pointsCollection->sum();
            });
        });
        /**
         * Add controls to backend Users forms
         */
        UsersController::extendFormFields(function ($form, $model, $context) {
            if (!$model instanceof UserModel) {
                return;
            }
            $form->addTabFields([
                'mtcorg_points' => [
                    'label' => 'trka.mauticdotorgextensions::lang.status.points',
                    'tab' => 'trka.mauticdotorgextensions::lang.status.tab',
                    'span' => 'auto'
                ],
                'mtcorg_location' => [
                    'type' => 'text',
                    'label' => 'Location',
                    'tab' => 'Profile Info',
                    'size' => 'huge',
                    'span' => 'full',
                ],
                'mtcorg_about' => [
                    'type' => 'textarea',
                    'label' => 'About',
                    'tab' => 'Profile Info',
                    'size' => 'huge',
                    'span' => 'full',
                    'stretch' => true,
                ],
                'mtcorg_professional' => [
                    'type' => 'textarea',
                    'label' => 'Professional Info',
                    'tab' => 'Profile Info',
                    'size' => 'huge',
                    'span' => 'full',
                    'stretch' => true,
                ],
                /*'mtcorg_languages' => [
                    'type' => 'repeater',
                    'label' => 'Languages',
                    'form' => [
                        'lang' => [
                            'type' => 'text',
                            'label' => 'Language'
                        ]
                    ]
                ]*/
            ]);
        });
    }

    /**
     * General extensions to forum entities (accepted answer, upvotes, etc)
     */
    protected function extendForumFields()
    {
        ForumPostModel::extend(function ($model) {
            //-- extend fields
            $model->addFillable([
                'mtcorg_points', 'mtcorg_acceptedanswer'
            ]);
            $model->addVisible([
                'mtcorg_points', 'mtcorg_acceptedanswer'
            ]);

            /**
             * modify post's votes count by $value
             * @var $value number
             */
            $model->addDynamicMethod('modVotes', function ($value) use ($model) {
                $model->mtcorg_points = $model->mtcorg_points + $value;
                $model->save();
            });
            /**
             * set post's accepted status to $value
             * @var $value bool
             */
            $model->addDynamicMethod('setAccepted', function ($value) use ($model) {
                $model->mtcorg_acceptedanswer = (bool)$value;
                $model->save();
            });

            /**
             * Maintain integrity:
             * - if setting accepted, unset accepted on sibling posts
             */
            $model->bindEvent('model.beforeSave', function () use ($model) {
                //-- if we're setting accepted answer, clear previously accepted ans.
                if (isset($model->getDirty()['mtcorg_acceptedanswer']) && true === $model->mtcorg_acceptedanswer) {
                    $previousAccepted = ForumPostModel::where('topic_id', $model->topic_id)
                        ->where('mtcorg_acceptedanswer', 1)
                        ->get();
                    foreach ($previousAccepted as $accepted) {
                        $accepted->setAccepted(false);
                    }
                }
            });
        });
        ForumTopicModel::extend(function ($model) {

            $model->addDynamicMethod('acceptedAnswer', function () use ($model) {
                return $model->posts->where('mtcorg_acceptedanswer', 1)->first();
            });
        });
    }

    /**
     * Enable global tags feature
     */
    protected function featureAddTaggable()
    {
        $globalTagProp = \trka\Taggable\Plugin::GLOBAL_RELATION_PROP_TAG;
        $globalCategoryProp = \trka\Taggable\Plugin::GLOBAL_RELATION_PROP_TAG;

        //-- add relation to other
        DownloadsModel::extend(function ($model) use ($globalCategoryProp, $globalTagProp) {
            $model->belongsToMany[$globalTagProp] = [
                TagModel::class
            ];
        });
        BlogPostModel::extend(function ($model) use ($globalCategoryProp, $globalTagProp) {
            $model->belongsToMany[$globalTagProp] = [
                TagModel::class
            ];
        });

        //-- reflect in tag model
        TagModel::extend(function ($model) {
            $model->belongsToMany['downloads'] = [
                DownloadsModel::class
            ];
            $model->belongsToMany['blog_posts'] = [
                BlogPostModel::class
            ];
        });

        //-- add input to other controllers
        $tablabel = 'Global Relationships';

        DownloadsController::extendFormFields(function ($form, $model, $context) use ($tablabel) {
            if (!$model instanceof \trka\Marketplace\Models\Downloads) {
                return;
            }
            $form->addSecondaryTabFields([
                'globalTags' => [
                    'label' => 'Tags',
                    'span' => 'auto',
                    'tab' => $tablabel,
                    'type' => 'taglist',
                    'mode' => 'relation',
                    'nameFrom' => 'label'
                ]
            ]);
        });
        BlogPostsController::extendFormFields(function ($form, $model, $context) use ($tablabel) {
            if (!$model instanceof \Rainlab\Blog\Models\Post) {
                return;
            }
            $form->addSecondaryTabFields([
                'globalTags' => [
                    'label' => 'Tags',
                    'tab' => $tablabel,
                    'span' => 'auto',
                    'type' => 'taglist',
                    'mode' => 'relation',
                    'nameFrom' => 'label'
                ]
            ]);
        });
    }

    /**
     * Allow front-end users to contribute content (blog posts)
     */
    protected function featureAddUserContribContent()
    {
        //-- add contributor to post
        BlogPostModel::extend(function ($model) {
            $model->belongsTo['contributor'] = [
                UserModel::class
            ];

            $model->addDynamicMethod('userCanEdit', function () use ($model) {
                $_user = \Auth::getUser();
                if (!$_user) {
                    return false;
                }

                $isModelUser = false;
                $isModelContributor = false;

                $modeluser = $model->user;
                if ($modeluser) {
                    $isModelUser = $model->user->id === $_user->id;
                }

                $modelcontributor = $model->contributor;
                if ($modelcontributor) {
                    $isModelContributor = $model->contributor->id === $_user->id;
                }

                return $isModelContributor || $isModelUser;
            });
        });
        BlogPostsController::extendFormFields(function ($form, $model, $context) {
            if (!$model instanceof \Rainlab\Blog\Models\Post) {
                return;
            }
            $form->addSecondaryTabFields([
                'contributor' => [
                    'tab' => 'rainlab.blog::lang.post.tab_manage',
                    'label' => 'Contributor',
                    'span' => 'auto',
                    'type' => 'relation',
                    'nameFrom' => 'username',
                    'emptyOption' => 'Not Contributed'
                ],
            ]);
        });

        //-- inverse on user model
        UserModel::extend(function ($model) {
            $model->hasMany['contributed_posts'] = [
                \Rainlab\Blog\Models\Post::class,
                'key' => 'contributor_id',
                'otherKey' => 'id'
            ];
        });

        \Event::listen('backend.list.extendColumns', function ($widget) {
            if (!$widget->getController() instanceof \Rainlab\Blog\Controllers\Posts) {
                return;
            }
            if (!$widget->model instanceof \Rainlab\Blog\Models\Post) {
                return;
            }

            $widget->addColumns([
                'contributor' => [
                    'label' => 'Contributor',
                    'type' => 'text',
                    'relation' => 'contributor',
                    'select' => 'username',
                    'searchable' => true,
                    'sortable' => true,
                ]
            ]);
        });

    }
}
