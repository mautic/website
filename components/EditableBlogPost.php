<?php
/**
 * Created by IntelliJ IDEA.
 * User: kevin
 * Date: 7/29/18
 * Time: 12:02 PM
 */

namespace trka\MauticdotorgExtensions\Components;


use Cms\Classes\ComponentBase;
use RainLab\Blog\Models\Post;

class EditableBlogPost extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'trka.mauticdotorgextensions::lang.editableBlogPost.component.name',
            'description' => 'trka.mauticdotorgextensions::lang.editableBlogPost.component.name',
        ];
    }

    public function onSaveEditablePost()
    {
        $form = \Input::all();

        $validator = \Validator::make(
            $form,
            [
                'title' => 'required|min:3',
                //'status' => 'required',
                'category' => 'required',
                'content' => 'required|min:16'
            ]
        );

        if ($validator->fails()) {
            throw new \ValidationException($validator);
        }

        //-- vals
        $postid = (int)$form['postid'];
        $title = $form['title'];
        $category = $form['category'];
        //$status = $form['status'];
        $content_html = $form['content'];

        //-- prelim. checks
        $author = \Auth::getUser();
        $postOb = Post::where('id', $postid)->first();

        if ($postOb) {
            $canEdit = $postOb->userCanEdit();
            if (!$canEdit) {
                // @todo: should return unauthorized.
                \App::abort(403, 'Unauthorized.');
                return false;
            }
        } else {
            $postOb = new Post();
            $postOb->contributor = $author;
            $postOb->slug = str_slug($title);
        }

        //-- sanitation
        $content_clean = \October\Rain\Html\HtmlBuilder::clean($content_html);

        //-- update
        $postOb->title = $title;
        $postOb->content_html = $content_clean;
        $postOb->content = $content_clean;
        $postOb->categories = $category;
        // $postOb->status = $status //@todo model support for status
        $postOb = $postOb->save();

        return [
            'status' => 'success'
        ];
    }


}