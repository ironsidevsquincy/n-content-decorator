'use strict';

module.exports = mainImage => {
	const image = mainImage;
	if (image) {
		image.rawSrc = mainImage.url;
	}
	return image;
};
