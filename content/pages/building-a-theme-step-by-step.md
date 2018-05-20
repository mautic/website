<section class="intro">
	<img class="icon" src="https://mautic.org/wp-content/themes/hueman/img/icon/icon_build_green.svg">
	<h1>Building a Theme, Step by Step</h1>
	<p>Mautic offers a lot of flexibility when it comes to creating themes.<br>As you learn more, you will be able to harness more and more of the benefits of custom themes.</p>
	<span class="question">Follow this guide to create a theme for a landing page, email, form, or all three!</span>
</section>
<section class="guide">
<div class="guide-sections">
<div class="row">
<h2>Preliminary Theme Setup</h2>
<div class="piece">
<div class="c5">
<p>Download an existing theme from the themes section of your Mautic platform.</p> 
<p>Once you expand the theme locally, you will already have a basic theme framework to work from.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/download-theme.jpg" alt="download theme">
</div>
</div>
<div class="piece">
<div class="c5">
<p>Determine what asset types your theme will feature.</p>
<p>Your options are <strong>page, email, and form.</strong></p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/asset-types.jpg" alt="asset type examples">
</div>
</div>
<div class="piece">
<div class="c5">
<p>Locate and open the <strong>config.json</strong> file.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/find-config.jpg" width="234" alt="find config.json">
</div>
</div>
<div class="piece">
<div class="c5">
<p>Give your theme a name, author, and your personal or company website.</p>
<p>Then, specify what asset types your theme will feature.</p>
</div>
<div class="c7">
<pre>{
 "name": <strong>"Theme"</strong>,
 "author": <strong>"Author"</strong>,
 "authorUrl": <strong>"http://www.mautic.org"</strong>,
 "features": [
  <strong>"email",
  "page",
  "form"</strong>
 ]
}</pre>
</div>
</div>
<div class="piece">
<div class="c5">
<p>Place any images that will be included in your theme in a sub-folder directly within the theme folder.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/place-images.jpg" width="321" alt="place images">
</div>
</div>
<div class="piece">
<div class="c5">
<p>Place any other assets like font files or Javascript files in the theme folder.</p>
<note><strong>Note:</strong> Using sub-folders is not necessary, but they help with organization.</note>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/extra-assets.jpg" width="338" alt="extra assets">
</div>
</div>
<div class="piece">
<div class="c5">
<p>Create a <strong>250px by 250px</strong> thumbnail.png file.</p>
<p>This will be used as your theme's thumbnail in the landing page and email editors.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/create-thumbnail.jpg" width="224" alt="create thumbnail">
</div>
</div>
<p>After you finish your theme's preliminary setup, you're ready to build your assets!
</p></div>

<div class="row">
<h2>Building a Landing Page</h2>
<div class="piece">
<div class="c5">
<p>Add "page" to the theme features in your config.json file.</p>
</div>
<div class="c7">
<pre>"features": [
 <strong>"page"</strong>
]</pre>
</div>
</div>
<div class="piece">
<div class="c5">
<p>Create a CSS file within your theme folder. A sub-folder can help with organization.</p>
<p>If a CSS file already exists, determine whether you want to build off of that stylesheet or delete it and start fresh.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/create-css.jpg" width="236" alt="create css">
</div>
</div>
<h3 class="piece">Setting Up the Landing Page "Base" File</h3>
<div class="piece">
<div class="c5">
<p>Locate and open <strong>base.html.twig</strong> in your "html" folder.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/locate-base.jpg" width="285" alt="locate base">
</div>
</div>
<div class="piece">
<p>Locate the <code><head></head></code> tags. Place a link to your CSS file within the <code><head></head></code>.</p>
<pre><head>
 {% if page is defined %}
 <title>{pagetitle} </title>
 <meta name="description" content="{pagemetadescription}">
 <meta charset="UTF-8">
 {% endif %}
 <strong><link rel="stylesheet" href="{{getAssetUrl('themes/'~template~'/css/style.css')}}" type="text/css"></strong>
