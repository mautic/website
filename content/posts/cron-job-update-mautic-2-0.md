If you have a self-hosted version of Mautic, then the updates to cron jobs in Mautic 2.0 definitely impacts you.

One of the areas that Mautic is improving upon is industry standardization.  Many of the terms used in Mautic before v1.4 were updated.  With this release, we brought the terminology and functionality of the cron jobs into line as well.  
Here are the updated cron jobs:


	- path/to/php path/to/mautic/app/console mautic:segments:update
	- path/to/php path/to/mautic/app/console mautic:campaigns:rebuild
	- path/to/php path/to/mautic/app/console mautic:campaigns:trigger
	- path/to/php path/to/mautic/app/console mautic:emails:send
	- path/to/php path/to/mautic/app/console mautic:social:monitoring


If you're wondering which cron jobs these replace, Don has provided a great overview at [https://www.mautic.org/community/index.php/4855-2-0-new-mautic-cli-commands](https://www.mautic.org/community/index.php/4855-2-0-new-mautic-cli-commands)

Watch the Video:
<script src="//fast.wistia.com/embed/medias/0nt6bj9ibq.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script>   

If you’d like to suggest a topic, please head over to the #[support](https://mautic.slack.com/archives/support) channel and message @imrodmartin.