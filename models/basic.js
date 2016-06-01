'use strict';

module.exports = (content) => {

	return {
		type: 'Article',
		id: content.id,
		title: content.title,
		published: content.initialPublishedDate,
		lastPublished: content.publishedDate
	};

};
