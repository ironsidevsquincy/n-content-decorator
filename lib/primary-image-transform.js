module.exports = (mainImage, options) => {
	if (!options || !options.removeImage) {
		const image = mainImage;
		if (image) {
			image.rawSrc = mainImage.url;
		}
		return image;
	}
};