<head></pre>
<note><strong>Note:</strong> Be sure to use the <strong>shortcode above</strong> if you link to anything else within your theme folder</note>
</div>
<div class="piece">
<p>Place any other miscellaneous links within the <code><head></head></code></p>
<pre><head>
 {% if page is defined %}
 <title>{pagetitle} </title>
 <meta name="description" content="{pagemetadescription}">
 <meta charset="UTF-8">
 {% endif %}
 <link rel="stylesheet" href="{{getAssetUrl('themes/'~template~'/css/style.css')}}" type="text/css">
 <strong><script type="text/javascript" src="{{ getAssetUrl('themes/'~template~'/js/jquery.js')}}"></script>
 <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></strong>
<head></pre>
<note><strong>Note:</strong> Mautic will respect your theme's external links as long as they use HTTPS protocol (not HTTP).</note>
</div>
<div class="piece">
<p>Place any necessary meta tags in the <code><head></head></code></p>
<pre><head>
 {% if page is defined %}
 <title>{pagetitle} </title>
 <meta name="description" content="{pagemetadescription}">
 <meta charset="UTF-8">
 <strong><meta name="viewport" content="width=device-width, initial-scale=1.0"></strong>
 {% endif %}
 <link rel="stylesheet" href="{{getAssetUrl('themes/'~template~'/css/style.css')}}" type="text/css">
 <script type="text/javascript" src="{{ getAssetUrl('themes/'~template~'/js/jquery.min.js')}}"></script>
 <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<head></pre>
	<p>A  <a href="https://moz.com/blog/seo-meta-tags" target="_blank">quick read about meta tags</a>  will help you determine which ones you want to include in your landing page.</p>
</div>

<h3 class="piece">Building the Landing Page "Page" File</h3>
<div class="piece">
<div class="c5">
<p>Locate and open <strong>page.html.twig</strong> in your "html" folder.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/locate-page.jpg" width="302" alt="locate page">
</div>
</div>
<div class="piece">
<p>Develop the page as you would normally, but only include the HTML that would be within the <code><body></body></code> tags. This belongs within the <code>{% block content %}{% endblock %}</code> tags.</p>
<pre>
{% extends ":"~template~":base.html.twig" %}
{% block content %}
 <strong><section class="hero">
  <div class="container">
   <div class="header">
    <img class="logo" src="{{getAssetUrl('themes/'~template~'/img/logo.svg')}}" />
   </div>
   <div class="main" >
    <h1>Take home your product today!</h1>
   </div>
  </div>
 </section></strong>
{% endblock %}
</pre>
<note><strong>Note:</strong> You can place the entire page.html.twig HTML inside the <code>{% block content %}{% endblock %}</code> tags in base.html.twig to preview your page locally in any browser. You will have to temporarily replace any shortcode links with relative links for the page to render properly.</note>
</div>
<div class="piece">
<p>Make sure you're using the correct shortcode for any asset that will be uploaded in the theme file.</p>
<pre><img class="logo" src="<strong>{{getAssetUrl('themes/'~template~'/img/logo.svg')}}</strong>" /></pre>
</div>
<div class="piece">
<p>Identify areas that will (or may) change each time your theme is used to develop a new page.</p>
<pre><section class="hero">
 <div class="container">
  <div class="header">
   <strong><img class="logo" src="{{getAssetUrl('themes/'~template~'/img/logo.svg')}}" /></strong>
  </div>
  <div class="main" >
   <strong><h1>Take home your product today!</h1></strong>
  </div>
 </div>
