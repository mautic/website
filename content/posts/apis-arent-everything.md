## Use Webhooks to Close the Integration Loop

Developer’s love APIs. There are APIs for everything. The popular ones like Google’s javascript mapping APIs, or Twitter’s REST apis. Amazingly useful APIs like Stripe and Paypal for running a business. APIs rule the world.

However, APIs aren’t everything, and they definitely can leave holes in your application’s integration when it comes data. This is because your application because responsible to go and *fetch* information from an API; or go and put information into that remote application using an API call.

What happens when that data can be changed by either application? Imagine a situation where you’re taking lead information from your website, and storing it in Mautic. But you also have another application that you want to house the information. You could use [Mautic’s REST API](https://www.mautic.org/blog/how-to-use-the-mautic-rest-api/) and continually go and fetch new information, merge with any data you’ve curated on your own, and maintain a synced set of data that way.

You don’t have to think about that solution very long before you start realizing where it falls short - synchronized changes become a nightmare. What happens if a remote application changes some data?

A Mautic example might be a lead has the bounced flag added to it. Now your application has to be responsible to re-fetch that information. And your application can’t know that change has occurred, so it has to continually poll that external resource to keep that data synced. It can be a hassle for any application to continually do this. Add in other complications like API limits, which many large API providers like Paypal, Twitter, Google, and Facebook all enforce, and you’re left with a very likely possibility that at some point, you will not have an accurate representation of your data. This would be a lot like taking a roller coaster ride without knowing if the tracks in the loop are complete - you could end up careening to a swift and painful stop! Scary.

### Enter Webhooks

Webhooks are a fantastic solution, guaranteed to save you time and money. A webhook is an HTTP URL endpoint supported by your third party application, which can receive a POST. It feels a lot like a REST API, but for you application’s purposes it is just one half of the API (eg: all the POST endpoints). That endpoint URL is then “executed” each time an “event” occurs. Webhooks close the roller coaster loop and ensure a safe ride for all your data passengers.

Adding webhooks to an application where data is changing constantly is a perfect solution to the API loophole, because now we know that data has changed, and our application just has to be responsible to receive the payload and update it appropriately.

Gone is the need to continually poll the remote resource to find out if data has changed, update it, and then check again in a little while to do the exact same check. This eliminates so many variables. API limits become a non-issue, out of sync data liabilities are reduced, and CPU cycles get saved by everyone in the transaction.

### Webhooks are Simple

Webhooks are perfect at sharing bits of data on-time, when an event occurs, to a remote resource. This is usually all third party developers want from remote systems anyway. In these situations, using an API instead of a Webhook would be massive overkill. Using a webhook avoids the cost and time associated with building out an entire application to support API endpoints.

Next time you’re planning to create a full blown API for your application, ask yourself if the problem you’re trying to solve could be solved with some event listeners and a webhook call to a remote resource.