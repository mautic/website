![](https://www.mautic.org/wp-content/uploads/2017/08/TrackingVisitorsPost-UGC-1024x576.jpg)

*We're excited to continue sharing content developed by the Mautic community. This post was written by Jurian Janssen.*

Have you ever wondered if you could track more than just visits via the Mautic tracking script? I know I did, and in this article I will show you how we can use URL’s to track anything you want.


#### The Basics


Before we start let’s have a look at these two URL examples. This one is without extra parameter:


```
https://mydomain.com/page/test/
```


And here we have the same URL with an extra parameter:


```
https://mydomain.com/page/test/?email=johndoe@company.com
```


If you use for example MailChimp or CampaignMonitor to send out marketing emails, consider using this technique. Simply add the email address as a parameter at the end of the URL.

In php one can catch this parameter simply with a:


```
$email = $_GET[‘email’];
```


And then proceed to use that parameter for processing. However, there is also a clever way of using the Mautic Javascript to track visitors on your site. Only some slight modifications can make it send off any lead field you want to Mautic.


#### Get Tracking with Mautic


Here is the default script:


```
<script>
    (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
        w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
        m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://mydomain.com/mtc.js','mt');

    mt('send', 'pageview');
</script>
```


In short, what this does is simply pass along the identification parameters such as IP address and device fingerprint, together with the page the user is visiting. Now have a look at the script below.


```
<script>
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};
	
    (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
        w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
        m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://domain.com/mtc.js','mt');

	var email  = getUrlParameter('e');

	if(email !== ''){
		mt('send', 'pageview', {email: email});
	} else {
		mt('send', 'pageview');
	}
</script>
```


The first function is used to extract a custom parameter from the URL. You can use this function for any parameter you want. Just make sure to pass the correct name to the function. In our case the name is ‘email’.

Below that you can see the default part of the Mautic tracking script. This is not relevant for us. It does what it needs to do, no need to concern us with that for now. Below that you will see a new variable is created with the name ‘email’ and the value it will get is the URL parameter for ‘email’. This means that this variable will hold the content of the URL that comes after ‘?email=’, which should be the email address of the user.

Then we have a short if-statement. This statement simply checks if the email parameter is filled or not. If it is not (which is the case for people that visit your website without a newsletter link) it will simply pass along the usual parameters. But if the email parameter is present it will pass along the usual parameters together with the email address.


#### Sending a Custom Parameter

You can send this along by adding ‘{email: email}’ to the mt method. Keep in mind that the first string identifies the field you want to pass along. In this case we want to pass along the email, but this could also be any other field like firstname or lastname, or even a custom field you have created. The second string or value is the actual value that needs to be passed along. Since we put the value we got from the URL in the ‘email’ parameter we just write ‘email’ to indicated that we want to pass along the string inside this value.

Lastly, make sure you enable public updating for the fields you want to track using this method. If public updating is not enabled Mautic will simply drop the field. You can do this by going to the ‘Custom fields’ section, then selecting the field you want and changing ‘publicly updatable’ from ‘no’ to ‘yes’.

Congratulations! You can now track custom parameters on your website!


#### The Possibilities Are Endless


Using the Mautic tracking script this way opens up new ways to identify your contacts. Think about the contact points you have and how you can use them to track different data sets.

If you are using mailing tools like Mailchimp or CampaignMonitor it is super easy to add the add extra parameters to your newsletters. Simply append the extra parameter to all the URL’s in your mail and there you go! In fact, you can use any contact network on point you have and use this methods for the parameters at hand.


#### Security


We should not forget that we are still handing personal data here. If you are appending sensitive data to a URL make sure you think about handling the data safely. What you could do is hash the parameters and de-hash them in your website before you send them off to Mautic. This way anyone who might come across the link cannot read or use the parameters.

Also make sure to use https, also known as SSL if possible. This is simply an extra layer of security added to the request the user will make. Best practice is to use both SSL for your website as well as the connection between your website and Mautic. You will see in the examples above the I have used https in the code, and not http.

And there you go. Now you know how to track custom parameters with the Mautic tracking script. I cannot wait to see what creative ways you all come up with to use this!

------

Want to know more? You can reach Jurian by [email](mailto:support@beech.it) or his [website](https://www.beech.it).