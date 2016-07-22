const tagTransform = require('../lib/tag-transform');

const propertyEquals = (property, value) => item => item[property] === value;

module.exports = (content, option) => {

	const metadata = content.metadata;
	const primaryTheme = tagTransform(metadata.find(propertyEquals('primary', 'theme')));
	const primarySection = tagTransform(metadata.find(propertyEquals('primary', 'section')));
	const primaryBrand = tagTransform(metadata.find(propertyEquals('primary', 'brand')));
	const primaryTag = primaryTheme || primarySection || primaryBrand;

	if (option === 'summary') {
		return {primaryTag};
	} else {
		return {
			primaryTheme: primaryTheme,
			primarySection: primarySection,
			primaryBrand: primaryBrand,
			primaryTag
		};
	}
};
