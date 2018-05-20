With great power, comes great responsibility. In marketing, this is never more true than when dealing with marketing automation systems. The volume of programs, emails, landing pages, and other digital assets can be staggering - and conflicts happen. Learning to use a marketing automation program is partially trial-and-error, but you can also learn from the mistakes of other marketers like yourself. The following are three of the most common marketing automation mistakes, and suggestions for preventing these mistakes in your own organization.

### 1. Outdated Content/Assets


#### The Problem

In just a year, think of the number of individual marketing assets that you produce. Between landing pages, sales alerts, operational emails, newsletters, webinar registration pages, and a host of other content types, a company might build and operate thousands of individual assets. With marketing automation, it is trivially easy to create, clone, and approve new assets - but keeping track of existing content is a problem of its own.

If all of your assets are created individually, editing HTML landing pages and emails is difficult and time-consuming. A simple change like editing the Copyright date to keep the page current could take hours of searching through approved landing pages, to say nothing of a more involved change like a brand refresh, color palette change, or address change.

#### The Solution

When you create content, you should always consider the lifecycle of the content - and any potential changes that might have to be made throughout that timeframe. Making your content easier to edit will save you a great deal of time in the long run, and there are tools in most marketing automation systems that are designed to help. For example, Marketo allows users to use "tokens" as common elements across assets in the same workspace - so you could create a "Copyright Date" token, using the token instead of manually entering in the date when you create an asset. This way, you only have to edit the value of the token in a single location, rather than having to edit the copyright date in every single asset where it has been used.

Similarly, using common assets and templates will save you an enormous amount of time in the long run. For example, if all of your webinars use more/less the same structure for their landing pages, you really only need a single webinar landing page - dynamically populating things like the webinar title, images, and form ID with the URL parameters that you use to direct people to that page. Thank you pages, sales alerts, and fulfillment emails can be set up the same way - dramatically reducing the total count of individual assets that you have to manage. Instead of using inline CSS, consider pointing your landing pages to a single stylesheet on your primary company website - giving you the ability to manage your brand style (fonts, colors, etc.) from one location instead of forcing you to jump back into the visual editors every time you need to make a change.

### 2. Failure to Keep Sales Team in Mind


#### The Problem

The 'Best Practices' for marketing and sales aren't always aligned, but B2B companies live and die by their sales teams. Still, far too many marketing departments fail to keep their sales teams in mind - either in the beginning of the marketing automation process when they are designing channels, scoring, and data hygiene elements, or down the road when they are building out landing pages and forms.

For example, have you ever reduced the number of fields on one of your registration forms - hoping to increase the conversion rate by simplifying the amount of data required by your leads? From a marketing perspective, this makes sense - since it simplifies the user experience and increases lead volume, but your sales team might not see things the same way. After all, what is a sales rep supposed to do with a "hot lead" that doesn't have a phone number to call? Without region/state information, how is your CRM system supposed to identify which field sales division the lead should be passed to?

#### The Solution

Keep the sales team in mind throughout the marketing automation process - from planning meetings during implementation through weekly stand up meetings as you continue to send leads to their department. To ensure that your CRM system and marketing automation system are communicating effectively, at least one of your marketing automation specialists should be trained on your CRM, and should understand the way that the fields/objects are being used by the sales personnel.

While you might keep some forms (newsletter, for example) as single-field entries, and you might choose to leave some of your content ungated for the sake of web traffic, the majority of your forms should be utilized for lead generation - and should contain the necessary fields for your sales team to follow up. Sales alerts can be used to enforce SLAs and ensure that hot leads aren't dropped by the sales team, and your scoring system can be continuously refined to find a balance between lead quality and lead volume. Over time, you will also need to develop programs within your marketing automation system that will watch for duplicate records, append lead source information, and provide some commentary for salespeople so they can understand the buyer's journey through your content without having to access the marketing automation platform. A customer note that states "Customer attended 4/15 Data Security Webinar" is a lot more useful to a novice salesperson than an acquisition program field that uses your (relatively) opaque naming conventions.

### 3. Too Many Cooks in the Kitchen


#### The Problem

The last problem is one that might not show up for a while... but one that can completely derail your success with a marketing automation platform. As you continue to use your marketing automation system, different programs and assets will accumulate in a complex web of interdependencies. A single webinar might call from dozens of different templates, operational programs, scoring routines, and lead lists - and changes to any of these building blocks could result in program errors, or in content that doesn't look or function like it was intended. The more people that are working in your marketing automation instance, the more likely these errors become.

Multi-field dependency routines are the most common source of errors. In this type of error, two separate fields both change their values based on the value of the other field - like a lead status and a customer lifecycle status field that both read each other and try to stay in sync. This is usually a result of

new fields being created to replace legacy fields; when the marketing team just adds to their existing fields rather than deleting the old one. The problem with this type of field relationship is that it can cause a constant loop - where leads advance in one field before the other, and then that same field goes back to its original status because it is trying to stay in sync with the legacy field. For example, a "yes/no" marketing qualified legacy field might not be updated anymore, but if your new lead status field changes itself as a response to checkbox changes, it might not allow leads to become qualified since it is reading the "no" value in the older field. With lots of people adding their own "spin" on your marketing and operational programs, unintended errors like this are common.

#### The Solution

Separate your marketing programs and your operational programs, and give permissions for the latter only to a single person!

There is no reason for a webinar campaign/program to edit fields like lead score, qualification, lead status, etc. Instead, the webinar program can be used to "call" a totally separate campaign/program that lives within the operational folder and performs all of the follow-up data changes associated with your webinar channel. This way, you don't have to worry about your various programs changing data values, attributions, or qualification steps - and you can maintain a single list of programs where your scoring and your lead pipeline can be fine-tuned.

With this type of organization, not only can you stop worrying that a content writer might accidentally break your lead lifecycle programs with an accidental field change, but you can also speed the development of your scoring system - since all of your scoring values and changes will be in a single folder (or will be on a single page of tokens, in the case of Marketo). By maintaining the operational permissions under a single account - you can also "trust" inexperienced users to create content, duplicate marketing programs, etc., without giving them the ability to approve programs and make sweeping architecture changes on their own.

### Conclusion

Marketing automation is a critical business system, and it takes some planning to ensure that the architecture you create with a marketing automation platform will be compatible with the rest of your business. Traditionally, this amount of planning and technical uncertainty scared people away from marketing automation - since they'd be locked into a year long (expensive) contract without being able to use the system effectively. A system like [Mautic](https://www.mautic.org) relieves some of that stress, giving marketers the freedom to experiment on an open-source platform without the long-term contracts, and with a supportive community that will help marketers advance their skills and build a good foundation for their entire organization.

------

**Rob Gurley** is a Content Strategist / Technologist at Centerline Digital, a full-service marketing agency in Raleigh, NC. He's worked with enterprise marketing automation in the B2B software / hardware sector, and now helps organizations implement full sales and marketing technology suites. You can find Rob on Twitter [@BullcityRob](https://twitter.com/BullcityRob) or on [LinkedIn](https://www.linkedin.com/in/robgurley)