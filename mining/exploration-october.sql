DELETE from rainlab_forum_posts where 1=1;

-- count topics in channel
SELECT
channels.id,
channels.title,
count(*) topics
from rainlab_forum_topics topics
left join rainlab_forum_channels channels on topics.channel_id = channels.id
group by topics.channel_id;

-- count posts in topic
SELECT
topics.id,
topics.subject,
count(*) posts
from rainlab_forum_posts posts
left join rainlab_forum_topics topics on posts.topic_id = topics.id
where topics.id IS NOT NULL
group by topics.id;
update rainlab_forum_topics SET count_posts = 0 where id = 0;

-- count topics and posts in channel
SELECT
channels.id,
count(*) topicsCount,
sum(topics.count_posts) postsCount
from rainlab_forum_topics topics
left join rainlab_forum_channels channels on topics.channel_id = channels.id
where channels.id IS NOT NULL
group by channels.id
UPDATE rainlab_forum_channels SET count_topics=0, count_posts=0 where id=0;

-- enrich forum topics
-- -- start_member_id
SELECT * from rainlab_forum_posts WHERE topic_id = 70144
ORDER by id asc


SELECT count(*), topic_id
from rainlab_forum_posts posts
GROUP by topic_id;

SELECT * from rainlab_forum_topics topics
ORDER by id asc