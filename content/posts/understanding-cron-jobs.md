Do you have your Mautic forms, landing pages and campaign emails ready to go but nothing is happening? If you're using the** self-hosted** version of Mautic, you need to check your CRON jobs.

### Cron jobs are one of the most frequent topics in our Slack chats.

Cron is a time-based job scheduler in Unix-like computer operating systems. Cron schedules jobs (commands or shell scripts) to run at fixed times, dates, or intervals.  **Mautic requires cron jobs to update contacts, campaigns and execute campaign actions.**  Mautic also optionally uses cron jobs to send emails and perform other related tasks.

If you're in the marketing department, that may sound like "greek" to you.  In this Mautic Minute, we explain cron jobs and visually explain each part.

### Mautic requires three cron jobs:



	- Keeping segments current - php /path/to/mautic/app/console mautic:segments:update
	- Keeping campaigns updated -  php /path/to/mautic/app/console mautic:campaigns:update
	- Trigger campaign events - php /path/to/mautic/app/console mautic:campaigns:trigger


![cron jobs in CPanel](https://www.mautic.org/wp-content/uploads/2016/05/cron-jobs-cpanel-1024x574.jpg)


These paths will change based on your web server and Mautic installation.


	- if you're not sure, ask your web host for the path to php .
	- if you're comfortable with the shell and have access, run this command: which php.
	- to find the root of your website run: pwd - then add the Mautic directories after the response (see the image below).


There are several optional cron jobs, depending on your configuration.  You can read the full documentation at  [https://mautic.org/docs/en/setup/cron_jobs.html](https://mautic.org/docs/en/setup/cron_jobs.html). There are a few host-specific notes in the full documentation and it is worthwhile to completely read through.

<script charset="ISO-8859-1" src="//fast.wistia.com/assets/external/E-v1.js" async></script><span class="wistia_embed wistia_async_o7ft2ghy1l popover=true popoverAnimateThumbnail=true videoFoam=true" style="display:inline-block;height:100%;width:100%"> </span>
 

Make sure you subscribe to our [YouTube channel.](https://www.youtube.com/channel/UCcc9_x7_gNICPkrbG2NU9Xw)

If you’d like to suggest a topic, please head over to the #[support](https://mautic.slack.com/archives/support) channel and message @imrodmartin.