</section></pre>
<note><strong>Note:</strong> A safe move is to only choose text and images, so that users unfamiliar with HTML have no chance to break your page when they use the editor.</note>
</div>
<div class="piece">
<p>Wrap your chosen areas in <code><div data-slot="_"></div></code> tags, then wrap those tags in <code><div data-slot-container="1"></div></code> tags as shown below. The content within these tags will appear as default content in the page editor.</p>
<pre><section class="hero">
 <div class="container">
  <div class="header" <strong>data-slot-container="1"</strong>>
   <div <strong>data-slot="image"</strong>>
    <img class="logo" src="{{getAssetUrl('themes/'~template~'/img/logo.svg')}}"/>
   </div>
  </div>
  <div class="main" <strong>data-slot-container="1"</strong>>
   <div <strong>data-slot="text"</strong>>
    <h1>Take home your product today!</h1>
   </div>
  </div>
 </div>
</section></pre>
<note><strong>Note:</strong> Text slots can function the same as image slots, and provide more flexibility.</note>
</div>
<div class="piece">
<p>Identify sections that you may want to rearrange or delete in the builder. Data slots must always be contained by these sections.</p>
<pre><strong><section class="hero"></strong>
 <div class="container">
  <div class="header" data-slot-container="1">
   <div data-slot="image">
    <img class="logo" src="{{getAssetUrl('themes/'~template~'/img/logo.svg')}}"/>
   </div>
  </div>
  <div class="main" data-slot-container="1">
   <div data-slot="text">
    <h1>Take home your product today!</h1>
   </div>
  </div>
 </div>
<strong></section></strong>
</pre>
</div>
<div class="piece">
<p>Wrap each section in <code><div data-section="1"></div></code> tags, then wrap those in <code><div data-section-wrapper="1"></div></code> tags as shown below.</p>
<pre><section class="hero" <strong>data-section-wrapper="1"</strong>>
 <div class="container" <strong>data-section="1"</strong>>
  <div class="header" data-slot-container="1">
   <div data-slot="image">
    <img class="logo" src="{{getAssetUrl('themes/'~template~'/img/logo.svg')}}"/>
   </div>
  </div>
  <div class="col-md-4 offset-md-4 form-wrapper main-raised" data-slot-container="1">
   <div data-slot="text">
    <h1>Take home your <span style="color: #13BEBC">Bit</span>.</h1>
   </div>
  </div>
 </div>
</section></pre>
<note><strong>Note:</strong> Any existing structural tag (not text or image tags) can be given a data-slot, data-slot-container, data-section, or data-section-wrapper attribute.</note>
</div>
<p>Congratulations! The landing page feature is now ready to be used in your theme.</p>
</div>

<div class="row">
<h2>Building an Email</h2>
<div class="piece">
<div class="c5">
<p>Add “email” to the theme features in your config.json file.</p>
</div>
<div class="c7">
<pre>"features": [
 <strong>"email"</strong>
]</pre>
</div>
</div>
<div class="piece">
<div class="c5">
<p>Locate and open <strong>email.html.twig</strong> in your "html" folder.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/find-email.jpg" width="252" alt="find email">
</div>
</div>
<div class="piece">
<p>Locate the <code><head></head></code> tags. Place any necessary meta, style, link and title tags inside the <code><head></head></code></p>
<pre><head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <strong><meta name="viewport" content="width=device-width, initial-scale=1" /></strong>
 <title>{subject}</title>
</head></pre>
</div>
<div class="piece">
<p>Develop your email using <a href="https://www.smashingmagazine.com/2017/01/introduction-building-sending-html-email-for-web-developers/" target="_blank">best practices for email development</a>.</p>
<note><strong>Note:</strong> You can preview your email locally by opening email.html.twig in any browser. You will have to temporarily replace any shortcode links with relative links for the page to render properly.</note>
</div>
<div class="piece">
<p>Use the shortcode below to link to any asset within the theme.</p>
<pre>{{ getAssetUrl('themes/'~template~'/assets/placeholder_logo.png', null, null, true) }}</pre>
<note><strong>Note:</strong> The parameters set to <code>null, null, true</code> specify that the link path does not have a package name or version, and that the link is an absolute link. These must be included in any shortcode link within your email.</note>
</div>
<div class="piece">
<p>Identify areas that will (or may) change each time your theme is used to develop a new email.</p>
<pre><table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
 <tr>
  <td align="center" valign="top" width="100%">
   <table align="center" style="max-width:660px;">
    <tr>
     <td align="center" valign="top">
      <strong><a href="https://demo.com" target="_blank">
       <img src="{{ getAssetUrl('themes/'~template~'/assets/placeholder_logo.png', null, null, true) }}" alt="demo"> 
      </a></strong>
     </td>
    </tr>
    <tr>
     <td align="center">
      <strong><h1>Demo Email</h1></strong>
     </td>
    </tr>
   </table>
  </td>
 </tr>
