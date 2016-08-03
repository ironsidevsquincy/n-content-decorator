module.exports = content => {
	return (content.relatedContent || [])
		.filter(relatedItem => relatedItem.id !== content.id)
		.slice(0, 3);
};
