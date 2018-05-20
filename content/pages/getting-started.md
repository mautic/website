# Basic Setup Guide

	Awesome! You’ve downloaded a marketing automation tool.  
That’s a great first step, but where do you go from here?  



	
		
![Platform Zip File](https://www.mautic.org/wp-content/uploads/2014/08/browser_platform-download.jpg)

				
### <span class="purple">Step 1:</span> Install Mautic

				If you have already downloaded the zip from the [download page](https://www.mautic.org/download) or have installed Mautic through some other source (Softaculous, Bitnami, Digital Ocean etc…) then you have already completed the first step. If not then you will need to upload the Mautic package (a zip file) to your server; unzip the files; and then navigate to that location in your browser. You will find Mautic has a very easy to follow on-screen installation process  


			
   

------   


		
			
				
### <span class="purple">Step 2:</span> Add Cron Jobs

				Once you’ve installed Mautic you will need to create a few standard cron jobs to have your software process various tasks. These cron jobs can be created through a cPanel or added through command line. If you are unfamiliar or uncomfortable with this step then we’d recommend [asking in the forums](https://www.mautic.org/community) or in the live [Slack chat](https://www.mautic.org/slack). Here is a list of the cron jobs you’ll need to create.  


			
   			Updating Contact Segments  


   			
```
php /path/to/mautic/app/console mautic:segments:update
```

   			Updating Campaigns  


   			
```
php /path/to/mautic/app/console mautic:campaigns:rebuild
```

   			Sending Email  


   			
```
php /path/to/mautic/app/console mautic:emails:send
```

   			<note><strong>Note:</strong> This cron job is only necessary if you selected queue emails during the installation process.</note>
   			**If you are interested in reading more about these cron jobs or their roles you can review them [in the Mautic documentation](https://mautic.org/docs/en/setup/cron_jobs.html)**  


		

![cPanel](https://www.mautic.org/wp-content/uploads/2014/08/window_cpanel.jpg)

			
   

------   


		
			
				
### <span class="purple">Step 3:</span> Download the IP lookup service database

				By default, Mautic installs set to use MaxMind’s free GeoLite2 IP lookup database. Due to the licensing of the database, it cannot be included with Mautic’s installation package and thus must be downloaded. Click on the cogwheel in the upper right hand of Mautic to view the Admin menu then click Configuration. On the System Settings tab, find the IP lookup service option and click the “Fetch IP Lookup Data Store.”  


			
			![IP Lookup in Platform](https://www.mautic.org/wp-content/uploads/2014/08/platform_ip-lookup.jpg)

			**You could also choose another supported IP lookup service if you prefer.**  


		
   

------   


		
			
				
### <span class="purple">Step 4:</span> Install Tracking Pixel

				 You will need to add either a single tracking pixel, or the javascript below to the websites for each site you wish to track via Mautic. This is a very simple process and you can add this to your website template file, or [install a Mautic integration](https://www.mautic.org/integrations) for the more common CMS platforms.  


			 Here is an example of the tracking pixel:  


```
<img src="http:/domain.com/path/to/mautic/mtracking.gif">
```

			 Here is an example of the javascript:  


			 
```
<script>(function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n; w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t), m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m) })(window,document,'script','http(s)://yourmautic.com/mtc.js','mt'); mt('send', 'pageview');</script>
```


			![Code Editor with Tracking Pixel and Tracking Script](https://www.mautic.org/wp-content/uploads/2014/08/code-editor_tracking-pixel-and-script.jpg)

			
   

------
**If you have questions about this process you can review [the documentation](https://www.mautic.org/docs/en/setup/getting_started.html) for more information.**