[![Coverage Status](https://coveralls.io/repos/github/Financial-Times/n-content-decorator/badge.svg?branch=master)](https://coveralls.io/github/Financial-Times/n-content-decorator?branch=master)

#n-content-decorator

Provides decoration for content sourced either directly from the next Elastic Search cluster, or via the next-graphql-api, for compatibility for rendering content cards.

##Options supported;

###Decoration type

`mutateOriginal: true` will mutate the object passed to it.

`mutateOriginal: false` will return the decoration object, which can be merged in with the original object by the calling application (eg. `Object.assign(original, decoration)``).

`false` is the default option and need not be passed in.

###Use cases;

`useCase: 'article-card'` compatible with n-section card usage.

`useCase: 'stream-list-card'` used for card in stream list on stream page.

`article-card` is the default option and need not be passed in.

###Excluded Taxonomies

`excludeTaxonomies: true` prevents specific taxonomies (organisations, regions, people) from appearing in the tag that is returned.

`excludeTaxonomies: false` leaves taxonomies unaffected.

`false` is the default and need not be passed in.

##Example usage

###With an array of content items

####With `mutateOriginal: false`

```
const decoration = require('ft-n-content-decoration');

contentArray.map(content => Object.assign(content, decoration(content, {options})));

```

####With `mutateOriginal: true`

```
const decorateContent = require('ft-n-content-decoration');

contentArray.map(content => decorateContent(content, {options}));

```
