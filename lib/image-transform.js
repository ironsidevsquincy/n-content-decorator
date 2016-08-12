const imageRatioTransform = require('./image-ratio-transform');

module.exports = image => {
	if (image) {
		return {
			ratio: imageRatioTransform(image),
			url: image.url || image.rawSrc
		};
	}
};
