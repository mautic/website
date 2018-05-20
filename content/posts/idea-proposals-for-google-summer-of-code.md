We recently [announced](https://www.mautic.org/blog/developer/mautic-applies-for-google-summer-of-code/) that Mautic is applying for this year's Google Summer of Code. How exciting! This is an incredible opportunity for students and organizations alike to contribute to the global Open Source community.

Part of the application process is to present a list of ideas that, if accepted into the program, students can write proposals for how they would best bring that idea to fruition. The process is brilliant on Google's part. Not only do the students have an opportunity to refine their technical, team building, and general communication skills; they also are able to improve and demonstrate their critical thinking to come up with a solution to a given idea and also their professional skill to publicly present it.

The team looked back on the feedback given from the community and came up with three ideas that seemed to be in high demand and would bring great additions to Mautic's feature-set.

All of the following will require knowledge in PHP, HTML, Javascript, and basic SQL with emphasis on specific languages as noted in the ideas. It will help to have experience in Symfony and Doctrine but is not required.

**1. Magento Integration**

Magento is one of the most popular open source eCommerce solutions so it makes perfect sense that Mautic should be able to integrate with it! Leveraging Magento’s API, Mautic should be able to sync customer information as leads, track the lead’s ordering history, and detect abandoned carts.

Mautic should be able to use that information to segment leads based on products purchased, recent activity (i.e. placed an order within last X weeks or have not placed an order in X months), and order statistics (i.e. spent $1000 in last 1 month).

In addition to segmentation, Mautic should also be able to use campaigns to send dynamic emails that include abandoned cart products (with images) along with emails that up-sell, cross-sell, and reorder purchased products.

Finally, Mautic should have eCommerce specific reporting such as correlating revenue with specific campaigns.

**2. Custom WYSIWYG Editor and Improved Builders**

Mautic currently uses a combination of CKEditor in full-page mode for creating custom HTML landing pages and emails. It also has a custom-built drag-and-drop “builder” to build themed landing pages and emails. As much as we love CKEditor, it doesn’t meet all of Mautic’s needs.

Thus, we would like to see a simple, powerful, and beautiful UI for building landing pages and emails that doesn’t depend on the end-user knowing web programming languages. But it should still give the power user or developer the option to directly edit the HTML. It needs to support both “free-style” and file-based themes.

It should include drag-and-drop elements such as image, text, table, lead profile information, forms, and other Mautic tokens. There should also be a simple and beautiful WYSIWYG editor for text and a file manager for images.

Finally, it needs the option to add stylesheets and javascript files to the tag without having to manually manipulate the HTML. A strong design eye and skill in Javascript will be required for this idea.

**3. Javascript Tracking with Heat Mapping**

Mautic currently tracks website activity using a script generated tracking pixel. This method is limited to server values and whatever is appended to the image src as query parameters. Thus, Mautic needs a more powerful and flexible way to handle lead tracking using Javascript. This project should at least bring configurable page tracking (URL, title, etc), event tracking (clicks, downloads, video plays, etc.), and device tracking (device type, screen size, OS, browser, etc). Using the click tracking data, it would be great to include a heat mapping feature to see where end-users are most active on a website. Some backend coding will be needed so knowledge in PHP is required in addition to Javascript.