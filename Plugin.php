<?php namespace trka\MauticdotorgExtensions;

use System\Classes\PluginBase;
use RainLab\User\Controllers\Users as UsersController;
use RainLab\User\Models\User as UserModel;

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

    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }
}
