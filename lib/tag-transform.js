const premiumTransform = require('./premium-transform');

const tagItemsTransform = item => Object.assign(item, { isPremium: item.isPremium || (item.webUrl && premiumTransform(item.webUrl)) });

//TODO remove need upstream for duplicate name and title properties
// data sourced from graphQL API already has idV1 and prefLabel mapped
const tagTransform = tag => {
	return {
		id: tag.idV1 || tag.id,
		name: tag.prefLabel || tag.name,
		title: tag.prefLabel || tag.name,
		url: tag.url.replace('https://www.ft.com', ''),
		taxonomy: tag.taxonomy,
		headshot: tag.headshot,
		items: tag.items ? tag.items.map(item => tagItemsTransform(item)) : null
	};
};

module.exports = tag => {
	const transformedTag = tag ? tagTransform(tag) : undefined;
	return transformedTag;
};
