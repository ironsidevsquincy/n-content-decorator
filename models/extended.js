const imageTransform = require('../lib/image-transform');
const liveBlogTransform = require('../lib/live-blog-transform');
const relatedContentTransform = require('../lib/related-content-transform');
const summaryTransform = require('../lib/summary-transform');
const typeTransform = require('../lib/type-transform');

module.exports = (content, options) => {

	return {
		hideTimestampState: content.type === 'FastFt',
		image: imageTransform(content.mainImage || content.primaryImage),
		liveBlog: liveBlogTransform(content),
		relatedContent: relatedContentTransform(content),
		summary: summaryTransform(content),
		type: typeTransform(content, options)
	};

};
