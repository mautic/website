As some of the new features found in Mautic 2.0 make their way into your workflow, we wanted to take a couple of minutes to further outline some of the capability in the email/landing page builder. 

Currently the new builder doesn’t work with the content slots defined in PHP, but instead directly in the HTML template. This allows the slots to be moved around the theme layout, giving the user that ability to add/remove them as needed.


> <div data-slot="text">
<span><a href="">@JaneDoe</a></span> has invited you to join Awesome inc!
</div>



### Slot definition

The slot can be defined by a single HTML attribute `data-slot="{slot type here}"`. For example, the text slot can be defined even with the demo content.

When the theme is opened in the builder, the div with `attribute data-slot="text"` will make the text inside the div editable within the inline [Froala editor](https://www.froala.com/wysiwyg-editor).

The 2 slot types currently built:


	- **Image: **Inserts a single image into the div. User can click on it and edit it with options which provides Froala editor (link, change image source, alt text, …)
	- **Button:** Insert a HTML button. User can define URL as well as padding, size and position.



### Slot containers

As stated before, users can drag & drop the new slots into the theme. So as a theme developer, you have to define where the user can drop the slots. You can do it again with a single HTML attribute `data-slot-container`. Example:


> <div data-slot-container="">
<div data-slot="text"><a>@JaneDoe</a> has invited you to join Awesome inc!</div>
</div>


This way the builder will let users drop the new slots into this container. In the example above there is already one predefined slot which user can move to another container, remove or edit.

This functionality will provide you with lots of creative freedom for designing and developing your own unique email and landing pages. Have a unique design? Share it with the community! We would love to see how you're using Mautic to engage your audience.