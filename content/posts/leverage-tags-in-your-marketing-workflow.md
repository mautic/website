![](https://www.mautic.org/wp-content/uploads/2017/10/stock-1863880_1280-1024x576.jpg)

*We're excited to continue sharing content developed by the Mautic community. This post on tags was written by Andre Etienne.*

Within the amount of time I’ve been in the Mautic community, I have often seen many questions about best practice for tags; there is no best practice set in stone, you find what works for you in your data structure and test through trial and error if the end-point is functional in the way you require.

For example, a project I currently work on deals with apprenticeships and distance learning courses. When I started this project they segmented their mailing list in 2 different ways:

The first being;


- Professional
- Funded/Apprenticeship
- Employers


And the second;


- Accounting
- Leadership & Management
- Funded/Apprenticeships
- Employers


I setup Mautic and altered the segment structure to look like this;


- Professional (Professional mailing list)
- Accounting (Professional mailing list)
- Leadership & Management (Professional mailing list)
- Funded/Apprenticeships (Funded mailing list)
- Employers (Employer mailing list)




### Workflow Using Tags:


This is great when wanting to manually send/schedule broadcast emails, but essentially doesn’t help when you want to use one workflow to manage/send emails to the entire list based on conditions; I’m currently in the process of building a mailing list workflow for the first half of 2018 that will send out emails to the entire mailing list based on tag conditions.

1. Starting with “contact segments” as the source I select all mailing list segments.
 
![tags01](https://www.mautic.org/wp-content/uploads/2017/11/Point-01-copy-1024x480.jpg)


2. This is where tags come into play, there is no need to create hundreds of segments to cater to each sector within a specific mailing list so instead I use tags. First, I add a condition to check the segment then I add another condition to specify the tag to check next.

![tags02](https://www.mautic.org/wp-content/uploads/2017/11/Point-02-copy-1024x479.jpg)


3. The accounting list segments further into areas such as starting an accounting career, promotion/career advancement, bookkeeping, self-employment. I am using tags to prescript the subjects of the email for that segment within that period.

![tags03](https://www.mautic.org/wp-content/uploads/2017/11/Point-03-copy-1024x480.jpg)


4. I then create two emails, one for bookkeeping and one for all others. Having the knowledge that users on the mailing list are very specific about what they’re interested in helps us select the focal subject and then generalize all other areas.

![tags04](https://www.mautic.org/wp-content/uploads/2017/11/Point-04-copy-1024x480.jpg)


5. Then it’s just a case of repeating the tag condition for each sector and subject within that segment, then moving on to the next mailing list.

![tags05](https://www.mautic.org/wp-content/uploads/2017/11/Point-05-copy-1024x506.jpg)


For me this is an optimum way to break down and schedule emails for our mailing list while deciding the subject each monthly email within a list sector (accounting, leadership & management); we also manage to cater to other users on the mailing list that are not interested in that appointed subject.

Working on a 6-month basis you can clone the campaign and at the end of the flow move users to the new campaign that handles the second half of the year.

------

Are there other best practices that you include in your workflow? Please comment below! Thank you again to Andre Etienne for allowing us to share this valuable content. To find out more information and discover other best practices visit Andre at [yourdigital.club](https://www.yourdigital.club).