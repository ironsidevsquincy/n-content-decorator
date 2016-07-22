const branding = require('ft-n-article-branding');
const primaryImage = require('../lib/primary-image-transform');
const imageFormat = require('../lib/image-format-transform');
const tagTransform = require('../lib/tag-transform');
const subheadingTransform = require('../lib/subheading-transform');

module.exports = (content, options) => {

	return {
		summary: content.summaries && content.summaries.length ? content.summaries[0] : null,
		subheading: subheadingTransform(content),
		isEditorsChoice: content.standout && content.standout.editorsChoice,
		branding: tagTransform(branding(content.metadata)),
		primaryImage: primaryImage(content.mainImage, options),
		imageFormat: imageFormat(content.mainImage)
	};

};
