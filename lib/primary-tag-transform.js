const tagTransform = require('./tag-transform');

const propertyEquals = (property, value) => item => item[property] === value;

module.exports = (content, options) => {

	if (content.primaryTag) return content.primaryTag;

	if (!content.metadata) {
		if (content.primaryTheme) content.primaryTheme.primary = 'theme';
		if (content.primarySection) content.primarySection.primary = 'section';
		content.metadata = [content.primaryTheme, content.primarySection];
	}

	if (!content.metadata || content.metadata.every(data => data === undefined) ) {
		return;
	}

	const excludedTaxonomies = options && options.excludeTaxonomies ? ['organisations', 'regions', 'people'] : [];

	const metadata = content.metadata && content.metadata.filter(tag => {
		if (tag && (tag.primary !== 'theme' || excludedTaxonomies.indexOf(tag.taxonomy) === -1)) {
			return tag;
		}
	});

	const primaryTheme = metadata && tagTransform(metadata.find(propertyEquals('primary', 'theme')));
	const primarySection = metadata && tagTransform(metadata.find(propertyEquals('primary', 'section')));
	const primaryBrand = metadata && tagTransform(metadata.find(propertyEquals('primary', 'brand')));


	return primaryTheme || primarySection || primaryBrand;
};
