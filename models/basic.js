const premiumTransform = require('../lib/premium-transform');

module.exports = content => {

	return {
		id: content.id,
		url: content.url && content.url.replace(/https:\/\/www.ft.com/, ''),
		fullUrl: content.url,
		title: content.title,
		published: content.initialPublishedDate || content.published,
		lastPublished: content.publishedDate || content.lastPublished,
		premium: content.webUrl && premiumTransform(content.webUrl)
	};

};
