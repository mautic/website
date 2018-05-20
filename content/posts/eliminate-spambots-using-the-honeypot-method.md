![](https://www.mautic.org/wp-content/uploads/2017/05/honey-823614_1920-1024x448.jpg)


*<span style="font-size:18px"> Today we're highlighting a unique approach to eliminating spam bots provided by community member Joan Nin (Slack: @ninjoan).</span>*

------

Are you afraid that your email marketing efforts using Mautic will be affected by spam bots? Wish that there was another alternative that didn't involve CAPTCHAs? Research shows that CAPTCHAs are having a negative impact on conversions. 


> The short story is that CAPTCHAs kill conversions. ([source](https://medium.com/rareview/why-your-captcha-is-killing-conversions-f9be6fe17d1f))


The pain is even bigger if you have a high traffic website and use external email services like Amazon SES, Sendgrid and Sparkpost. If you don’t control these spam bots, you won't be in compliance with their spam rules.

You know what? You aren’t alone.


### Honeypot Method


There is a way to get past this struggle, even if you are not a developer. The solution is to implement an approach called the Honeypot method, in your Mautic forms.

First, login to your Mautic instance. Go to **Settings** (cog icon), then **Custom Fields**. In the Custom Field window, add a new field.

![](https://www.mautic.org/wp-content/uploads/2017/05/Screen-Shot-2017-05-25-at-10.54.52-AM-copy-1024x495.png)


In the **Label** field lets call this **honey**, click **Save & Close**, and continue to the next step.

![](https://www.mautic.org/wp-content/uploads/2017/05/Screen-Shot-2017-05-25-at-10.57.18-AM-copy.png)



### The Setup


Now, let's go to the forms we need to protect using the honeypot method. I would suggest going to the forms that are more prone to attack.

Add a new email field in the forms and select call it **email2** and map that field to the honey field we created.

![](https://www.mautic.org/wp-content/uploads/2017/05/Peek-2017-05-18-13-09.gif)


Now in Mautic v2.8+ we have a new field type called **HTML Area**, we're going to use this field and add the follow code in the HTML area;

![](https://www.mautic.org/wp-content/uploads/2017/05/Peek-2017-05-18-13-404.gif)



```
<style>
#mauticform_label_formname_honeypot { display:none; } 
#mauticform_input_formname_fieldlabel { display:none; } 
#mauticform_label_formname_fieldlabel { display:none; } 
</style>
```


This code will make the **email2** field invisible to the human eye, but not for the spam bots.

------
***NOTE:** You have to replace the **formname** and **fieldlabel** with the form name without space and the field label in your honeypot filed you put in your Mautic.

Another approach to hiding the field would be to specify the **Field Container Attribute** of the **email2** field you want to hide as:
```
style="display:none"
```
*
------
Now let's start eliminating spam bots.


### Eliminate the Spam


Go to all the campaigns you have attached to a Campaign form;

![](https://www.mautic.org/wp-content/uploads/2017/05/Peek-2017-05-18-16-54.gif)


Now adding this condition at the first step of the campaign will check to see if the person that submits the form has information in the field "honey". If the field is empty it is likely a real person. If it's not empty, it is a spam-bot and we are going to delete it.

**NOTE:** If you use a **Standalone Form** and you have the action to send email to user you MUST disable this and create a campaign associate with this **Standalone Form** and replicate the step above.

Using the honeypot method will help you stop spam bots and the negative effect they have on your email marketing activities.

------

Mautic's Rod Martin developed a short video tutorial to walk through this approach step-by-step;

<script src="https://fast.wistia.com/embed/medias/udumoylszq.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script> 

------

*Because of Mautic's robust workflow, there are a number of different ways to accomplish any given task. This is simply one approach. Comment below if you know of others.

The Mautic community is filled with incredible individuals with a variety of backgrounds and experiences. We believe that each perspective represents unique value to the broader community. If you're interested in becoming a contributor to our blog, please [contact us](mailto:info@mautic.org).*