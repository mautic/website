<div class="card">
    <div class="card-body">
        <h1>Getting Started with Mautic</h1>
        <p>Awesome! You just downloaded the world's best marketing automation tool. That is a great first step. <br />Here is a short guide to help get you started on what comes next in 4 easy steps.</p>
    </div>
</div>


<div class="card card-collapsed">
    <div class="card-header">
        <button type="button" class="btn btn-icon btn-brand-purple btn-sm mr-2">1</button>
        <h3 class="card-title">Download and Install Mautic</h3>
        <div class="card-options">
            <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
        </div>
    </div>
    <div class="card-body">
        <p>If you have already downloaded the zip from the <a href="https://www.mautic.org/download">download page</a> or have installed Mautic through some other source (Softaculous, Bitnami, Digital Ocean etc…) then you have already completed the first step. If not then you will need to upload the Mautic package (a zip file) to your server; unzip the files; and then navigate to that location in your browser. You will find Mautic has a very easy to follow on-screen installation process  
        </p>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <button type="button" class="btn btn-icon btn-brand-purple btn-sm mr-2">2</button>
        <h3 class="card-title">Add Cron Jobs</h3>
        <div class="card-options">
            <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
        </div>
    </div>
    <div class="card-body">
        <p>
        	Once you’ve installed Mautic you will need to create a few standard cron jobs to have your software process various tasks. These cron jobs can be created through a cPanel or added through command line. If you are unfamiliar or uncomfortable with this step then we’d recommend [asking in the forums](https://www.mautic.org/community) or in the live [Discord chat](https://discord.gg/mautic). Here is a list of the cron jobs you’ll need to create.  
        </p>
        <div class="card">
            <div class="card-body">
    		    <h4>Updating Contact Segments</h4>
                <p><code>php /path/to/mautic/app/console mautic:segments:update</code></p>
   	        </div>
   	    </div>
   	    <div class="card">
            <div class="card-body">
    		    <h4>Updating Campaigns</h4>
                <p><code>php /path/to/mautic/app/console mautic:campaigns:rebuild</code></p>
   		    </div>
   		</div>
   		<div class="card">
            <div class="card-body">
    		    <h4>Sending Email</h4>
                <p><code>php /path/to/mautic/app/console mautic:emails:send</code></p>
   		        <div class="alert alert-primary alert-sm"><strong>Note:</strong> This cron job is only necessary if you selected queue emails during the installation process.</div>
   		   </div>
   		</div>
   		<div class="text-muted small">If you are interested in reading more about these cron jobs or their roles you can review them <a href="https://mautic.org/docs/en/setup/cron_jobs.html">in the Mautic documentation</a></div>
    </div>
</div>


<div class="card">
    <div class="card-header">
        <button type="button" class="btn btn-icon btn-brand-purple btn-sm mr-2">3</button>
        <h3 class="card-title">Configure IP Lookup</h3>
        <div class="card-options">
            <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
        </div>
    </div>
    <div class="card-body">
        <p>By default, Mautic installs set to use MaxMind’s free GeoLite2 IP lookup database. Due to the licensing of the database, it cannot be included with Mautic’s installation package and thus must be downloaded. Click on the cogwheel in the upper right hand of Mautic to view the Admin menu then click Configuration. On the System Settings tab, find the IP lookup service option and click the “Fetch IP Lookup Data Store.”  
        </p>
		<div class="small text-muted">You could also choose another supported IP lookup service if you prefer.</div>
    </div>
</div>
	

<div class="card">
    <div class="card-header">
        <button type="button" class="btn btn-icon btn-brand-purple btn-sm mr-2">4</button>
        <h3 class="card-title">Install Tracking Javascript</h3>
        <div class="card-options">
            <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
        </div>
    </div>
    <div class="card-body">
        <p>You will need to add the javascript below to the websites for each site you wish to track via Mautic. This is a very simple process and you can add this to your website template file, or <a href="https://www.mautic.org/integrations">install a Mautic integration</a> for the more common CMS platforms.  
        </p>
        <h4>Javascript to insert into your HTML</h4>
        <div class="highlight p-2">
            <div class="nt">&lt;script&gt;</div>
                (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n; w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t), m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m) })(window,document,'script','<strong>https://yourwebsite.com/path/to/mautic</strong>/mtc.js','mt'); mt('send', 'pageview');
            <div class="nt">&lt;/script&gt;</div>
        </div>
        <h4>Alternative</h4>
	    <div class="text-muted">Here is an example of a tracking pixel if you cannot use javascript</div>
	    <div class="highlight p-2">
	        &lt;img src="<strong>https://yourwebsite.com/path/to/mautic</strong>/mtracking.gif"&gt;</div>
    </div>
</div>