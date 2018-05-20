One of the first things every marketing expert knows is the importance of creating an email double opt-in structure where leads can choose to receive emails from you. This protects you as the marketing person from sending a bunch of emails to people who are not interested and mark your message as spam. Get too many emails marked as spam and you have a tough road ahead of you to get a clean email sender again. So, how do you create some way to protect yourself from getting marked as spam?

The answer is to **create a double opt-in email list**. In simplest terms a double opt-in email list means that those users who subscribe to your emails must first click a link you send them confirming their desire to receive emails from you. Creating a double opt-in email campaign is a common task for a marketing integrator. Below you’ll find the five pieces of a double opt-in email campaign.

**1. Create a pending lead list and a confirmed lead list.** These are the lists where you will organize your leads. Before they have completed the opt-in process they will be stored on the pending lead list. Eventually these leads will be moved to the confirmed lead list.

![Email list for double-opt in](https://www.mautic.org/wp-content/uploads/2015/08/pending.png)


 

![Double opt-in confirmed email list](https://www.mautic.org/wp-content/uploads/2015/08/confirmed.png)


**2. Create a landing page to serve as the opt-in confirmation page.** This is the page the user will land on if they click the confirmation link in the initial email you send.

![Simple email marketing ladnign page double-opt iin](https://www.mautic.org/wp-content/uploads/2015/08/lp.png)


**3. Create a new template email to serve as the opt-in message and include a link to the above landing page**. You can either note the ID of the landing page and use in the token {pagelink=ID} as the URL or start typing "{page" in the editor, and a list of landing pages will appear. Click on it and it'll insert a link for you. This is where you prepare the email you’re going to send to your potential leads. This email will direct them to click a link to confirm their subscription.

![Template email marketing automation list opt-in](https://www.mautic.org/wp-content/uploads/2015/08/template_email.png)


 

![Opt-in eamil for marketing automation](https://www.mautic.org/wp-content/uploads/2015/08/opt-in_email.png)


**4. Now create a Campaign form to be used to sign your users up.** This is the very first step in the process. Creating this form as a campaign form means you’ll be able to select it as a source when you build your campaign (next step). You can collect whatever details you wish (remember to keep it simple) and be sure you include their email address as one of your fields.

![Campaign form for email marketing dobule opt-in](https://www.mautic.org/wp-content/uploads/2015/08/campaign_form.png)


**5. Finally build your campaign to tie it all together.** You’ll add your form as the source where you are collecting leads, then you’ll build out the email to send to them, and the landing page you want them to land on when they opt-in. Your campaign flow might look something like below:

![Campaign structure for double opt-in email](https://www.mautic.org/wp-content/uploads/2015/08/opt_in_campaign.png)


### Here’s a step-by-step breakdown of a double opt-in email campaign:

The Sign Up (yellow) lead source is simply our form created in step 4. Any lead who submits the form will be automatically added to the campaign.

![lead source signup for emails](https://www.mautic.org/wp-content/uploads/2015/08/lead_source.png)


Add to pending is a "Modify lead's lists" action that will immediately add the lead to the Pending lead list created in step 1.

![Email marketing add lead to list](https://www.mautic.org/wp-content/uploads/2015/08/add_to_pending.png)


Send in Opt-in Email is a "Send Email" action selecting the email created in step 3.

![Senc email to confirm opt-in to list](https://www.mautic.org/wp-content/uploads/2015/08/send_email.png)


Add a "Visits a page" decision and choose the landing page created in step 2 then connect the bottom of the "Send email" action into the top of the "Visits a page" decision.

![Double opt-in visits landing page](https://www.mautic.org/wp-content/uploads/2015/08/visits_a_page.png)


And finally, add another "Modify lead's lists" and choose to remove the lead from the Pending and add to the Confirmed list. Connect the bottom green anchor, or the direct action decision path, of the "Visits a page" decision to the top of the newly created "Modify lead's list" action.

![Modify lead lists based on email](https://www.mautic.org/wp-content/uploads/2015/08/move_to_confirmed.png)


Now you have a double opt in campaign. You can base all of the mailings, or other campaigns, on lead's that belong to the Confirmed list. When a lead signs up, they'll be added to the Pending list and sent the opt-in email. When they click the link to confirm, they will be removed from the Pending list and added to the Confirmed.