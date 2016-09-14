const premiumTransform = require('../lib/premium-transform');

module.exports = content => {

	return {
		url: content.url && content.url.replace(/https:\/\/www.ft.com/, ''),
		fullUrl: content.url,
		published: content.initialPublishedDate || content.published,
		lastPublished: content.publishedDate || content.lastPublished,
		isPremium: content.isPremium || (content.webUrl && premiumTransform(content.webUrl))
	};

};
