![Mautic 3 Future of MarTech](https://www.mautic.org/wp-content/uploads/2018/05/mautic_3_series-1024x499.png)


*Originally published on [http://dbhurley.com/headless-marketing-automation/](http://dbhurley.com/headless-marketing-automation/)*

Yesterday I released a blog post entitled [Looking Ahead at Mautic 3](http://dbhurley.com/looking-ahead-to-mautic-3/). This blog went into great detail on why I believed a Mautic 3 should be considered next on our product roadmap and then I outlined the problems (as well as some solutions) that we could solve with this next release. One of the features I shared received a few more questions than the others so I think it deserves a little bit of specialized attention.

## An API First Headless Application

First of all can we all admit that is a mouthful to say? We can break it down and make it a bit easier to understand and then let’s dig into what it means and why I believe it’s a valuable step for Mautic’s future.

**API First** implies that every function of Mautic, every call to the database, and every interaction has to be “call driven”. This extracts the front end user-experience from the data layer (or API). This also means that the only way that the user interface (design, page layout, display elements) interacts with the data is through a series of API calls. These calls are the glue that holds the data together. API first means the system has been created in a way that the API is the only way these things happen, and every API return is formatted accordingly.

**Headless**: This concept is a funny one to discuss when working in software and applications. We’re not getting into the Ichabod Crane story /(though admittedly for some reason a character on a horse holding a pumpkin is inevitably the first thing that comes to my mind)/. In the software universe the concept of headless means something quite different. Here’s a definition:

> …the front-end is a stand-alone piece of software, which through API communicates with a back-end. Both parts operate separately from each other, and can even be placed on separate servers, creating a minimum version of a multi-server architecture. The bridge between both parts is the API client. The endpoints of the API are connected to each other….
— [Headless software - Wikipedia](https://en.wikipedia.org/wiki/Headless_software)

Earlier in that same page the first sentence distills it down even further. **Headless software is software capable of working on a device without a graphical user interface.** (Wikipedia)

By these definitions we see that headless makes sense particularly when discussing things such as *API first*.

Now, let’s take that thinking and put it into more of a practical application. Why is a headless marketing automation platform useful and desirable. Why should Mautic consider this something worth undertaking in the next major release of our software? Here are my three main points to justify such a task.

## Flexibility

In my opinion, the first reason to consider undertaking a task of this size is based on the concept of improving our flexibility as a platform. If our goal is to be “open” (more on that later) then the best way we can do that is by having a platform that is flexible.

Flexibility, to me, means continuing the great work we stated where a business is able to use the software in a way that is best for their business (rather than the situation that 90% of other software operates). We want to give people the ability and the ***flexibility*** to be in complete control of their information, their data, and their software. Software flexibility comes in a variety of ways; in Mautic we’ve considered our platform flexible from the very beginning. Custom fields, highly customizable and configurable campaigns, and the ability to create software practices that match a particular business have been part of the product from the start.

The next logical step in this effort to be flexible and to continue to push the limits and lead in this area involves looking deeper at other areas where we can implement more flexibility. Separating the functional layer from the user interface allows just that. A platform where you can consume the data from any interface you desire means you have a marketing automation platform prepared for the future. Your data, made available in any manner you need. API first, headless marketing automation gives you the power of marketing automation in any visual, end product you desire.

## Sustainability

The second reason I believe we should focus on a headless approach to marketing automation is for future sustainability. I don’t mean sustainability of Mautic necessarily, but more importantly stability of your data. If you are locked into a single user interface then you’ll find yourself duplicating data, moving between different databases and potentially losing information. You’ll also be tied to a more narrow focus and implementation strategy for your marketing automation because you’ll only be able to use Mautic in the manner envisioned by the Mautic community and its developers.

While this isn’t necessarily a bad thing (we’ve got a pretty good roadmap and vision for where marketing automation should be), I believe the ability for a business to use their data in multiple outlets gives a sense of sustainability to the database and security in knowing the functional aspects of the software is capable of being implemented in a variety of ways. <span class="highlight">You move from a singular marketing automation-platform-only to a situation where your data (and your marketing functionality) is able to be consumed everywhere by any other service or device.</span>

## Openness

The final reason I believe that a headless marketing automation platform is beneficial is for the sake of being more open. Mautic is built on open source. We are steeped in the knowledge that our code is readily available to anyone to review, to use, and to improve. This means that every function is understood (or could be), and that every action the software performs is easy to observe. If we continue this line of thinking it stands to reason that in much the same way, the data, and the output from those functions be easy to view, to use, and to improve. By extracting the user interface from the software and making the underlying infrastructure (API) available to be consumed by other sources we make Mautic more open.

No other marketing automation platform gives you this API-first, headless ability. You are essentially “locked in” to their user interface and their experience. (*And we don’t even need to start talking about the limited API abilities of marketing automation platforms in general.*) Closed marketing automation constricts and restricts your abilities as a marketer. You are forced to understand their interface, and to only view your data within the bounds of what they believe is marketing automation and how they believe you should access your information.

Mautic has always sought to do more, to be more. To provide you access to everything — after all, it belongs to you. Shouldn’t it be able to be used any way you want?

------

For these reasons I believe it is in best interests and the future success of Mautic to become API-first and truly headless. I hope this shares my thinking in a bit more clarity and if you were unsure before what headless meant you now have a good understanding about the topic.

If you have ideas or other ways in which a headless marketing automation platform can change the landscape and improve marketing I would love to hear them. We’re building this together, our robust and global community of marketers and developers working together create Mautic software and we have the power to envision and create the future. We are changing the landscape and we will continue to do so. **It’s an exciting time to be in Mautic.**

*Special thanks to [Don Gilbert](https://twitter.com/dilbert4life) for his help with this post.*