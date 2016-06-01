'use strict';

const tagTransform = tag => {
	return {
		id: tag.idV1,
		name: tag.prefLabel,
		url: `/stream/${tag.taxonomy}Id/${tag.idV1}`,
		taxonomy: tag.taxonomy
	};
};

module.exports = tag => {
	const transformedTag = tag ? tagTransform(tag) : undefined;
	return transformedTag;
};
