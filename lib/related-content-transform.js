'use strict';

const primaryTagTransform = require('./primary-tag-transform');

module.exports = (content, options) => {

	let primaryRelated;
	if (
		(
			!content.relatedContent ||
			(content.relatedContent && content.relatedContent.length < 3)
		) && (
			content.primaryTheme || content.primarySection)
		) {
		primaryRelated = primaryTagTransform(content, options);
	}

	return (content.relatedContent || [])
		.concat(primaryRelated && primaryRelated.items || [])
		.filter(relatedItem => relatedItem.id !== content.id)
		.slice(0, 3);
};
