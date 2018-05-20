# WordPress & Mautic



![](https://www.mautic.org/wp-content/uploads/2014/10/wordpress-logo_128.png)



![](https://www.mautic.org/wp-content/uploads/2014/09/Mautic_Logo_LB.png)







### About WordPress

WordPress is web software you can use to create a beautiful website or blog. We like to say that WordPress is both free and priceless at the same time.

WordPress started in 2003 with a single bit of code to enhance the typography of everyday writing and with fewer users than you can count on your fingers and toes. Since then it has grown to be the largest self-hosted blogging tool in the world, used on millions of sites and seen by tens of millions of people every day.

[Learn more about WordPress on their website](http://www.wordpress.org).




### Integration Details



The Mautic plugin provides an easy way for WordPress site administrators to implement the Mautic tracking pixel into their website.

Download the plugin and install through the WordPress administrator panel as you would any other plugin. Once you've installed the plugin you need to enter the URL to your Mautic installation and you're done.

[Download](https://github.com/mautic/mautic-wordpress/archive/master.zip)







**Setup**
Once you've installed the plugin, go to the settings screen and insert your mautic URL.
![mautic-wp-plugin](https://www.mautic.org/wp-content/uploads/2015/07/mautic-wp-plugin1.jpg)

**Inserting a Form**
Inserting a form into a post or page is simple.  You'll need the ID of the form you're inserting, then add the following:
`[mautic type="form" id="3"]`.

**Inserting Dynamic Web Content**
You can easily insert content from Mautic in a page or post.  Once the plugin is installed and configured, type:

`[mautic type="content" slot="slot_name"]default text[/mautic]`
You would replace "slot_name" with the name of the slot from the campaign that triggers the dynamic content.

Watch this video for more.

<script src="//fast.wistia.com/embed/medias/crqsq7wwlg.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script>