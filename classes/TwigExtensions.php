<?php namespace trka\MauticdotorgExtensions\Classes;


class TwigExtensions
{

    public static function truncate($str, $length)
    {
        $s = substr($str, 0, $length);
        $s = rtrim($s);
        if (strlen($str) > $length) {
            $s .= '...';
        }
        return $s;
    }
}