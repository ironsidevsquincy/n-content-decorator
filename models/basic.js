module.exports = content => {

	return {
		id: content.id,
		url: content.url,
		title: content.title,
		published: content.initialPublishedDate,
		lastPublished: content.publishedDate
	};

};
