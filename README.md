[![Coverage Status](https://coveralls.io/repos/github/Financial-Times/n-content-model/badge.svg?branch=master)](https://coveralls.io/github/Financial-Times/n-content-model?branch=master)

#n-content-model

#v2

Transforms content sourced either directly from the next Elastic Search cluster, or via the next-graphql-api, into summarised form for use in rendering content cards.

##Options supported;

###Use cases;

`useCase: 'article-card'` compatible with n-section card usage

`useCase: 'stream-list-card'` used for card in stream list on stream page.

###Excluded Taxonomies

`excludeTaxonomies: true` prevents specific taxonomies (organisations, regions, people) from appearing in the tag that is returned.

##Example usage

###With an array of content items

```
const contentModel = require('ft-n-content-model');

const transformedContentArray = contentArray.map(content => {
  contentModel(content, {options});
});

```
##Key changes from v1

- no-image variant for article card not supported - recommend either remove image from content or don't provide image options when configuring content for n-section


#v1

Transforms content from Elastic Search into summarised form for specified use-cases.

Use cases supported;

`article-card` : compatible with n-section usage

`article-card-no-image` : as article card, but with main image removed

`stream-list-card` : used for card in stream list on stream page.

## Example usage

### With an array of content items

```
const contentModel = require('ft-n-content-model');

const transformedContentArray = contentArray.map(content => {
  contentModel(content, 'use-case');
});

```
