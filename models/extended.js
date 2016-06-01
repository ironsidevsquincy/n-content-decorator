'use strict';
const branding = require('ft-n-article-branding');
const primaryImage = require('../lib/primary-image-transform');
const primaryTagsTransform = require('../lib/primary-tags-transform');
const tagTransform = require('../lib/tag-transform');

module.exports = (content) => {

	return Object.assign(
		{
			summary: content.summaries && content.summaries.length ? content.summaries[0] : null,
			isEditorsChoice: content.standout && content.standout.editorsChoice,
			branding: tagTransform(branding(content.metadata)),
			primaryImage: primaryImage(content.mainImage)
		},
		primaryTagsTransform(content.metadata)
	);

};
