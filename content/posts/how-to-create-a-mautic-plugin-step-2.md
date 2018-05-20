In our previous article we began looking at creating your own Mautic plugin to integrate a third party software with your awesome new open source marketing automation software (yes, Mautic). In this lesson we'll continue to create a Mautic plugin, but first as a very quick review, in our last tutorial we started with a basic introduction to plugin creation. Remember we started with **planning a plugin**, examining the **third party API**, and looking at the [developer resources provided by Mautic](https://developer.mautic.org). If you want to read more you can check out the [previous article](https://www.mautic.org/blog/how-to-create-a-mautic-plugin-tutorial-series-introduction/) and then come back here when you’re ready.

This second tutorial in creating your Mautic plugin we will start looking at the specifics of some of the files we’re going to write and how we take advantage of both the Mautic API and third party API calls.

### Basic Files

There are several basic files we need to write to have our plugin registered within Mautic. We created the files in our last tutorial and this graphic shows them to you again.

[![Create mautic plugin file structure](https://www.mautic.org/wp-content/uploads/2015/08/mautic_desk_plugin_files.png)
](https://www.mautic.org/wp-content/uploads/2015/08/mautic_desk_plugin_files.png)

The files we are going to focus on today include the **config.php** file, the **MauticDeskBundle.php**, and **FormSubscriber.php**. These are the quickest of the files and so we can cover them quickly. The other files you see in this screenshot are more specific to this particular integration and they will be covered in the next tutorial. For now let’s look at these first three files in more detail and line by line.

#### config.php

This first file is the config file which Mautic will use when loading the plugin into the system. In this file we are going to name our plugin, provide a description, version and author. Then we need to define the services we want our plugin to use. Here’s the file:

[github file="/dbhurley/mautic-desk-plugin/blob/master/Config/config.php"]

**Services**: The services are broken into two types, events and forms. Events are those items which you want to trigger as a result of some action within Mautic. Forms are the functions and calls to run when a form is loaded within Mautic.

> e.g. Real-life, the form services will allow your plugin to collect more information from forms within Mautic from the business user (not the site visitor).

The Desk plugin that we are writing will need both an event service and a form service. We’ll dig into each of these services later but notice that the class defined for each of these services is the path to the associated file.

#### MauticDeskBundle.php

This file is the root file that can be used when extending the Plugin base class. In this plugin we do not need to extend anything so the file below is merely a holding file that routes everything to the Plugin Base parent class.

[github file="/dbhurley/mautic-desk-plugin/blob/master/MauticDeskBundle.php"]

#### FormSubscriber.php

This file is associated with the event service we defined earlier in our config.php file. This FormSubscriber is the event that gets triggered based on some action within Mautic. Let’s look at the file and then break it down.

[github file="/dbhurley/mautic-desk-plugin/blob/master/EventListener/FormSubcriber.php"]

Namespacing and used classes are the first thing you’ll find in the file. Here we define what we’ll be using or referencing later in the file.

This class, FormSubscriber, extends a CommonSubscriber class available for all plugins.

The public function `onFormBuild` accepts a parameter of the FormBuilderEvent (as you can see type-hinted). Here we define the action for this particular service event. We will create the group, description, label, formType, formTheme, and callback function that we want triggered by this submit action. Lastly we add the submitAction to the event.

In this array of actions we have a few special key-value pairs to mention. First, the formType defines the configuration or parameters your plugin will have as part of the plugin configuration fields. (Don’t worry we’ll return to this later when we look at the form service and the plugin configuration).

The callback defines the location and the function you want to be called when the event is triggered.

Don’t let the formType confuse you, at this point in the process, it’s best to consider this merely a way for your admin configuration settings to be added to your plugin when it’s triggered.

### Next Step

The next piece in the plugin tutorial will be to focus on the admin configuration for your plugin (see, it’s coming together) and then explore how the triggered response is pushed to the third party. This plugin may be a short series but will add great functionality. I expect after this tutorial series you will have no problem taking this example and building your own plugins easily to push Mautic data to other systems, the Mautic API is a great way to integrate open source marketing automation with everything else.