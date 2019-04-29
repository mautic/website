![gdpr mautic eu policy regulation](https://www.mautic.org/wp-content/uploads/2018/04/europe-3220293_1920-1024x678.jpg)


*Originally published: [http://dbhurley.com/mautic-and-gdpr](http://dbhurley.com/mautic-and-gdpr)*

One of the hottest topics circulating the internet these days is the upcoming legislation surrounding GDPR being put into effect on May 25, 2018. Companies of all sizes are closely watching what this legislation means and taking a hard look at their software to see what is affected. Given the hefty fines, this scrutiny and concern is completely understandable. Mautic, as an open source marketing automation platform and community also holds these concerns and possibly to a much higher degree than others. Our community has hundreds of thousands of businesses running Mautic, and our software is powering their marketing automation effort and customer data collection.

As a result, Mautic is of course highly interested in not only understanding, but also complying with any and all new regulations put forth that promote openness and transparency. Interested isn’t really the right word - more like *actively engaged*. We are dedicated to ensuring that our software not only complies but stands out as a model by which others gauge their own level of implementation.

Before I get too far into those details, let me give a very brief refresh on what GDPR means and what it represents.

### GDPR

**GDPR**, or General Data Protection Regulation, is a new European regulation that enforces the protection and accessibility of personal data for all European citizens. [Read more](https://www.eugdpr.org/)

## Four basic user entitlements
1. Every individual is allowed to know what data is kept by any business; why that data is kept and for how long it’s stored by the business.
2. Every individual has the “Right to Access” their own information and data.
3. Every individual has the “Right to Data Portability” of their information (they can request a copy of their data as it’s stored.)
4. Every individual has the “Right to be Forgotten”. (Request a business change and permanently delete any stored data)

> Now you may be one of the shrewd ones and recognize a specific phrase in the original definition: that’s right the word European. But if you’re reading this from the US, you’re not off the hook just yet. Keep reading.

This new regulation applies to European citizens regardless of where they are located at any time. US companies must abide by these guidelines for any and all customers, contacts, accounts associated with the European Union.

### Personal Data

There is one last aspect of the GDPR we need to consider before getting into some specifics. **What is personal data?** That’s right the GDPR is concerned with the **data** so obviously we need to understand what that data is. *And this is where things get a little bit muddy*. Here’s a short list of the most commonly recognized types of information that falls under this regulation.


 	- Online identifies (IP addresses, mobile device IDs, browser info, MAC addresses, cookies, account IDs, and other forms of system generated user identifiable data)
 	- Racial or ethnic origin
 	- Political opinions
 	- Religious or philosophical beliefs
 	- Trade union memberships
 	- Health data
 	- Sex life or sexual orientation
 	- Past or spent criminal convictions
 	- Genetic & biometric data
 	- Location data
 	- Pseudonymized data


Whew, what a list! Now that we have a bit of a handle on what the GDPR is about (at least at a high level) and you may be sufficiently uneasy about your current software I want to share how Mautic as a product is already compliant and continues to seek the best and most proactive approach in these new guidelines.

### Dual Approach

Based on the four principles listed above let’s look at an optimal Mautic configuration that complies with them. There are two options that existed for Mautic and my desire was to set a precedent for our community, our product and the entire marketing automation space. As I dug into this issue I met with more individuals in our community and in business than I could mention. My desire was to get a better understanding of the regulations and their implications myself. And I am excited to share with you the conclusions I’ve come to. And of course I’m *always interested in more discussions on the subject* and welcome the opportunity to chat with anyone that has questions, ideas or thoughts on this subject. It’s an important one.

Okay, with all that said, let’s dig in. As I mentioned there are 2 paths we can take. The real trouble lies in the uncertainty. I alluded to it earlier when I mentioned the “muddy” aspects of the data. There is a balance that must be struck. Mautic should be proactive and a leader in the implementation of these new guidelines. But time spent on unclear work, or without good direction is wasted and the time of our community developers is far too important to waste.

In order to make the absolutely best use of the developers in our community’s time; and in an effort to make the wisest decision in time and resources I believe the smartest strategy is to take a dual-prong approach. **This is exciting because Mautic software can be easily configured for GDPR regulations today with just a few simple steps.**

### Instant GDPR Compliance

This dual prong approach involves an immediate step and a longer term software feature enhancement. The first step is quick and relatively painless. And with the implementation of a few simple changes to how you currently setup your Mautic instance you’ll be instantly compliant!

Here’s all you will need to do:


 	2. *The very first thing is to plan how to convey and accept explicit data collection consent, usually done through a focus element in Mautic, this step is potentially already being done in the case of cookie collection. As such you may only need to modify the language of your existing focus item.*
 	4. Configure two new segments within your Mautic software, name these segments, **Request to be Forgotten** and **Data Requested**.
 	6. Setup a new form that allows an individual to submit their name/email and select the options they wish to submit (**Request for Data**, **Request to be Forgotten**)
 	8. After each form submission associate them with the correct segment and take the necessary steps to either delete the contact from the database or export their record to a CSV.
 	10. Notify the individual of the action taken.


One of the biggest (and simplest) mistakes I hear is people getting caught up in the thinking that this process needs to be **instantaneous**. While of course each request does need to be handled with expediency, nothing states it needs to be automated. To the best of my understanding, the above 4 step process gives you a GDPR compliant Mautic! Congratulations, you can sleep a little easier.

### GDPR Mautic Software Improvements (Future)

Of course being compliant in this manner is only the first of the two-phase strategy. The second involves some modifications and improvements to the Mautic software. And while this is yet to be fully determined I can share a few ideas that have been circulating.


 	2. New configuration section for GDPR.
 	4. Configuration options that add the necessary acknowledgement checkboxes to forms automatically.
 	6. A semi-automated contact deletion process


This is just for starters and only a few thoughts I’ve had as I’ve listened to some of our European community members share their concerns and their ideas. As I stated earlier I would love to speak with you and continue this discussion. Mautic is committed to being a leader in this regard and demonstrating to others how proper GDPR should be handled. *We have the knowledge of a global community and the power of a flexible and open source development platform enabling us*. Our software can be proactive and our software can demonstrate how others should consider GDPR compliancy. I trust this helps, [join our Discord channels](https://discord.gg/mautic) to learn more and make your voice heard.