</table></pre>
</div>
<div class="piece">
<p>Wrap your chosen areas in <code><div data-slot="_"></div></code> tags, then wrap those in <code><div data-slot-container="1"></div></code> tags as shown below. The content within these tags will appear as default content in the email editor.</p>
<pre><table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
 <tr>
  <td align="center" valign="top" width="100%">
   <table align="center" style="max-width:660px;">
    <tr>
     <td align="center" valign="top" <strong>data-slot-container="1"</strong>>
      <div <strong>data-slot="image"</strong>>
       <a href="https://demo.com" target="_blank">
        <img src="{{ getAssetUrl('themes/'~template~'/assets/placeholder_logo.png', null, null, true) }}" alt="demo"> 
       </a>
      </div>
     </td>
    </tr>
    <tr>
     <td align="center" <strong>data-slot-container="1"</strong>>
      <div <strong>data-slot="text"</strong>>
       <h1>Demo Email</h1>
      </div>
     </td>
    </tr>
   </table>
  </td>
 </tr>
</table></pre>
</div>
<div class="piece">
<p>Identify sections that you may want to rearrange or delete in the builder. Data slots must always be contained by these sections.</p>
<pre><strong><table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"></strong>
 <tr>
  <td align="center" valign="top" width="100%">
   <table align="center" style="max-width:660px;">
    <tr>
     <td align="center" valign="top" data-slot-container="1">
      <div data-slot="image">
       <a href="https://demo.com" target="_blank">
        <img src="{{ getAssetUrl('themes/'~template~'/assets/placeholder_logo.png', null, null, true) }}" alt="demo"> 
       </a>
      </div>
     </td>
    </tr>
    <tr>
     <td align="center" data-slot-container="1">
      <div data-slot="text">
       <h1>Demo Email</h1>
      </div>
     </td>
    </tr>
   </table>
  </td>
 </tr>
<strong></table></strong></pre>
</div>
<div class="piece">
<p>Wrap each section in <code><table data-section="1"></div></code> tags, then wrap those in <code><table data-section-wrapper="1"></div></code> tags as shown below.</p>
<pre><table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" <strong>data-section-wrapper="1"</strong>>
 <tr>
  <td align="center" valign="top" width="100%">
   <table align="center" style="max-width:660px;" <strong>data-section-wrapper="1"</strong>>
    <tr>
     <td align="center" valign="top" data-slot-container="1">
      <div data-slot="image">
       <a href="https://demo.com" target="_blank">
        <img src="{{ getAssetUrl('themes/'~template~'/assets/placeholder_logo.png', null, null, true) }}" alt="demo"> 
       </a>
      </div>
     </td>
    </tr>
    <tr>
     <td align="center" data-slot-container="1">
      <div data-slot="text">
       <h1>Demo Email</h1>
      </div>
     </td>
    </tr>
   </table>
  </td>
 </tr>
</table></pre>
<note><strong>Note:</strong> <code><table></code>, <code><td></code>, and <code><div></code> tags can be given a data-slot, data-slot-container, data-section, or data-section-wrapper attribute.</note>
</div>
<p>Congratulations! The email feature is now ready to be used in your theme.</p>
</div>

