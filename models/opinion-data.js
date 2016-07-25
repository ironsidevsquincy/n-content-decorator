const authorsTransform = require('../lib/authors-transform');
const tagTransform = require('../lib/tag-transform');

module.exports = content => {

	const authorTags = content.metadata.filter(data => data.taxonomy === 'authors');

	return {
		authors: authorsTransform(authorTags),
		tags: content.metadata
		.filter(data => ['genre', 'brand'].indexOf(data.taxonomy) > -1)
		.map(data => tagTransform(data))
	};
};
