module.exports = options => {
	if (options && options.excludeTaxonomies) {
		return ['organisations', 'regions', 'people'];
	} else {
		return [];
	}
};
