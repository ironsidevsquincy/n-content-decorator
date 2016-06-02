[![Coverage Status](https://coveralls.io/repos/github/Financial-Times/n-content-model/badge.svg?branch=master)](https://coveralls.io/github/Financial-Times/n-content-model?branch=master)

# n-content-model
Transforms content from Elastic Search into summarised form for specified use-cases.

Use cases supported;

`article-card` : compatible with n-section usage

`stream-list-card` : used for card in stream list on stream page.

## Example usage

### With an array of content items

```
const contentModel = require('ft-n-content-model');

const transformedContentArray = contentArray.map(content => {
  contentModel(content, 'use-case');
});

```
