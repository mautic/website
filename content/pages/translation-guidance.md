# Translation Guidance


In order to create a consistent interface, below is our guidance with regards to translating the Mautic interface.

## Primary Language

Mautic's primary language is English (United States).

## Ask Questions

We recognize there may be times when a string is not clear or there may be an error within it. If at anytime something isn't clear, feel free to raise an issue through Transifex and one of our project maintainers will help make sure everything is clear for you.

## Search Commands

**Sample String**: `mautic.core.help.searchcommands="<strong>Search commands</strong><br />is:published<br />is:unpublished<br />is:mine<br />is:uncategorized<br />category:{category alias}"`

Mautic utilizes several pre-built search commands throughout the system to create quick searches. These are explained in strings similar to the one above. The search commands should not be translated.

## Plural Forms

**Sample String**: `mautic.campaign.event.intervalunit.h="{0} hours|{1} hour|[2,Inf] hours"`

There are some strings within Mautic which may support plural forms for different values; one such case is demonstrated above. In these instances, different intervals may be specified for different values and the intervals do not need to match the source language string. For additional information on handling plural forms, we recommend reading the [Pluralization](http://symfony.com/doc/current/components/translation/usage.html#component-translation-pluralization) and [Explicit Interval Pluralization](http://symfony.com/doc/current/components/translation/usage.html#explicit-interval-pluralization) sections of Symfony's Using the Translator documentation page.

## Escaped Double Quotes

Translation resources are downloaded from Transifex and stored to .ini files for processing by Symfony and the underlying PHP architecture and the expectation for a valid language string is that the text between the first and last double quotes (such as the above samples) is uninterrupted. When there is an unescaped double quote in a string, this causes parse errors in the Symfony translation component and can potentially cause a site to not load correctly. Therefore, all double quotes should be escaped (`\"`) or encoded (`"`) to avoid errors. Note that in the source language files, we have all quotes within strings within single quotes.

## Additional Resources



	- [Joomla! User Interface Guidance](https://github.com/joomla/user-interface-text) - Joomla's guidance for strings is an excellent starting point with regards to consistent text strings or preferred syntax. Please note that this guide is written for Joomla's primary language, English (United Kingdom), which has subtle differences from our primary language and as such not every suggestion may apply the same.