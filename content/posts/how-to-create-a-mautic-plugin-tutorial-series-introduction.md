We continue to push the Mautic free marketing automation software to be bigger and better than anything else available. A new feature coming soon to a future release of Mautic is one that we know will be extremely exciting. The **Mautic Marketplace** will allow everyone to share their plugins, themes, workflows, campaign templates and more. In preparation for this upcoming feature we’ll be creating a series of articles related to the development of a Mautic plugin to help you as you look to create your first Mautic plugin.

I’ll be covering how to **create a Mautic plugin from start to finish** in a series of posts that I hope will bring clarity and understanding to the entire process and answer any questions that arise during the process. If you get stuck I encourage you to jump into the forum to ask your questions and help others too!

Before we begin let’s look quickly at what a plugin is and why we care about creating them. With this idea of plugins Mautic functions very similar to something like WordPress. Plugins allow you to do a number of things from integrating other software systems and software tools to modifying the functionality of Mautic. **Plugins let you extend Mautic however you need.** This is one of the greatest benefits of an open source marketing platform like Mautic. You have full access to view the source code, examine existing plugins and improve the core by suggesting additional triggers or listener events.

> Want a concrete example? A Mautic plugin might let you push data from a lead to an external CRM system. The plugin will listen for a specific action and when that action occurs will trigger an event that pushes data to some other system. Here’s a second example: A Mautic plugin might modify all your landing page URL’s and other external URL’s to use a link-shortening system (like Bitly) before they are rendered and displayed to the end user.

Ok, so that’s an idea of what a plugin might do and a couple of examples of how they might be used. I think that’s enough background. Let’s start planning what our sample plugin will do that we’re going to create together.

## Step 1: Plan Your Plugin


### Purpose of the Plugin

I want to create a plugin that pushes some information from Mautic to an external service. I have decided for the purpose of this tutorial series that I want to create a plugin that will let me create a form within Mautic and push the results of that form to Desk.com, a ticketing system.

At a high-level review, I am looking to create a plugin that will let me use Mautic to push support tickets into my support system but use Mautic for form collection and submission. By doing this I will be able to do a few different things. First, this will let me demonstrate how to create a plugin that needs additional configuration fields defined. Second, this plugin will add a new form action to standalone forms that will allow me to push my form submissions to some other system via an API. Third, this plugin will give me the opportunity to write a couple different listeners. And lastly, I can show some advanced techniques for field mapping.

### Outline Basic Plugin Structure

Now that we have identified the purpose of our plugin this will help me to outline the basic plugin structure I want to use. Here is my basic plugin structure:

![Create mautic plugin file structure](https://www.mautic.org/wp-content/uploads/2015/08/mautic_desk_plugin_files.png)


*Don’t panic we’re going to look in-depth at each folder and file here through the course of this tutorial but for now we’ll just glance briefly at just a few highlights that are important to note.*

**Form Folder:** Because I am creating a plugin that will provide additional features (fields) on a form within Mautic I will need to create a form folder and a FormFieldsType.php file which will define each of those fields. (The FormFields part of the name must match the class name but can be anything you want, and the Type part of the file name is necessary so Mautic will find and autoload this file).

**FormSubscriber.php:** Again, this file is named related to the class name it contains so that it will be automatically loaded by the system. I have called this one FormSubscriber to help me remember that this is a subscribed event for forms.

As with most parts of the system you will want to ensure that your naming is consistent throughout your plugin. Specifically the classname and namespace of your files as they relate to your config.php file. Don’t worry too much about this for right now as we’ll get into this in more detail in the next post.

### Prepare 3rd Party API

I’m going to list this as part of the initial setup because it’s important to have this ready early on in your plugin development process. You will need to find and prepare your 3rd party API. This might involve creating an account, retrieving an API ID and API Key or similar. Basically you want to make sure when you’re ready to make an API call (later in this series) you will have everything ready to go and already setup.

For this tutorial I discovered that Desk.com uses Basic Authentication for handling interaction with their API and I simply needed to know my email address and password associated with my Desk.com account.
Following along? You can register an account here: [http://help.desk.com/register](http://help.desk.com/register)

### Mautic Developer Reference

In addition to the 3rd party API service and knowing what functionality is available from them you will also need to know the various endpoints, listeners, and more available within Mautic. You'll want to keep a browser tab open with the [Mautic Developer Docs](https://developer.mautic.org) loaded up. You can browse that information here: [https://developer.mautic.org](https://developer.mautic.org)

### Next Step

The next step after defining our purpose and looking at the basic plugin structure will be to begin writing all the necessary files to their respective folders and begin the process. We will get into this in the next article in this tutorial series.