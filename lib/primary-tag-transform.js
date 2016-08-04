'use strict';

const tagTransform = require('./tag-transform');
const excludedTaxonomies = require('./utils/excluded-taxonomies');

const propertyEquals = (property, value) => item => item[property] === value;

module.exports = (content, options) => {

	if (content.primaryTag) return content.primaryTag;

	let primaryMetadata;
	if (!content.metadata && (content.primaryTheme || content.primarySection)) {
		if (content.primaryTheme) content.primaryTheme.primary = 'theme';
		if (content.primarySection) content.primarySection.primary = 'section';
		primaryMetadata = [content.primaryTheme, content.primarySection];
	}

	const metadata = content.metadata || primaryMetadata;
	if (!metadata) {
		return;
	}

	const filteredMetadata = metadata && metadata.filter(tag => {
		if (tag && (tag.primary !== 'theme' || excludedTaxonomies(options).indexOf(tag.taxonomy) === -1)) {
			return tag;
		}
	});

	const primaryTheme = filteredMetadata && tagTransform(filteredMetadata.find(propertyEquals('primary', 'theme')));
	const primarySection = filteredMetadata && tagTransform(filteredMetadata.find(propertyEquals('primary', 'section')));
	const primaryBrand = filteredMetadata && tagTransform(filteredMetadata.find(propertyEquals('primary', 'brand')));


	return primaryTheme || primarySection || primaryBrand;
};
