'use strict';

const getBranding = require('ft-n-article-branding');
const tagTransform = require('./tag-transform');
const isCommentTag = require('./utils/is-comment-tag');
const primaryTagTransform = require('./primary-tag-transform');

module.exports = content => {
	const metadata = content.metadata || content.tags;

	if (content.branding && content.branding.taxonomy === 'authors') {
		content.branding.headshot = content.authors &&
																content.authors.length &&
																content.authors[0].headshot;
	}

	const branding = tagTransform(content.branding) || (metadata && tagTransform(getBranding(metadata)));

	let brand;

	if (metadata && metadata.some(isCommentTag)) {
		if (branding) {
			brand = branding;
		} else if (content.authors && content.authors.length) {
			const author = content.authors[0];
				brand = {
					title: author.name,
					id: author.idV1,
					url: author.url,
					headshot: author.headshot,
				};
		} else {
			brand = {
				title: 'Opinion',
				url: '/stream/sectionsId/MTE2-U2VjdGlvbnM=',
			};
		}
		brand.type = 'opinion';
	}
	if (content.isEditorsChoice || (content.standout && content.standout.editorsChoice)) {
		brand = {
			title: 'Editor’s Pick',
			type: 'editors-pick'
		};
	}
	if (brand && !(brand.id || brand.idV1)) {
		const primaryTag = primaryTagTransform(content);
		if (primaryTag) brand.id = primaryTag.id;
	}
	return [branding, brand];
};
