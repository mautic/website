Mautic has a great API to interact with other systems. There is a powerful [PHP REST API library](https://github.com/mautic/api-library) for faster integration with PHP projects. This Mautic API requires [oAuth (1a or 2) authentication](http://blog.varonis.com/introduction-to-oauth/). In case you're unaware, these REST API calls are great for integration with your current system(s). You can simply create a lead or move a lead to a smart list when the lead does something within your app. Here are the basic steps to getting started with the Mautic API.

### 1. Install the Mautic API with Composer

API library is at [Packagist](https://packagist.org/packages/mautic/api-library). So simple `composer require mautic/api-library` command will installation of the library to your project for you. Composer will also automatically include the library to your project.

### 2. Alternate Ways to Install Mautic API

If your project doesn't use Composer yet, don't worry! You can either [clone it from GitHub](https://github.com/mautic/api-library) or [download the ZIP](https://github.com/mautic/api-library/archive/master.zip) package and copy the library folder to your project. Let's look quickly at those two methods and how you would go about using them.

#### Install by git clone



	2. Go to your project folder where you want to place Mautic API library to be. For example:
`cd /var/www/html/myproject`
	4. Run git clone to this folder
`git clone git@github.com:mautic/api-library.git .`
*(the dot at the end means current folder)*



#### Copy from ZIP package



	2. Download the library from [https://github.com/mautic/api-library/archive/master.zip](https://github.com/mautic/api-library/archive/master.zip)
	4. Extract the package to some temporary location.
	6. Copy the `/lib` folder to your project.



### 3. How to Authorize Your Mautic API Application

To use API calls, your application has to be authorized in Mautic instance you want to connect with. Mautic supports OAuth1 and OAuth2. I'll focus to OAuth1 since it doesn't require HTTPS. If your application has some kind of administration, you'll need to add 3 text inputs and an Authorization button.

#### Get authorization keys in Mautic

You can create specific authorization API credentials for each connected application. To do that, go to your Mautic administration and follow these steps:


	2. Go to Mautic Configuration / API Settings and set 'API enabled' to 'Yes', leave 'API mode' to 'OAuth1'. Save changes.
	4. At the right-hand side menu where Configuration is should appear the new menu item 'API Credentials'. Click this menu item.
	6. Create a new set of credentials. Fill in the 'Name' (name of your app for example) and the Callback URL (URL where your app will be listening responses from Mautic). Save your new credentials.
	8. Mautic will generate 'Consumer Key' and 'Consumer Secret' key.



#### Create authorization form

If you don't want to hard-code authorization details then you can create a form with the following text inputs: **Mautic Base URL**, **Consumer Key** and **Consumer Secret** with **Save & Authorize** button. This form should not be accessible for public.
**Note**: You can test authorization and API requests in build-in API Tester. You can find it in the /apitester directory of Mautic API Library.

#### Handle authorization request

When the user for your app hits **Save & Authorize**, this is how you will handle the request:

```
// @todo check if the request is sent from user with admin rights
// @todo check if Base URL, Consumer/Client Key and Consumer/Client secret are not empty

// @todo load this array from database or config file
$accessTokenData = array(
    'accessToken' => '',
    'accessTokenSecret' => '',
    'accessTokenExpires' => ''
);

// @todo Sanitize this URL. Make sure it starts with http/https and doesn't end with '/'
$mauticBaseUrl = $_POST['mauticBaseUrl'];

$settings = array(
    'baseUrl'           => $mauticBaseUrl,
    'clientKey'         => $_POST['clientKey'],
    'clientSecret'      => $_POST['clientSecret'],
    'callback'          => 'http://yourapp.com', // @todo Change this to your app callback. It should be the same as you entered when you were creating your Mautic API credentials.
    'version'           => 'OAuth1a'
);

if (!empty($accessTokenData['accessToken']) && !empty($accessTokenData['accessTokenSecret'])) {
    $settings['accessToken']        = $accessTokenData['accessToken'] ;
    $settings['accessTokenSecret']  = $accessTokenData['accessTokenSecret'];
    $settings['accessTokenExpires'] = $accessTokenData['accessTokenExpires'];
}

$auth = \Mautic\Auth\ApiAuth::initiate($settings);

if ($auth->validateAccessToken()) {
    if ($auth->accessTokenUpdated()) {
        $accessTokenData = $auth->getAccessTokenData();
        // @todo Save $accessTokenData
        // @todo Display success authorization message
    } else {
        // @todo Display info message that this app is already authorized.
    }
} else {
    // @todo Display info message that the token is not valid.
}
```

The workflow can be broken down like this:


	2. Admin user fills in the Access Keys and Mautic Base URL to the form.
	4. If `$accessTokenData` aren't known yet, `$auth->validateAccessToken()` will redirect user to Mautic where he can authorize the app.
	6. After user confirms authorization, Mautic will redirect him back (to the Callback URL) to your app.
	8. `$auth->getAccessTokenData()` will return $accessTokenData which you have to save.


Live examples of authorization can be found at:


	- [Mautic API Tester](https://github.com/mautic/api-library/blob/master/apitester/index.php)
	- [Mautic-Joomla plugin](https://github.com/escopecz/mautic-joomla/blob/master/mautic.php#L170)



### 4. Making API Calls

Finally the fun part. I suppose the most frequently used REST API call will be to create new lead in Mautic. For example, if a visitor submits a form in your app. Since this is probably the most widely used, here is an example of the code to do this:
**Note:**`$auth` and `$mauticBaseUrl` are the same as from the code above. It would be clever to add those to methods to have them accessible from different places

```
$leadApi    = \Mautic\MauticApi::getContext(
    "leads",
    $auth,
    $mauticBaseUrl . '/api/'
);

$lead = $leadApi->create(array(
    'ipAddress' => $_SERVER['REMOTE_ADDR'],
    'firstname' => $formData['firstname'],
    'lastname'  => $formData['lastname'],
    'email'     => $formData['email'],
));
```

There is so much more you can do. Fortunately all of these API examples and more are described here in the [API Library Documentation](https://github.com/mautic/api-library#using-the-mautic-api-library). Don't wait, get started now building something amazing!

------
*This post was originally published on [http://johnlinhart.com/blog/implementing-mautic-api](http://johnlinhart.com/blog/implementing-mautic-api)*