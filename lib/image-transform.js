const imageFormatTransform = require('./image-format-transform');
const imageRatioTransform = require('./image-ratio-transform');

module.exports = image => {
	if (image) {
		return {
			format: imageFormatTransform(image),
			ratio: imageRatioTransform(image),
			url: image.url || image.rawSrc
		};
	}
};
