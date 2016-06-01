'use strict';

const tagTransform = require('./tag-transform');

const propertyEquals = (property, value) => item => item[property] === value;

module.exports = (metadata) => {

	const primaryTheme = tagTransform(metadata.find(propertyEquals('primary', 'theme')));
	const primarySection = tagTransform(metadata.find(propertyEquals('primary', 'section')));
	const primaryBrand = tagTransform(metadata.find(propertyEquals('primary', 'brand')));
	const primaryTag = primaryTheme || primarySection || primaryBrand;

	return {
		primaryTheme: primaryTheme,
		primarySection: primarySection,
		primaryBrand: primaryBrand,
		primaryTag
	};
};