<div class="row">
<h2>Building a Form</h2>
<div class="piece">
<div class="c5">
<p>Locate and open <strong>form.html.twig</strong> in your "html" folder.</p> 
<note><strong>Note:</strong> form.html.twig can also be copied from <code>app/bundles/FormBundle/Views/Builder/form.html.twig</code> in your Mautic platform.</note>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/locate-form.jpg" width="300" alt="locate form">
</div>
</div>
<div class="piece">
<p>Add/edit any HTML structure within <code>{% block content %}{% endblock %}</code> that you want included in all forms under this theme</p>
<pre>{% extends ":"~template~":base.html.twig" %}
{% block content %}
 {% if message is defined %}
  <div class="well text-center">
   <h2>{{ message|raw }}</h2>
  </div>
 {% endif %}
 <div class="form-container">
  {% if header is defined %}
   <h4>{{ header }}</h4>
  {% endif %}
  {{ content|raw }}
  <strong><a href="/privacy">Privacy Policy</a></strong>
 </div>
{% endblock %}
</pre>
</div>
<div class="piece">
<div class="c5">
<p>Any field type of a form can be modified by bringing its PHP file into the "Field" folder under "html" in your theme.
</p><p>Locate any file from <code>app/bundles/FormBundle/Field</code> in your platform, and copy it to the "field" folder in your theme.</p>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/app-field.jpg" width="338" alt="app field">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/copy-field.jpg" width="313" alt="copy field">
</div>
</div>

<div class="piece">
<p>Add/edit any HTML structure that you want included in all form fields of this type within this theme.</p>
<pre>if ($containerType == 'textarea'):
$textInput = <<<HTML
 <textarea $inputAttr>{$field['defaultValue']}</textarea>
HTML;
<strong>$label = (!$field['showLabel']) ? '' : <<<HTML
 <label $labelAttr>{$field['label']}</label>
HTML;</strong></pre>
</div>
<div class="piece">
<div class="c5">
<p>Locate <strong>style.html.twig</strong> in <code>html/MauticFormBundle/Builder</code>.</p>
<note><strong>Note:</strong> Style.html.twig can also be found in <code>app/bundles/FormBundle/Views/Builder/style.html.twig</code> in the platform.</note>
</div>
<div class="c7 piece-image-container">
<img src="https://www.mautic.org/wp-content/uploads/2014/08/locate-style.jpg" width="312" alt="locate style">
</div>
</div>
<div class="piece">
<p>Add/edit any CSS style that you want included in every form under this theme.</p>
<pre><style type="text/css" scoped>
 <strong>* {
  -webkit-font-smoothing: antialiased!important;
  font-smoothing: antialiased!important;
  -moz-box-sizing: border-box!important;
 }</strong>
</style></pre>
</div>
Congratulations! The form feature is now ready to be used in your theme.
</div>

<div class="row">
<h2>Uploading Your Theme to Mautic</h2>
<div class="piece">
<div class="c5">
<p>Select every top-level file and sub-folder directly within your theme folder. <strong>Do not select the theme folder itself.</strong></p>
</div>
<div class="c7 piece-image-container">
	<img src="https://www.mautic.org/wp-content/uploads/2014/08/select-all.jpg" width="246" alt="select all">
</div>
</div>
<div class="piece">
<div class="c5">
<p>Compress your selection into a .ZIP file, and rename it to something unique.</p>
</div>
<div class="c7 piece-image-container">
	<img src="https://www.mautic.org/wp-content/uploads/2014/08/compress.jpg" width="210" alt="compress and rename">
</div>
</div>
<div class="piece">
<div class="c5">
<p>Upload your .ZIP file into the theme uploader in the "themes" section of your Mautic platform.</p>
</div>
<div class="c7 piece-image-container">
	<img src="https://www.mautic.org/wp-content/uploads/2014/08/upload-theme.jpg" alt="compress and rename">
</div>
</div>
<p>You have just created a theme!</p>
</div>
</div>
</section>