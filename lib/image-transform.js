const imageFormatTransform = require('./image-format-transform');
const imageRatioTransform = require('./image-ratio-transform');

module.exports = image => {
	if (image) {
		return {
			imageFormat: imageFormatTransform(image),
			imageRatio: imageRatioTransform(image),
			url: image.url || image.rawSrc
		};
	}
};
