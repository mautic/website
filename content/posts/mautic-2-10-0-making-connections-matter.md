![](https://www.mautic.org/wp-content/uploads/2017/09/compass-1753659_1280.jpg)


Let’s be honest. Process handoffs within your business require real focus and attention. These handoffs happen from marketing to sales, sales to services, services to accounting and everywhere in between. The moment your marketing message reaches a potential customer, the expectations begin. Every interaction that you have from discovery through purchase and beyond, can make or break their experience. It’s critical that your business mirror that message throughout every connection, whether in person or online.

In the latest release of Mautic we’ve placed some focus on campaign functionality and the API. Your online brand experience has hundreds, likely thousands of handoffs being made each and every day. Information that is passed through campaign actions and shared through API’s is vital to engaging your audience in a meaningful customer journey. From critical notifications to releasing information at specific times and so much more, all of these elements ensure that your customers are feeling supported at each step.

To support you in maintaining these vital connections, here are the highlights of Mautic 2.10.0;


### Campaign functionality



- **Company fields update via import and forms:** You can now update fields on the company entity via forms and through imports. A new import button has been added to the company page. In addition, a new section called “Company fields” is available to map contact imports to. Similarly when adding a form field to a form, new company fields are available to map to. ([Github link](https://github.com/mautic/mautic/pull/4604))

![](https://www.mautic.org/wp-content/uploads/2017/09/DBA509D8-5A81-4795-B226-2FA5D9A91C03-1024x745.jpeg)

 
- **New Webhook campaign action:** A new action has been added “send a webhook”. This enables you to send specified information to a specified URL as part of a campaign. ([Github link](https://github.com/mautic/mautic/pull/4357))

- **Custom timeframe campaign condition:** A new date function has been added where you can specify as part of a campaign condition, a custom number of days/weeks/month before or after a date associated with a custom field.([Github link](https://github.com/mautic/mautic/pull/4566))

![](https://www.mautic.org/wp-content/uploads/2017/09/81206C97-173C-4BA7-B8AE-925A904141C0-1024x928.jpeg)


- **Timestamp updates on contact field through a campaign:** You can now update a timestamp field on the contact through a campaign using custom functions such as NOW, TODAY, YESTERDAY and TOMORROW. There is also a NULL function that is now available which when added as a contact field update as part of a campaign will clear out the existing value in the specified field for the contact. ([Github link](https://github.com/mautic/mautic/pull/4615))

- **Internal notifications as part of campaign:** A new action has been added to campaigns  - ‘send email to user’ will allow an email notification to be sent to a user, contact's owner or any To, Cc, Bcc email addresses as a campaign action. ([Github link](https://github.com/mautic/mautic/pull/4458))

![](https://www.mautic.org/wp-content/uploads/2017/09/4BA4D47E-488B-470A-886B-8439053F89EB-840x1024.jpeg)


- Additional Campaign actions to; 


- **Post to Facebook and Google Analytics:** There is a new setting added in the configuration section under Tracking Settings. You can add your Facebook pixel ID or your GA id. Using this, information about a contact can be sent as part of a campaign when a contact visits a landing page so that this can be used for Facebook or GA paid campaigns to better filter data and generate target audiences. ([Github link](https://github.com/mautic/mautic/pull/4573))

- **Show Focus Items:** A new action has been added to a campaign after the page visit decision - to show a focus item. ([Github link](https://github.com/mautic/mautic/pull/4666))






### API and Integration Improvements



- **API improvements -** A number of significant improvements have been made to the API to enable data around contact activities to be more easily accessible. The following new data points are now available:


- All events table: ([Github link](https://github.com/mautic/mautic/pull/4548))
- Form submission data: ([Github link](https://github.com/mautic/mautic/pull/4613))
- Webinar data from Citrix: ([Github link](https://github.com/mautic/mautic/pull/4419))



- **Bi-directional updates for Null values for all CRM integrations:** Mautic now supports the ability to bi-directionally sync data where there are NULL values in fields, irrespective of the specified direction of sync. This means, if there is a blank value in a field that has been mapped as part of the plugin, if the value is missing in either system, it will be updated even if the system that has the value is not the system of record for this field. This has been created for the following CRM integrations - Salesforce, Hubspot, ConnectWise, Zoho, MSDynamics, SugarCRM. The feature is configurable by the user. ([Github link](https://github.com/mautic/mautic/pull/4445))

- **Keeping unsubscribes in sync:** Unsubscribe information from supported CRM systems is now available to map as part of configuring the plugin. This is done so that subscription statuses can be kept in sync between CRM systems and Mautic. This is available for the following CRMs - Salesforce, Hubspot, ConnectWise, Zoho, MSDynamics, SugarCRM. ([Github link](https://github.com/mautic/mautic/pull/4459))




### UI/UX Improvements



- **Audit log and integration tabs added to contact for additional visibility:** Two new tabs are available on the contact page to provide you with better visibility into updates made to the contact - Integrations and Audit log. ([Github link 1](https://github.com/mautic/mautic/pull/4457) and [link 2](https://github.com/mautic/mautic/pull/4426))

- **Clickable stats on emails, contacts card view:** The stats labels on the email record are now clickable, enabling you to easily navigate to the list of underlying contacts. (Stats will show total metrics whereas the underlying list will show unique contacts - which means the numbers may not match.) Also, a list of contacts that have been sent the email will now be visible in a new tab called ‘contacts’ on the email detail page. ([Github link 1](https://github.com/mautic/mautic/pull/4576) and [link 2](https://github.com/mautic/mautic/pull/4637))

- **Apply buttons added to landing page, email, campaign builder:** The Mautic builder continues to improve. Now applying changes to any of these elements is made easier with the addition of the Apply button. This enables you to save your changes before closing it.

![](https://www.mautic.org/wp-content/uploads/2017/09/A0826B3C-032D-4360-9AE4-C9246BAEBD09-1024x405.jpeg)


- **Tooltips added to improve usability:** An additional six tooltips have been added to improve the user experience, making Mautic even more user friendly.



The customer journey is maintained not only by your people, but by the technology you use to support it. We trust that the tools in this latest release will assist your business, creating a lasting impression that will result in a relationship not simply a transaction. A huge thank you to our entire community for developing, testing and improving Mautic!

For more detailed information on this release, you can find the [release notes here](https://github.com/mautic/mautic/releases/2.10.0). If you have any questions, please be sure to reach out to us via the [Community Forums](https://www.mautic.org/community), [Slack](https://www.mautic.org/slack/) or our social channels ([Facebook](https://www.facebook.com/MauticCommunity/) & [Twitter](https://twitter.com/mauticcommunity)) and the community will do their best to help.