'use strict';

const getPrimaryTag = require('../lib/primary-tag-transform');
const getBranding = require('../lib/branding-transform');

module.exports = (content, options) => {

	const brandingResult = getBranding(content);
	const branding = brandingResult[0];
	const brand = brandingResult[1];
	const tag = getPrimaryTag(content, options);

	if (options && options.useCase === 'article-card') {
		if (brand) {
			return { brand };
		} else {
			return { tag };
		}
	} else if (options && options.useCase === 'stream-list-card') {
		return {
			tag,
			branding
		};
	}
};
