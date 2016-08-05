//TODO remove need upstream for duplicate name and title properties
// data sourced from graphQL API already has idV1 and prefLabel mapped
const tagTransform = tag => {
	return {
		id: tag.idV1 || tag.id,
		name: tag.prefLabel || tag.name,
		title: tag.prefLabel || tag.name,
		url: `/stream/${tag.taxonomy}Id/${tag.idV1 || tag.id}`,
		taxonomy: tag.taxonomy,
		headshot: tag.headshot,
		items: tag.items
	};
};

module.exports = tag => {
	const transformedTag = tag ? tagTransform(tag) : undefined;
	return transformedTag;
};
