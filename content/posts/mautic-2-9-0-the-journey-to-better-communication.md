![](https://www.mautic.org/wp-content/uploads/2017/07/berlin-630640_1920-1024x577.jpg)


Since the very beginning, Mautic set out on a journey to change the way businesses communicate with their audiences. It began with simplicity. The design of Mautic was intended to be effortless and simple in its functionality. We also set out to connect with audiences through a variety of channels, not just email. Maybe more importantly than functional simplicity, and channel diversity was integrating marketing communications throughout the entire customer journey. That meant integrating with other systems in the marketing stack. Whether home-grown or off-the-shelf, legacy or modern, our open API seeks to bring that complete vision to life.

We’re excited to share that there has been a number of improvements to existing integrations and features, as well as new features and integrations that have been added in the 2.9.0 release of Mautic.   


### Integrations:



##### Systems Connectivity:



- **Zapier:** A new integration with Zapier has been created which is available through the Zapier interface. This integration allows a you to create workflows in Zapier based on data from Mautic. These workflows can be triggered based on form submission data, email open data, page hit data, point change data and contact creation or updated data. So many opportunities to provide information across your organization, making each customer experience more relevant and valuable.

- **Connectwise:** Similarly, a bi-directional sync with Connectwise is now available as a standard plugin. Leads can be created in Connectwise from form or campaign actions in Mautic. Data from Connectwise can be brought back to the contact and company records in Mautic. There is also a full sync option available where any changes made or new contacts created in Mautic can be pushed to Connectwise on a periodic basis.



##### CRM:



- **CRM Integrations:** With this release we are announcing a number of standard CRM plugins to Mautic. With each one of these plugins, a bi-directional sync is standard. Leads can be created in each of these CRM’s from form or campaign actions in Mautic. Data from the CRM’s can be brought back to the contact and company records in Mautic as well. There is also a full sync option available where any changes made in Mautic can be pushed to the CRM’s on a periodic basis. *(NOTE: Although each plugin exhibits similar functionality, each will require unique configuration, so be on the lookout for further instruction.) * These CRM’s include:


   - SugarCRM (v6.x and v7.x will be supported.)
   - Zoho
   - MS Dynamics
   - PipeDrive



**

2. Salesforce optimization:** Along with these standard CRM plugins, the Salesforce plugin has been refactored for performance improvements and scalability. We have also fixed the issue where boolean fields did not sync properly in some cases.



In addition to the exciting integration updates, there has also been work done on one of the most powerful aspects of Mautic, reporting. We all recognize that the ability to review the information that is being gathered is critical to the success of any given effort. These new filters and bug fixes will equip you with better data, making engagement with your audiences more effective.


### 
Reporting



- **Reporting filters:** You can now specify And/Or conditions at the same level between multiple filters on a report. Additional operators have also been added - these include: 


   - contains (e.g you can have a filter of last name contains "lbe" to pull in all contacts that match %lbe%)
   - starts with (e.g. you can have a filter of last name starts with "Gil" to pull in all contacts that match Gil%)
   - ends with (e.g. you can have a filter of last name ends with "bert" to pull in all contacts that match %bert)



- **Device filters:** You can now create segments based on what device type, brand, OS and model the contact has accessed a marketing communication from. 

- **Metric alignment:** A number of issues regarding report inconsistencies in different areas of the product specifically around emails have been resolved.




### Functionality



- **Focus Items Formatting:** You can now format the content for focus items! A new section called ‘content’ has been added to the builder for focus items that enables you to format content in basic, editor or html mode. This opens the door for even more creativity when engaging visitors to your site.




### Infrastructure And Performance



- **List upload speed improvement:** The list upload speed has been significantly improved. Lists now take ⅙ of the time they did before this enhancement - meaning, if a file took 60 seconds to upload it now takes 10! From a UI perspective, for fields with more than 1000 records, the import process will now run in the background and notify you when complete. It will automatically switch to this background process for files that have over 1000 records so that you are free to leave the page and work in other areas of Mautic. Now there's even more time to accomplish what you set out to do. 



We’re grateful for the those of you who made the effort to load the beta release of 2.9.0 and test the variety of features, functionality and fixes that were part of this release. Mautic would not be where it is today without the incredible community that we have. 

For more detailed information on this release, you can find the [release notes here](https://github.com/mautic/mautic/releases/2.9.0). If you have any questions, please be sure to reach out to us via the [Community Forums](https://www.mautic.org/community), [Slack](https://www.mautic.org/slack/) or our social channels ([Facebook](https://www.facebook.com/MauticCommunity/) & [Twitter](https://twitter.com/mauticcommunity)) and we will do our best to help.


### Links to Tutorial Videos


- [SugarCRM Integration Setup](https://mautic.com/help/set-sugarcrm-integration/)
- [Microsoft Dynamics Integration Setup](https://mautic.com/help/set-microsoft-dynamics-integration/)
- [Pipedrive Integration Setup](https://mautic.com/help/set-pipedrive-integration/)
- [Zapier Integration Setup](https://mautic.com/help/set-zapier-integration/)