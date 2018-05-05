<?php namespace trka\MauticdotorgExtensions;

use System\Classes\PluginBase;
//-- Controllers
use RainLab\User\Controllers\Users as UsersController;
//-- Models
use RainLab\User\Models\User as UserModel;
use Rainlab\Forum\Models\Post as ForumPostModel;

class Plugin extends PluginBase
{
    public function boot()
    {
        /**
         * Add fields to user model
         */
        UserModel::extend(function ($model) {
            $model->addFillable([
                'mtcorg_points'
            ]);
        });

        /**
         * Add fields to Forum Posts model
         */
        ForumPostModel::extend(function ($model) {
            $model->addFillable([
                'mtcorg_points',
            ]);
        });

        ForumPostModel::extend(function ($model) {
            /**
             * $value will be an arbitrary number to mutate by.
             *  upvotes are +1 (or more)
             *  downvotes are -1 (or more)
             */
            $model->addDynamicMethod('modVotes', function ($value) use ($model) {
                $model->mtcorg_points = $model->value + $value;
                $model->save();
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
                ]

            ]);
        });
    }


    /**
     * Provide components
     * @return array
     */
    public function registerComponents()
    {
        return [
            \trka\MauticdotorgExtensions\Components\Votable::class => 'votable'
        ];
    }

    public function registerSettings()
    {
    }
}
