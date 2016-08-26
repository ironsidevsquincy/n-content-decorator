'use strict';

const primaryTagTransform = require('./primary-tag-transform');

module.exports = (content) => {

	let primaryRelated;
	if (
		(
			!content.relatedContent ||
			content.relatedContent.length === 0
		) && (
			content.primaryTheme || content.primarySection)
		) {
		primaryRelated = primaryTagTransform(content);
	}

	return (content.relatedContent || [])
		.concat(primaryRelated && primaryRelated.items || [])
		.filter(relatedItem => relatedItem.id !== content.id)
		.slice(0, 3);
};
